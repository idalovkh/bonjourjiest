/**
 * Локальный сервер API для тестирования лидов/квиза без Vercel.
 * Запуск: npm run dev:api или npm run dev:full.
 * Порт: API_PORT (по умолчанию 3002) или первый свободный из диапазона в dev.
 */
import "dotenv/config";
import { writeFileSync } from "fs";
import { resolve } from "path";
import express from "express";
import handler from "../lib/lead-handler.ts";
import healthHandler from "../api/lead/health.ts";

const app = express();
app.use(express.json());

const leadApiRoutes = [
  "/api/lead",
  "/api/lead/request",
  "/api/lead/quiz-request",
  "/api/quiz/complete-no-lead",
] as const;

app.get("/api/lead/health", (req, res) => {
  void healthHandler(req as never, res as never);
});

for (const route of leadApiRoutes) {
  app.all(route, (req, res) => {
    void handler(req as never, res as never);
  });
}

const isProduction = process.env.NODE_ENV === "production";
const portMin = Number(process.env.API_PORT) || 3002;
const portMax = isProduction ? portMin : portMin + 9;
let port = portMin;

function onListen() {
  const portFile = resolve(process.cwd(), ".dev-api-port");
  try {
    writeFileSync(portFile, String(port), "utf8");
  } catch {
    // ignore
  }
  console.log(`[api] Local API routes on http://localhost:${port}:`);
  for (const route of leadApiRoutes) {
    console.log(`[api]   ${route}`);
  }
  if (port !== portMin) {
    console.log(`[api] Порт ${port}. Для dev:full задай в .env: VITE_API_ORIGIN=http://localhost:${port}`);
  }
}

const server = app.listen(port, onListen);

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE" && port < portMax) {
    port += 1;
    server.listen(port, onListen);
  } else if (err.code === "EADDRINUSE") {
    console.error(`[api] Порты ${portMin}–${portMax} заняты. Освободи: npx kill-port ${portMin}`);
    process.exit(1);
  } else {
    throw err;
  }
});

function shutdown() {
  server.close(() => process.exit(0));
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown);
