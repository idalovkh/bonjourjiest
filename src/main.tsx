import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installRuntimeGuard } from "./diagnostics/runtime-guard";

// Only in dev or when ?debug=1 — reduces prod bundle work
if (import.meta.env.DEV || new URLSearchParams(location.search).get("debug") === "1") {
  installRuntimeGuard();
}

// Build version for cache/debug verification (only when ?debug=1)
if (typeof __BUILD_TS__ !== "undefined" && new URLSearchParams(location.search).get("debug") === "1") {
  console.log("[deshar] build:", __BUILD_TS__);
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
