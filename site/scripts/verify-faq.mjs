// FAQ layout: heading must not touch the question column, and both columns should start level.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
const B = process.env.BASE || "http://localhost:3020";
const V = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/v/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const imgs = [];
for (const vp of [{ width: 1580, height: 700 }, { width: 1024, height: 700 }, { width: 390, height: 844 }]) {
  const p = await (await browser.newContext({ viewport: vp, ...(vp.width < 500 ? { isMobile: true, hasTouch: true } : {}) })).newPage();
  await p.goto(B + "/", { waitUntil: "load" }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const s = document.getElementById("faq"); window.__lenis.scrollTo(s.getBoundingClientRect().top + scrollY - 40, { immediate: true }); });
  await p.waitForTimeout(1400);
  await p.click(".faq__item:nth-child(2) .faq__q"); await p.waitForTimeout(700);
  const m = await p.evaluate(() => {
    const h = document.querySelector(".faq__title").getBoundingClientRect();
    const list = document.querySelector(".faq__list").getBoundingClientRect();
    const range = document.createRange(); range.selectNodeContents(document.querySelector(".faq__title"));
    const lines = Math.round(h.height / parseFloat(getComputedStyle(document.querySelector(".faq__title")).lineHeight));
    return { gap: Math.round(list.left - h.right), topDiff: Math.round(list.top - h.top), lines, stacked: list.top > h.bottom };
  });
  console.log(`${vp.width}px: gap between heading and questions ${m.stacked ? "(stacked)" : m.gap + "px"}, heading lines ${m.lines}, top offset ${m.topDiff}px`);
  const a = await new AxeBuilder({ page: p }).include("#faq").analyze();
  console.log(`   axe #faq: ${a.violations.length ? a.violations.map((v) => v.id).join(", ") : "0 violations"}`);
  imgs.push(await p.screenshot());
  await p.close();
}
await browser.close();
const top = await sharp(imgs[0]).resize(1400).toBuffer(); const tm = await sharp(top).metadata();
const mid = await sharp(imgs[1]).resize(700).toBuffer(); const mm = await sharp(mid).metadata();
const ph = await sharp(imgs[2]).resize(300).toBuffer(); const pm = await sharp(ph).metadata();
await sharp({ create: { width: 1400, height: tm.height + 8 + Math.max(mm.height, pm.height), channels: 3, background: "#111" } })
  .composite([{ input: top, left: 0, top: 0 }, { input: mid, left: 0, top: tm.height + 8 }, { input: ph, left: 710, top: tm.height + 8 }])
  .jpeg({ quality: 80 }).toFile(V + "faq-fixed.jpg");
