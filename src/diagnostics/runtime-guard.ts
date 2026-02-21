type ErrorPayload = {
  title: string;
  message: string;
  stack?: string;
};

let installed = false;
let shown = false;

function ensureOverlay(): HTMLDivElement {
  const existing = document.getElementById("runtime-error-overlay");
  if (existing) return existing as HTMLDivElement;

  const el = document.createElement("div");
  el.id = "runtime-error-overlay";
  el.style.position = "fixed";
  el.style.left = "12px";
  el.style.right = "12px";
  el.style.bottom = "12px";
  el.style.zIndex = "99999";
  el.style.padding = "12px";
  el.style.borderRadius = "10px";
  el.style.background = "rgba(15, 23, 42, 0.96)";
  el.style.color = "#fff";
  el.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";
  el.style.fontSize = "12px";
  el.style.lineHeight = "1.45";
  el.style.whiteSpace = "pre-wrap";
  el.style.boxShadow = "0 10px 30px rgba(0, 0, 0, .35)";
  document.body.appendChild(el);
  return el;
}

function isDebugMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

function ensureFallbackCard(): HTMLDivElement {
  const existing = document.getElementById("runtime-fallback-card");
  if (existing) return existing as HTMLDivElement;

  const root = document.createElement("div");
  root.id = "runtime-fallback-card";
  root.style.position = "fixed";
  root.style.inset = "0";
  root.style.zIndex = "99998";
  root.style.display = "grid";
  root.style.placeItems = "center";
  root.style.background = "hsl(0 0% 99% / 0.98)";
  root.style.padding = "24px";

  const card = document.createElement("div");
  card.style.width = "min(440px, 100%)";
  card.style.border = "1px solid hsl(230 18% 92%)";
  card.style.borderRadius = "16px";
  card.style.background = "white";
  card.style.padding = "20px";
  card.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
  card.style.fontFamily = "system-ui, sans-serif";
  card.style.textAlign = "center";

  const title = document.createElement("h1");
  title.textContent = "Something went wrong";
  title.style.margin = "0 0 8px";
  title.style.fontSize = "24px";
  title.style.lineHeight = "1.2";
  title.style.color = "hsl(230 25% 14%)";

  const text = document.createElement("p");
  text.textContent = "Страница столкнулась с ошибкой. Попробуйте перезагрузить.";
  text.style.margin = "0 0 16px";
  text.style.fontSize = "14px";
  text.style.color = "hsl(230 10% 48%)";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Reload";
  button.style.border = "1px solid hsl(230 18% 92%)";
  button.style.borderRadius = "9999px";
  button.style.height = "40px";
  button.style.padding = "0 16px";
  button.style.background = "white";
  button.style.cursor = "pointer";
  button.style.fontSize = "14px";
  button.style.fontWeight = "600";
  button.onclick = () => window.location.reload();

  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(button);
  root.appendChild(card);
  document.body.appendChild(root);
  return root;
}

const CHUNK_RELOAD_KEY = "chunk-reload-ts";
const CHUNK_RELOAD_WINDOW_MS = 15_000;
const CHUNK_RELOAD_MAX = 1;

function isChunkLoadError(message: string): boolean {
  return (
    /loading chunk .* failed/i.test(message) ||
    /chunkloaderror/i.test(message) ||
    /failed to fetch dynamically imported module/i.test(message)
  );
}

function tryChunkReload(): boolean {
  try {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") return false;
    const raw = sessionStorage.getItem(CHUNK_RELOAD_KEY);
    const entries: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = entries.filter((t) => now - t < CHUNK_RELOAD_WINDOW_MS);
    if (recent.length >= CHUNK_RELOAD_MAX) return false;
    recent.push(now);
    sessionStorage.setItem(CHUNK_RELOAD_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return false;
  }
}

function toStringReason(reason: unknown): { message: string; stack?: string } {
  if (reason instanceof Error) {
    return { message: reason.message, stack: reason.stack };
  }
  if (typeof reason === "string") {
    return { message: reason };
  }
  try {
    return { message: JSON.stringify(reason) };
  } catch {
    return { message: String(reason) };
  }
}

function report(payload: ErrorPayload) {
  console.error(`[runtime] ${payload.title}: ${payload.message}`, payload.stack ?? "");
  if (!import.meta.env.PROD) return;
  if (typeof document === "undefined") return;
  if (shown) return;

  if (isChunkLoadError(payload.message) && tryChunkReload()) {
    window.location.reload();
    return;
  }

  shown = true;
  ensureFallbackCard();
  if (isDebugMode()) {
    const overlay = ensureOverlay();
    overlay.textContent = `${payload.title}\n${payload.message}${payload.stack ? `\n\n${payload.stack}` : ""}`;
  }
}

export function installRuntimeGuard() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    report({
      title: "Runtime error",
      message: event.message || "Unknown script error",
      stack: event.error instanceof Error ? event.error.stack : undefined,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const { message, stack } = toStringReason(event.reason);
    report({
      title: "Unhandled promise rejection",
      message,
      stack,
    });
  });
}
