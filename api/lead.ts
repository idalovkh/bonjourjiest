import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import { fetch as undiciFetch, ProxyAgent, FormData, File, type Dispatcher } from "undici";
import { SocksProxyAgent } from "socks-proxy-agent";

const NAME_MAX = 100;
const CONTACT_MAX = 200;

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

/** Only Telegram `fetch` uses this: `http(s)://user:pass@host:port` or `socks5://...` from `TELEGRAM_PROXY_URL`. */
function getTelegramDispatcher(): Dispatcher | undefined {
  const raw = trim(process.env.TELEGRAM_PROXY_URL);
  if (!raw.length) return undefined;

  const lower = raw.toLowerCase();
  if (lower.startsWith("socks5://") || lower.startsWith("socks4://") || lower.startsWith("socks://")) {
    return new SocksProxyAgent(raw) as unknown as Dispatcher;
  }
  return new ProxyAgent(raw);
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

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => trim(v)).filter(Boolean);
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


async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");

  const dispatcher = getTelegramDispatcher();
  const res = await undiciFetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    ...(dispatcher ? { dispatcher } : {}),
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

  const dispatcher = getTelegramDispatcher();
  const form = new FormData();
  form.set("chat_id", chatId);
  form.set("caption", caption);
  form.set("parse_mode", "HTML");
  form.set("document", new File([content], filename, { type: mimeType }));

  const res = await undiciFetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
    ...(dispatcher ? { dispatcher } : {}),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API (document): ${res.status} ${err}`);
  }
}

/** Sends email if SMTP/MAIL env vars are set; no-op otherwise. */
async function sendEmail(name: string, contact: string): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!host || !user || !pass || !from || !to) {
    return; // SMTP not configured — skip email
  }

  const portNum = port ? Number.parseInt(port, 10) : 587;
  const transporter = nodemailer.createTransport({
    host,
    port: portNum,
    secure: portNum === 465,
    auth: { user, pass },
  });

  const subject = `Заявка с лендинга: ${name}`;
  const text = `Новая заявка на пробный урок\n\nИмя: ${name}\nКонтакт: ${contact}`;
  const html = `<p>Новая заявка на пробный урок</p><p><strong>Имя:</strong> ${escapeHtml(name)}</p><p><strong>Контакт:</strong> ${escapeHtml(contact)}</p>`;

  await transporter.sendMail({ from, to, subject, text, html });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

export default async function handler(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = trim(body.name);
  const contact = trim(body.contact);
  const source = trim(body.source) || "lead";
  const quizLevel = trim(body.quizLevel);
  const quizScore = toNumber(body.quizScore);
  const quizTotal = toNumber(body.quizTotal);
  const weakTopics = toStringArray(body.weakTopics);
  const quizDetails = toQuizDetails(body.quizDetails);

  const validation = validate(name, contact);
  if (validation.ok === false) {
    return res.status(validation.status).json({ error: validation.message });
  }

  try {
    const quizScoreText = quizScore ?? "—";
    const quizTotalText = quizTotal ?? "—";
    const quizLevelText = escapeHtml(quizLevel || "—");
    const weakTopicsText = escapeHtml(weakTopics.length > 0 ? weakTopics.join(", ") : "нет");
    const quizPart = source === "quiz"
      ? `\n\n🧠 <b>Мини-квиз</b>\n📊 Результат: ${quizScoreText}/${quizTotalText}\n🏷 Уровень: ${quizLevelText}\n📚 Темы на повторение: ${weakTopicsText}`
      : "";
    const telegramText = `🆕 <b>Заявка с лендинга</b>\n\n👤 Имя: ${escapeHtml(name)}\n📱 Контакт: ${escapeHtml(contact)}\n🔖 Источник: ${escapeHtml(source)}${quizPart}`;
    if (source === "quiz") {
      const reportCsv = buildQuizCsv({
        name,
        contact,
        source,
        scoreText: quizScoreText,
        totalText: quizTotalText,
        level: quizLevel,
        details: quizDetails,
      });
      await sendTelegramDocument(
        telegramText,
        `quiz-result-${Date.now()}.csv`,
        reportCsv,
        "text/csv; charset=utf-8"
      );
    } else {
      await sendTelegram(telegramText);
    }
    try {
      await sendEmail(name, contact);
    } catch (e) {
      // Письмо опционально: не ломаем ответ, заявка уже в Telegram
      let msg = "(delivery failed)";
      if (process.env.NODE_ENV !== "production") {
        msg = e instanceof Error ? e.message : String(e);
      }
      console.error("[lead] SMTP error:", msg);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const payload: { error: string; detail?: string } = { error: "Не удалось отправить заявку. Попробуйте позже." };
    // detail только в dev, на проде не раскрываем внутренние ошибки
    if (process.env.DEBUG_LEAD && process.env.NODE_ENV !== "production") {
      payload.detail = message;
    }
    return res.status(500).json(payload);
  }
}
