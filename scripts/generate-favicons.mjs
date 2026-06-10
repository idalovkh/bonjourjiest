import sharp from "sharp";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = join(root, "scripts");
const publicDir = join(root, "public");
const logoMark = join(root, "src/assets/brand/logo-mark.png");

/** Плотный кроп графики без текста */
const TAB_EMBLEM_CROP = { left: 6, top: 6, width: 1073, height: 464 };

mkdirSync(publicDir, { recursive: true });

async function tabFavicon(size, output) {
  await sharp(logoMark)
    .extract(TAB_EMBLEM_CROP)
    .flatten({ background: "#ffffff" })
    .resize(size, size, {
      fit: "cover",
      position: "east",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(output);
}

async function fullMarkFavicon(size, output) {
  await sharp(logoMark)
    .flatten({ background: "#ffffff" })
    .resize(size, size, {
      fit: "contain",
      background: "#ffffff",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(output);
}

await tabFavicon(16, join(publicDir, "favicon-16.png"));
await tabFavicon(32, join(publicDir, "favicon-32.png"));
await tabFavicon(512, join(publicDir, "favicon-tab-512.png"));

await fullMarkFavicon(180, join(publicDir, "apple-touch-icon.png"));
await fullMarkFavicon(192, join(publicDir, "favicon-192.png"));
await fullMarkFavicon(512, join(publicDir, "favicon-512.png"));

copyFileSync(join(scriptsDir, "favicon-source.html"), join(publicDir, "favicon-source.html"));
copyFileSync(join(scriptsDir, "favicon-tab-source.html"), join(publicDir, "favicon-tab-source.html"));

console.log("Done.");
