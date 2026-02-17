import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const NAME_MAX = 100;
const CONTACT_MAX = 200;

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

function validate(name: string, contact: string): { ok: true } | { ok: false; status: number; message: string } {
  if (!name.length) return { ok: false, status: 400, message: "Введите имя" };
  if (name.length > NAME_MAX) return { ok: false, status: 400, message: "Имя слишком длинное" };
  if (!contact.length) return { ok: false, status: 400, message: "Введите контакт" };
  if (contact.length > CONTACT_MAX) return { ok: false, status: 400, message: "Контакт слишком длинный" };
  return { ok: true };
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

  const portNum = port ? parseInt(port, 10) : 587;
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = trim(body.name);
  const contact = trim(body.contact);

  const validation = validate(name, contact);
  if (!validation.ok) {
    const { status, message } = validation;
    return res.status(status).json({ error: message });
  }

  try {
    const telegramText = `🆕 <b>Заявка на пробный урок</b>\n\n👤 Имя: ${escapeHtml(name)}\n📱 Контакт: ${escapeHtml(contact)}`;
    await sendTelegram(telegramText);
    try {
      await sendEmail(name, contact);
    } catch (e) {
      // Письмо опционально: не ломаем ответ, заявка уже в Telegram
      console.error("[lead] SMTP error:", e instanceof Error ? e.message : e);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const payload: { error: string; detail?: string } = { error: "Не удалось отправить заявку. Попробуйте позже." };
    if (process.env.DEBUG_LEAD) payload.detail = message;
    return res.status(500).json(payload);
  }
}
