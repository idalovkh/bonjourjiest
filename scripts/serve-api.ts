/**
 * Локальный сервер API для тестирования /api/lead без Vercel.
 * Запуск: npm run dev:api или npm run dev:full.
 * Порт: API_PORT или первый свободный из 3001..3010.
 */
import "dotenv/config";
import { writeFileSync } from "fs";
import { resolve } from "path";
import express from "express";
import handler from "../api/lead.ts";

const app = express();
app.use(express.json());

app.all("/api/lead", (req, res) => {
  void handler(req as never, res as never);
});

const portMin = Number(process.env.API_PORT) || 3001;
const portMax = portMin + 9;
let port = portMin;

function onListen() {
  const portFile = resolve(process.cwd(), ".dev-api-port");
  try {
    writeFileSync(portFile, String(port), "utf8");
  } catch {
    // ignore
  }
  console.log(`[api] Local API: http://localhost:${port}/api/lead`);
  if (port !== 3001) {
    console.log(`[api] Порт ${port}. Для dev:full либо задай в .env: VITE_API_ORIGIN=http://localhost:${port}, либо освободи 3001: npx kill-port 3001`);
  }
}

const server = app.listen(port, onListen);

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE" && port < portMax) {
    port += 1;
    server.listen(port, onListen);
  } else if (err.code === "EADDRINUSE") {
    console.error(`[api] Порты ${portMin}–${portMax} заняты. Освободи: npx kill-port 3001`);
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
