import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = join(root, "scripts");
const publicDir = join(root, "public");
const logoMark = join(root, "src/assets/brand/logo-mark.png");

mkdirSync(publicDir, { recursive: true });

function resizeSquare(input, output, size) {
  execFileSync("sips", ["-z", String(size), String(size), input, "--out", output], {
    stdio: "inherit",
  });
}

function fitSquare(input, output, size, padColor = "FFFFFF") {
  const temp = join(publicDir, `.favicon-temp-${size}.png`);
  execFileSync("sips", ["-Z", String(size), input, "--out", temp], { stdio: "inherit" });
  execFileSync(
    "sips",
    [
      "--padToHeightWidth",
      String(size),
      String(size),
      "--padColor",
      padColor,
      temp,
      "--out",
      output,
    ],
    { stdio: "inherit" }
  );
  rmSync(temp, { force: true });
}

function cropEmblem(input, output) {
  execFileSync(
    "sips",
    ["--cropToHeightWidth", "480", "1092", "--cropOffset", "0", "0", input, "--out", output],
    { stdio: "inherit" }
  );
}

const emblem = join(publicDir, ".emblem-crop.png");
cropEmblem(logoMark, emblem);

// Вкладка браузера — только графическая эмблема (горы, солнце, башня)
resizeSquare(emblem, join(publicDir, "favicon-16.png"), 16);
resizeSquare(emblem, join(publicDir, "favicon-32.png"), 32);
resizeSquare(emblem, join(publicDir, "favicon-tab-512.png"), 512);

// Apple / PWA — полная эмблема с названием
fitSquare(logoMark, join(publicDir, "apple-touch-icon.png"), 180);
fitSquare(logoMark, join(publicDir, "favicon-192.png"), 192);
fitSquare(logoMark, join(publicDir, "favicon-512.png"), 512);

rmSync(emblem, { force: true });

copyFileSync(join(scriptsDir, "favicon-source.html"), join(publicDir, "favicon-source.html"));
copyFileSync(join(scriptsDir, "favicon-tab-source.html"), join(publicDir, "favicon-tab-source.html"));

console.log("Done.");
