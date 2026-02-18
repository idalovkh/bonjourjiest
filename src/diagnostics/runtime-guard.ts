type ErrorPayload = {
  title: string;
  message: string;
  stack?: string;
};

let installed = false;

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
  const overlay = ensureOverlay();
  overlay.textContent = `${payload.title}\n${payload.message}${payload.stack ? `\n\n${payload.stack}` : ""}`;
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
