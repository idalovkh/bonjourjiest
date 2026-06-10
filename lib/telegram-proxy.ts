import { ProxyAgent, type Dispatcher } from "undici";
import { SocksProxyAgent } from "socks-proxy-agent";

const SCHEME_RE = /^[a-z][a-z0-9+.-]*:\/\//i;
const HOST_PORT_USER_PASS_RE = /^([^:\s]+):(\d+):([^:\s]+):(.+)$/;
const HOST_PORT_RE = /^([^:\s]+):(\d+)$/;

/** `host:port:user:pass` → `http://user:pass@host:port` (и другие короткие форматы). */
export function normalizeTelegramProxyUrl(raw: string): string {
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  if (!trimmed) {
    throw new Error("TELEGRAM_PROXY_URL is empty");
  }

  if (SCHEME_RE.test(trimmed)) {
    return trimmed;
  }

  const fourPart = HOST_PORT_USER_PASS_RE.exec(trimmed);
  if (fourPart) {
    const [, host, port, user, pass] = fourPart;
    return `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}`;
  }

  if (trimmed.includes("@")) {
    return `http://${trimmed}`;
  }

  const twoPart = HOST_PORT_RE.exec(trimmed);
  if (twoPart) {
    const [, host, port] = twoPart;
    return `http://${host}:${port}`;
  }

  throw new Error("TELEGRAM_PROXY_URL: ожидается http(s)://, socks5:// или host:port:user:pass");
}

export function isSocksProxyUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.startsWith("socks5://") ||
    lower.startsWith("socks5h://") ||
    lower.startsWith("socks4://") ||
    lower.startsWith("socks://")
  );
}

export function createTelegramDispatcher(proxyUrl: string): Dispatcher {
  const url = normalizeTelegramProxyUrl(proxyUrl);
  if (isSocksProxyUrl(url)) {
    return new SocksProxyAgent(url) as unknown as Dispatcher;
  }
  return new ProxyAgent(url);
}

export function tryCreateTelegramDispatcher(
  proxyUrl: string | undefined
): { ok: true; dispatcher: Dispatcher } | { ok: false; error: string } {
  if (!proxyUrl) {
    return { ok: false, error: "not_configured" };
  }
  try {
    return { ok: true, dispatcher: createTelegramDispatcher(proxyUrl) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
