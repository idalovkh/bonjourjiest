import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = join(root, "scripts");
const publicDir = join(root, "public");

mkdirSync(publicDir, { recursive: true });

const shots = [
  {
    html: "favicon-source.html",
    viewport: { width: 512, height: 512 },
    out: "favicon-512.png",
  },
  {
    html: "favicon-tab-source.html",
    viewport: { width: 512, height: 512 },
    out: "favicon-tab-512.png",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const shot of shots) {
  const fileUrl = `file://${join(scriptsDir, shot.html)}`;
  await page.setViewportSize(shot.viewport);
  await page.goto(fileUrl, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(publicDir, shot.out),
    type: "png",
    omitBackground: false,
  });
  console.log(`Wrote ${shot.out}`);
}

await browser.close();

function resize(input, output, size) {
  execFileSync("sips", ["-z", String(size), String(size), input, "--out", output], {
    stdio: "inherit",
  });
}

const tab512 = join(publicDir, "favicon-tab-512.png");
const master512 = join(publicDir, "favicon-512.png");

resize(tab512, join(publicDir, "favicon-32.png"), 32);
resize(tab512, join(publicDir, "favicon-16.png"), 16);
resize(master512, join(publicDir, "apple-touch-icon.png"), 180);
resize(master512, join(publicDir, "favicon-192.png"), 192);

copyFileSync(join(scriptsDir, "favicon-source.html"), join(publicDir, "favicon-source.html"));
copyFileSync(join(scriptsDir, "favicon-tab-source.html"), join(publicDir, "favicon-tab-source.html"));

console.log("Done.");
