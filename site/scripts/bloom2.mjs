import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/bloom/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("https://www.bloom3d.studio/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(5000);
const dump = await page.evaluate(() => {
  const cs = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { cls: el.className.toString().slice(0, 80), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), pos: s.position, bg: s.backgroundColor, color: s.color, font: s.fontSize + "/" + s.fontWeight, pad: s.padding, radius: s.borderRadius, border: s.border, transform: s.transform, overflow: s.overflow, grid: s.gridTemplateColumns, display: s.display, gap: s.gap }; };
  const tree = (root, depth = 0, max = 4) => { if (!root || depth > max) return null; const kids = [...root.children].filter(k => k.getBoundingClientRect().height > 8).slice(0, 14).map(k => tree(k, depth + 1, max)); return { ...cs(root), tag: root.tagName, text: root.children.length === 0 ? root.textContent.trim().slice(0, 40) : "", kids }; };
  const q = (s) => document.querySelector(s);
  return {
    nav: tree(q(".nav, .navbar, [class*=nav]"), 0, 3),
    hero: tree(q(".section_hero"), 0, 4),
    portfolio: tree(q(".section_portfolio"), 0, 4),
    services: tree(q(".section_services"), 0, 4),
    about: tree(q(".section_about"), 0, 3),
    adv: tree(q(".section_advantages"), 0, 4),
    cta: tree(q(".section_cta"), 0, 3),
    faq: tree(q(".section_faq"), 0, 3),
    footer: tree(q(".section_footer"), 0, 3),
    imgs: [...document.querySelectorAll(".section_portfolio img, .section_services img, .section_advantages img, .section_cta img")].map(i => ({ src: (i.currentSrc || i.src).slice(0, 140), w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height), alt: i.alt.slice(0, 30) })),
    scripts: [...document.scripts].map(s => s.src).filter(Boolean).map(s => s.slice(0, 120)),
    buttons: [...document.querySelectorAll("a[class*=button], .button, a[class*=btn]")].slice(0, 6).map(b => ({ html: b.outerHTML.slice(0, 500), ...cs(b) })),
  };
});
writeFileSync(OUT + "dom.json", JSON.stringify(dump, null, 1));
// menu
const burger = await page.$("[class*=menu-button], [class*=burger], .w-nav-button, [class*=nav_button]");
console.log("burger:", burger ? await burger.evaluate(e => e.className) : "none");
if (burger) { await burger.click().catch(() => {}); await page.waitForTimeout(1200); await page.screenshot({ path: OUT + "menu.jpg", type: "jpeg", quality: 70 }); await page.keyboard.press("Escape"); await burger.click().catch(() => {}); await page.waitForTimeout(600); }
// tile hover (reload so the menu overlay is gone)
await page.reload({ waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(3000);
await page.evaluate(() => window.scrollTo(0, 1500)); await page.waitForTimeout(1200);
const tile = await page.$(".section_portfolio a");
if (tile) { await tile.hover({ force: true, timeout: 5000 }).catch(() => {}); await page.waitForTimeout(800); await page.screenshot({ path: OUT + "tile-hover.jpg", type: "jpeg", quality: 70 }); console.log("tile html:", await tile.evaluate(e => e.outerHTML.slice(0, 1200))); }
// services pinned? sample transforms across scroll
const samples = [];
for (const y of [4700, 5000, 5300, 5600, 5900, 6100]) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(700); samples.push({ y, ...(await page.evaluate(() => { const s = document.querySelector(".section_services"); const inner = s.querySelector("[style*=transform], [class*=track], [class*=list]"); return { secTop: Math.round(s.getBoundingClientRect().top), innerCls: inner?.className.toString().slice(0, 60), tr: inner ? getComputedStyle(inner).transform : null, pinSpacer: !!s.closest(".pin-spacer") || !!s.querySelector(".pin-spacer") }; })) }); await page.screenshot({ path: `${OUT}svc-${y}.jpg`, type: "jpeg", quality: 55 }); }
console.log(JSON.stringify(samples));
// advantages: click items
await page.evaluate(() => window.scrollTo(0, 7000)); await page.waitForTimeout(1000);
await page.screenshot({ path: OUT + "adv-1.jpg", type: "jpeg", quality: 60 });
await page.evaluate(() => window.scrollTo(0, 7600)); await page.waitForTimeout(1000);
await page.screenshot({ path: OUT + "adv-2.jpg", type: "jpeg", quality: 60 });
await page.close();
// mobile
const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
await m.goto("https://www.bloom3d.studio/", { waitUntil: "networkidle" }).catch(() => {});
await m.waitForTimeout(5000);
const H = await m.evaluate(() => document.documentElement.scrollHeight); console.log("mobile H", H);
for (let y = 0, i = 0; y < H; y += 800, i++) { await m.evaluate((y) => window.scrollTo(0, y), y); await m.waitForTimeout(700); await m.screenshot({ path: `${OUT}m-${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 55 }); }
const mb = await m.$("[class*=menu-button], [class*=burger], .w-nav-button, [class*=nav_button]");
if (mb) { await m.evaluate(() => window.scrollTo(0, 0)); await mb.click().catch(() => {}); await m.waitForTimeout(1000); await m.screenshot({ path: OUT + "m-menu.jpg", type: "jpeg", quality: 70 }); }
await browser.close();
