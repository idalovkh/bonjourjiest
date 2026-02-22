import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installRuntimeGuard } from "./diagnostics/runtime-guard";

installRuntimeGuard();

// Build version for cache/debug verification (visible in Safari Web Inspector)
if (typeof __BUILD_TS__ !== "undefined") {
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
