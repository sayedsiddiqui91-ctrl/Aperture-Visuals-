import { chromium } from "playwright";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
await page.setContent(`<video id=v src="http://localhost:3011/video/showreel.mp4" muted style="width:1280px;height:720px;object-fit:contain;background:#000"></video>`);
const dur = await page.evaluate(() => new Promise(r => { const v = document.getElementById("v"); v.addEventListener("loadedmetadata", () => r(v.duration)); }));
console.log("duration", dur);
const times = [0.5, dur * 0.25, dur * 0.5, dur * 0.75, dur - 0.5];
for (let i = 0; i < times.length; i++) {
  await page.evaluate((t) => new Promise(r => { const v = document.getElementById("v"); v.currentTime = t; v.addEventListener("seeked", () => r(), { once: true }); }), times[i]);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}vf-${i}.jpg`, type: "jpeg", quality: 70 });
}
await browser.close();
