type LeadRequest = {
  method?: string;
  body?: unknown;
  path?: string;
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
};

type LeadResponse = {
  headersSent?: boolean;
  setHeader(name: string, value: string | number | readonly string[]): void;
  status(code: number): LeadResponse;
  json(body: unknown): void;
};

const NAME_MAX = 100;
const CONTACT_MAX = 200;
const OPTIONAL_FIELD_MAX = 50;

const STUDY_FREQUENCY_LABELS: Record<string, string> = {
  "1": "1 раз в неделю",
  "2": "2 раза в неделю",
  "3": "3 раза в неделю",
  "4plus": "4+ раз в неделю",
};

const PREFERRED_TIME_LABELS: Record<string, string> = {
  morning: "Утро",
  day: "День",
  evening: "Вечер",
  weekend: "Выходные",
};

const CURRENT_LEVEL_LABELS: Record<string, string> = {
  zero: "Нулевой",
  beginner: "Начальный (A1–A2)",
  intermediate: "Средний (B1–B2)",
  advanced: "Продвинутый (C1+)",
};

interface LeadPreferences {
  studyFrequency: string;
  preferredTime: string;
  currentLevel: string;
}

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

function normalizeOptionalSlug(value: unknown, labels: Record<string, string>): string {
  const slug = trim(value);
  if (!slug.length || slug.length > OPTIONAL_FIELD_MAX) return "";
  return labels[slug] ? slug : "";
}

function parseLeadPreferences(body: Record<string, unknown>): LeadPreferences {
  return {
    studyFrequency: normalizeOptionalSlug(body.studyFrequency, STUDY_FREQUENCY_LABELS),
    preferredTime: normalizeOptionalSlug(body.preferredTime, PREFERRED_TIME_LABELS),
    currentLevel: normalizeOptionalSlug(body.currentLevel, CURRENT_LEVEL_LABELS),
  };
}

function buildPreferenceLines(preferences: LeadPreferences): string[] {
  const lines: string[] = [];
  if (preferences.studyFrequency) {
    lines.push(`Частота: ${escapeHtml(STUDY_FREQUENCY_LABELS[preferences.studyFrequency])}`);
  }
  if (preferences.preferredTime) {
    lines.push(`Удобное время: ${escapeHtml(PREFERRED_TIME_LABELS[preferences.preferredTime])}`);
  }
  if (preferences.currentLevel) {
    lines.push(`Уровень: ${escapeHtml(CURRENT_LEVEL_LABELS[preferences.currentLevel])}`);
  }
  return lines;
}

function validate(name: string, contact: string): { ok: true } | { ok: false; status: number; message: string } {
  if (!name.length) return { ok: false, status: 400, message: "Введите имя" };
  if (name.length > NAME_MAX) return { ok: false, status: 400, message: "Имя слишком длинное" };
  if (!contact.length) return { ok: false, status: 400, message: "Введите контакт" };
  if (contact.length > CONTACT_MAX) return { ok: false, status: 400, message: "Контакт слишком длинный" };
  return { ok: true };
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

interface QuizDetail {
  id: number;
  topic: string;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

function toQuizDetails(value: unknown): QuizDetail[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const id = toNumber(record.id);
      if (id === null) return null;
      return {
        id,
        topic: trim(record.topic),
        question: trim(record.question),
        selected: trim(record.selected),
        correct: trim(record.correct),
        isCorrect: record.isCorrect === true,
      } satisfies QuizDetail;
    })
    .filter((item): item is QuizDetail => item !== null);
}

function normalizeLeadSource(raw: string): "lead_request" | "quiz_request" | "quiz_complete_no_lead" {
  const normalized = raw.trim().toLowerCase();
  if (normalized === "quiz" || normalized === "quiz_request") return "quiz_request";
  if (normalized === "lead" || normalized === "lesson_request" || normalized === "lead_request") return "lead_request";
  if (normalized === "quiz_complete_no_lead") return "quiz_complete_no_lead";
  return "lead_request";
}

function getRequestPath(req: { path?: string; url?: string; headers?: Record<string, string | string[] | undefined> }): string {
  const fromPath = trim(req.path);
  if (fromPath.length && fromPath !== "/") return fromPath;

  const fromUrl = trim(req.url?.split("?")[0] ?? "");
  if (fromUrl.length) return fromUrl;

  const original = req.headers?.["x-vercel-original-url"] ?? req.headers?.["x-forwarded-uri"];
  if (typeof original === "string" && original.length) {
    if (original.startsWith("http")) {
      try {
        return new URL(original).pathname;
      } catch {
        return original.split("?")[0] ?? "";
      }
    }
    return original.split("?")[0] ?? "";
  }

  return "";
}

function detectLeadSource(
  req: { path?: string; url?: string; headers?: Record<string, string | string[] | undefined> },
  bodySource: unknown,
): "lead_request" | "quiz_request" | "quiz_complete_no_lead" {
  const path = getRequestPath(req).toLowerCase();
  if (path.endsWith("/api/quiz/complete-no-lead")) return "quiz_complete_no_lead";
  if (path.endsWith("/api/lead/quiz-request")) return "quiz_request";
  if (path.endsWith("/api/lead/request")) return "lead_request";
  return normalizeLeadSource(trim(bodySource));
}

function escapeCsvCell(value: string | number): string {
  const normalized = String(value).replaceAll("\"", "\"\"");
  return `"${normalized}"`;
}

function buildQuizCsv(params: {
  name: string;
  contact: string;
  source: string;
  scoreText: string | number;
  totalText: string | number;
  level: string;
  details: QuizDetail[];
}): string {
  const rows: string[] = [];

  const createdAt = new Date().toISOString();
  const details = params.details.length > 0
    ? params.details
    : [{ id: 0, topic: "—", question: "Детали ответов не переданы", selected: "—", correct: "—", isCorrect: false }];

  rows.push([escapeCsvCell("Параметр"), escapeCsvCell("Значение")].join(","));
  rows.push([escapeCsvCell("Дата"), escapeCsvCell(createdAt)].join(","));
  rows.push([escapeCsvCell("Имя"), escapeCsvCell(params.name)].join(","));
  rows.push([escapeCsvCell("Контакт"), escapeCsvCell(params.contact)].join(","));
  rows.push([escapeCsvCell("Источник"), escapeCsvCell(params.source)].join(","));
  rows.push([escapeCsvCell("Баллы"), escapeCsvCell(params.scoreText)].join(","));
  rows.push([escapeCsvCell("Всего вопросов"), escapeCsvCell(params.totalText)].join(","));
  rows.push([escapeCsvCell("Уровень"), escapeCsvCell(params.level || "—")].join(","));
  rows.push("");
  rows.push(
    [
      "№ вопроса",
      "Тема",
      "Вопрос",
      "Ответ пользователя",
      "Правильный ответ",
      "Статус",
    ]
      .map(escapeCsvCell)
      .join(",")
  );

  for (const detail of details) {
    rows.push(
      [
        detail.id || "—",
        detail.topic || "—",
        detail.question || "—",
        detail.selected || "—",
        detail.correct || "—",
        detail.isCorrect ? "OK" : "X",
      ]
        .map(escapeCsvCell)
        .join(",")
    );
  }

  return `\uFEFF${rows.join("\n")}`;
}

function buildQuizFilename(): string {
  return "quiz-report.csv";
}

function getLanguageLabel(landing: string): string {
  const normalized = landing.trim().toUpperCase();
  if (normalized === "FR" || normalized === "FRENCH") return "🇫🇷 Французский";
  if (normalized === "ES" || normalized === "SPANISH") return "🇪🇸 Испанский";
  if (normalized === "EN" || normalized === "EN-US" || normalized === "US") return "🇺🇸 Английский (US)";
  return "🇫🇷 Французский";
}

function buildTelegramLeadText(params: {
  isQuiz: boolean;
  languageLabel: string;
  name: string;
  contact: string;
  scoreText: string | number;
  totalText: string | number;
  level: string;
  preferences?: LeadPreferences;
}): string {
  const hasQuizResult = params.isQuiz && params.scoreText !== "—" && params.totalText !== "—";
  const resultText = hasQuizResult ? `${params.scoreText}/${params.totalText}` : "—";
  const quizLines = params.isQuiz
    ? [
      `Результат: ${escapeHtml(resultText)}`,
      `Уровень: ${escapeHtml(params.level || "—")}`,
    ]
    : [];
  const preferenceLines = params.preferences
    ? buildPreferenceLines(params.preferences)
    : [];

  return [
    "🆕 Заявка с сайта",
    `Язык: ${escapeHtml(params.languageLabel)}`,
    `Имя: ${escapeHtml(params.name)}`,
    `Контакт: ${escapeHtml(params.contact)}`,
    ...quizLines,
    ...preferenceLines,
  ].join("\n");
}


async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API: ${res.status} ${err}`);
  }
}

async function sendTelegramDocument(caption: string, filename: string, content: string, mimeType = "text/plain; charset=utf-8"): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");

  const form = new FormData();
  form.set("chat_id", chatId);
  form.set("caption", toPlainTelegramText(caption));
  const fileBlob = new Blob([content], { type: mimeType });
  form.append("document", fileBlob, filename);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API (document): ${res.status} ${err}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function parseRequestBody(req: LeadRequest): Record<string, unknown> {
  const raw = req.body;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === "string" && raw.trim().length) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }
  return {};
}

function toPlainTelegramText(text: string): string {
  return text
    .replaceAll("<br>", "\n")
    .replaceAll("<br/>", "\n")
    .replaceAll("<br />", "\n")
    .replace(/<\/?[^>]+(>|$)/g, "");
}

export default async function handler(req: LeadRequest, res: LeadResponse) {
  try {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const body = parseRequestBody(req);
    const name = trim(body.name);
    const contact = trim(body.contact);
    const source = detectLeadSource(req, body.source);
    const landing = trim(body.landing);
    const quizLevel = trim(body.quizLevel);
    const quizScore = toNumber(body.quizScore);
    const quizTotal = toNumber(body.quizTotal);
    const quizDetails = toQuizDetails(body.quizDetails);
    const leadPreferences = parseLeadPreferences(body);

    if (source === "quiz_complete_no_lead") {
      console.info(
        "[lead] quiz_complete_no_lead:",
        JSON.stringify({
          landing,
          score: quizScore,
          total: quizTotal,
        })
      );
      return res.status(200).json({ success: true });
    }

    const validation = validate(name, contact);
    if (validation.ok === false) {
      return res.status(validation.status).json({ error: validation.message });
    }

    const isQuiz = source === "quiz_request";
    const quizScoreText: string | number = isQuiz ? (quizScore ?? "—") : "—";
    const quizTotalText: string | number = isQuiz ? (quizTotal ?? "—") : "—";
    const quizLevelText = isQuiz ? (quizLevel || "—") : "—";
    const telegramText = buildTelegramLeadText({
      isQuiz,
      languageLabel: getLanguageLabel(landing),
      name,
      contact,
      scoreText: quizScoreText,
      totalText: quizTotalText,
      level: quizLevelText,
      preferences: leadPreferences,
    });

    if (source === "quiz_request") {
      const reportCsv = buildQuizCsv({
        name,
        contact,
        source,
        scoreText: quizScoreText,
        totalText: quizTotalText,
        level: quizLevel,
        details: quizDetails,
      });
      try {
        await sendTelegramDocument(
          telegramText,
          buildQuizFilename(),
          reportCsv,
          "text/csv; charset=utf-8"
        );
      } catch (docError) {
        const reason = docError instanceof Error ? docError.message : String(docError);
        const shortReason = reason.slice(0, 280);
        console.error("[lead] Telegram document error:", reason);
        await sendTelegram(`${telegramText}\n\n⚠️ Файл отчета не прикрепился.\nПричина: ${escapeHtml(shortReason)}`);
      }
    } else {
      await sendTelegram(telegramText);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[lead] handler error:", message);
    const payload: { error: string; detail?: string } = { error: "Не удалось отправить заявку. Попробуйте позже." };
    if (process.env.DEBUG_LEAD && process.env.NODE_ENV !== "production") {
      payload.detail = message;
    }
    if (!res.headersSent) {
      return res.status(500).json(payload);
    }
  }
}
