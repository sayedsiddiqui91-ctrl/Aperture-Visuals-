// Headless screenshots for visual verification: node scripts/shot.mjs [width] [height] [scrollPositions...]
import { chromium } from "playwright";
const [w = 1440, h = 900, ...pos] = process.argv.slice(2).map(Number);
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => m.type() === "error" && console.log("CONSOLE", m.text()));
await page.goto("http://localhost:3011", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const positions = pos.length ? pos : [0];
for (const y of positions) {
  await page.evaluate((y) => window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}shot-${w}-${y}.jpg`, quality: 70, type: "jpeg" });
  console.log("shot", w, y);
}
console.log("scrollHeight", await page.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
