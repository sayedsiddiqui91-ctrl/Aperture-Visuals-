import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/ref/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
async function sweep(vp, prefix, step, opts = {}) {
  const ctx = await browser.newContext({ viewport: vp, ...opts });
  const page = await ctx.newPage();
  await page.goto("https://illoca.unseen.co/", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(5000);
  const rej = page.locator("text=Reject").first(); if (await rej.count()) await rej.click().catch(() => {});
  await page.waitForTimeout(600);
  await page.mouse.move(vp.width / 2, vp.height / 2);
  const log = [];
  let last = -1;
  for (let i = 0; i < 200; i++) {
    const st = await page.evaluate(() => document.querySelector(".lenis")?.scrollTop ?? window.scrollY);
    await page.screenshot({ path: `${OUT}${prefix}-${String(i).padStart(3, "0")}.jpg`, type: "jpeg", quality: 55 });
    log.push({ i, st });
    if (st === last) break;
    last = st;
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(900);
  }
  writeFileSync(`${OUT}${prefix}-log.json`, JSON.stringify(log));
  console.log(prefix, "frames", log.length, "last", last);
  return page;
}
const p = await sweep({ width: 1440, height: 900 }, "D", 700);
await p.close();
const m = await sweep({ width: 390, height: 844 }, "M", 700, { isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
// mobile menu
await m.evaluate(() => document.querySelector(".lenis").scrollTo(0, 0)); await m.waitForTimeout(600);
await m.locator("text=Menu").first().click({ force: true }).catch((e) => console.log("menu click fail", e.message)); await m.waitForTimeout(1200);
await m.screenshot({ path: `${OUT}M-menu.jpg`, type: "jpeg", quality: 70 });
console.log("menu html:", await m.evaluate(() => { const o = [...document.querySelectorAll("div,nav")].find(e => /Features/.test(e.textContent) && getComputedStyle(e).position === "fixed" && e.getBoundingClientRect().height > 300); return o ? o.outerHTML.slice(0, 2500) : "none"; }));
await browser.close();
