type HealthRequest = { method?: string };
type HealthResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): HealthResponse;
  json(body: unknown): void;
};

function readEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;
  return raw.trim().replace(/^["']|["']$/g, "");
}

export default function handler(req: HealthRequest, res: HealthResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const token = readEnv("TELEGRAM_BOT_TOKEN");
  const chatId = readEnv("TELEGRAM_CHAT_ID");
  const proxyUrl = readEnv("TELEGRAM_PROXY_URL");
  const debug = readEnv("DEBUG_LEAD");

  return res.status(200).json({
    ok: Boolean(token && chatId),
    env: {
      hasTelegramToken: Boolean(token),
      hasTelegramChatId: Boolean(chatId),
      hasTelegramProxy: Boolean(proxyUrl),
      chatIdSuffix: chatId ? chatId.slice(-4) : null,
      debugLead: debug === "1" || debug === "true",
    },
    vercel: {
      env: process.env.VERCEL_ENV ?? null,
    },
  });
}
