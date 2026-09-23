// Automated audit: axe accessibility, console errors, links, headings, meta, layout overflow.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE || "http://localhost:3020";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/audit/";
import { mkdirSync } from "node:fs"; mkdirSync(OUT, { recursive: true });
const pages = ["/", "/projects", "/projects/breeze-apartments", "/projects/surgical-suite", "/does-not-exist"];
const vps = { desktop: { width: 1440, height: 900 }, laptop: { width: 1024, height: 768 }, tablet: { width: 768, height: 1024 }, phone: { width: 375, height: 740 } };
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = { axe: {}, console: {}, overflow: {}, meta: {}, headings: {}, links: new Set(), status: {} };
for (const [vpName, vp] of Object.entries(vps)) {
  for (const path of pages) {
    if (vpName !== "desktop" && path !== "/" && path !== "/projects/breeze-apartments") continue;
    const ctx = await browser.newContext({ viewport: vp, ...(vpName === "phone" ? { isMobile: true, hasTouch: true } : {}) });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.type() + ": " + m.text().slice(0, 200)));
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("requestfailed", (r) => errs.push("reqfail: " + r.url() + " " + r.failure()?.errorText));
    const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
    report.status[path] = resp.status();
    await page.waitForTimeout(1500);
    // scroll through so lazy content + scroll triggers run
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(800);
    const key = `${vpName} ${path}`;
    report.console[key] = errs;
    report.overflow[key] = await page.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const bad = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.right > W + 1 && s.position !== "fixed" && !e.closest(".carousel, .services__pin, .menu"); }).slice(0, 6).map((e) => e.tagName + "." + e.className.toString().split(" ")[0] + " right=" + Math.round(e.getBoundingClientRect().right));
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: W, bad };
    });
    if (vpName === "desktop") {
      report.meta[path] = await page.evaluate(() => ({
        title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href,
        og: document.querySelector('meta[property="og:image"]')?.content, h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 50)),
        lang: document.documentElement.lang, jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
        imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      }));
      report.headings[path] = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + " " + h.textContent.trim().slice(0, 40)));
      (await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")))).forEach((h) => report.links.add(h));
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const axe = await new AxeBuilder({ page }).analyze();
    report.axe[key] = axe.violations.map((v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length}) e.g. ${v.nodes[0]?.target.join(" ")}`);
    await ctx.close();
  }
}
// check internal links
const links = [...report.links];
const internal = links.filter((h) => h.startsWith("/") && !h.startsWith("//"));
report.linkCheck = {};
for (const h of [...new Set(internal.map((h) => h.split("#")[0] || "/"))]) { const r = await fetch(BASE + h); report.linkCheck[h] = r.status; }
report.placeholderLinks = links.filter((h) => h === "#" || h === "");
report.external = links.filter((h) => /^https?:/.test(h));
report.links = links;
writeFileSync(OUT + "audit.json", JSON.stringify(report, null, 2));
await browser.close();
console.log("audit written");
