/**
 * Запускает API, ждёт порт, затем Vite с правильным VITE_API_ORIGIN.
 * Перед стартом освобождает порты 3001–3010 от старых процессов API.
 */
import { spawn, spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const portFile = resolve(root, ".dev-api-port");

// Освобождаем порты от зависших API (ошибки игнорируем)
const ports = [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010];
spawnSync("npx", ["kill-port", ...ports.map(String)], { cwd: root, stdio: "ignore" });

const api = spawn("npx", ["tsx", "scripts/serve-api.ts"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env },
});

let viteProcess = null;
function killAll(sig = "SIGTERM") {
  api.kill(sig);
  if (viteProcess) viteProcess.kill(sig);
  process.exit(0);
}
process.on("SIGINT", () => killAll("SIGINT"));
process.on("SIGTERM", () => killAll("SIGTERM"));
process.on("SIGHUP", () => killAll("SIGTERM"));

function waitForPort(maxMs = 10000) {
  return new Promise((resolvePort, reject) => {
    const start = Date.now();
    const t = setInterval(() => {
      if (Date.now() - start > maxMs) {
        clearInterval(t);
        reject(new Error("API не запустился за 10s"));
        return;
      }
      try {
        if (existsSync(portFile)) {
          clearInterval(t);
          const port = readFileSync(portFile, "utf8").trim();
          resolvePort(port);
        }
      } catch {
        // ignore
      }
    }, 100);
  });
}

waitForPort()
  .then((port) => {
    viteProcess = spawn("npx", ["vite"], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, VITE_API_ORIGIN: `http://localhost:${port}` },
    });
    viteProcess.on("exit", (code) => {
      api.kill();
      process.exit(code ?? 0);
    });
  })
  .catch((err) => {
    console.error(err.message);
    api.kill();
    process.exit(1);
  });
