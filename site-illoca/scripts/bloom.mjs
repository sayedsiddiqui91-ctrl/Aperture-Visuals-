import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/bloom/";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const reqs = [];
page.on("response", (r) => { const u = r.url(); if (/\.(mp4|webm|m3u8|woff2?|js|css|jpg|jpeg|png|webp|avif|svg|gif)(\?|$)/i.test(u)) reqs.push(u); });
await page.goto("https://www.bloom3d.studio/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(6000);
await page.screenshot({ path: OUT + "top.jpg", type: "jpeg", quality: 75 });
const info = await page.evaluate(() => {
  const html = document.documentElement.outerHTML;
  const gen = document.querySelector("meta[name=generator]")?.content;
  const fonts = [...document.fonts].map(f => f.family + " " + f.weight).filter((v, i, a) => a.indexOf(v) === i);
  const colors = {}; document.querySelectorAll("*").forEach(e => { const s = getComputedStyle(e); [s.backgroundColor, s.color].forEach(c => { if (c && c !== "rgba(0, 0, 0, 0)") colors[c] = (colors[c] || 0) + 1; }); });
  const scrollH = document.documentElement.scrollHeight;
  const wrappers = [...document.querySelectorAll("body *")].filter(e => { const s = getComputedStyle(e); return (s.overflowY === "auto" || s.overflowY === "scroll") && e.scrollHeight > e.clientHeight + 10; }).map(e => e.className.toString().slice(0, 60));
  const sections = [...document.querySelectorAll("section, header, footer, main > div, body > div > div")].map(e => ({ tag: e.tagName, id: e.id, cls: e.className.toString().slice(0, 70), y: Math.round(e.getBoundingClientRect().top + scrollY), h: Math.round(e.getBoundingClientRect().height), bg: getComputedStyle(e).backgroundColor })).filter(s => s.h > 80).slice(0, 40);
  const text = document.body.innerText.slice(0, 6000);
  const videos = [...document.querySelectorAll("video")].map(v => ({ src: v.currentSrc || v.src, poster: v.poster, w: v.getBoundingClientRect().width, h: v.getBoundingClientRect().height, auto: v.autoplay, loop: v.loop, muted: v.muted, cls: v.className.toString().slice(0, 60) }));
  const canvases = document.querySelectorAll("canvas").length;
  const links = [...document.querySelectorAll("a")].map(a => a.textContent.trim().slice(0, 30) + " -> " + a.getAttribute("href")).filter((v, i, a) => a.indexOf(v) === i).slice(0, 60);
  const headings = [...document.querySelectorAll("h1,h2,h3")].map(h => { const s = getComputedStyle(h); return [h.tagName, h.textContent.trim().slice(0, 60), s.fontFamily.split(",")[0], s.fontSize, s.fontWeight, s.letterSpacing, s.textTransform, s.color]; });
  return { gen, fonts, colors: Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 20), scrollH, wrappers, sections, text, videos, canvases, links, headings, htmlLen: html.length, bodyCls: document.body.className, htmlCls: document.documentElement.className };
});
writeFileSync(OUT + "info.json", JSON.stringify(info, null, 2));
writeFileSync(OUT + "reqs.txt", reqs.join("\n"));
console.log("scrollH", info.scrollH, "gen", info.gen, "videos", info.videos.length, "canvases", info.canvases, "wrappers", info.wrappers);
// sweep
const useWheel = info.scrollH <= 900;
let last = -1;
for (let i = 0; i < 80; i++) {
  const y = await page.evaluate(() => window.scrollY);
  await page.screenshot({ path: `${OUT}d-${String(i).padStart(3, "0")}.jpg`, type: "jpeg", quality: 55 });
  if (useWheel) { await page.mouse.move(720, 450); await page.mouse.wheel(0, 800); } else { await page.evaluate(() => window.scrollBy(0, 800)); }
  await page.waitForTimeout(900);
  const ny = await page.evaluate(() => (document.querySelector(".lenis")?.scrollTop) ?? window.scrollY);
  if (ny === last) break; last = ny;
}
console.log("frames", last);
await browser.close();
