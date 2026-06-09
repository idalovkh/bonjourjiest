import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "flag-icons/css/flag-icons.min.css";
import "./index.css";
import { installRuntimeGuard } from "./diagnostics/runtime-guard";

// Always: catches ChunkLoadError and triggers reload in prod; full overlay only with ?debug=1
installRuntimeGuard();

// Build version for cache/debug verification (only when ?debug=1)
if (typeof __BUILD_TS__ !== "undefined" && new URLSearchParams(location.search).get("debug") === "1") {
  console.log("[bonjourjiest] build:", __BUILD_TS__);
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
