import { chromium } from "playwright";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const run = async (name, vp, fn, opts = {}) => {
  const page = await (await browser.newContext({ viewport: vp, ...opts })).newPage();
  page.on("pageerror", (e) => errors.push(name + ": " + e.message));
  await page.goto("http://localhost:3011", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  await fn(page);
  await page.screenshot({ path: `${OUT}int-${name}.jpg`, quality: 70, type: "jpeg" });
  await page.close();
  console.log("done", name);
};
const go = (p, y) => p.evaluate((y) => window.__lenis.scrollTo(y, { immediate: true }), y);



await run("card-video", { width: 1440, height: 900 }, async (p) => { await go(p, 7000); await p.waitForTimeout(900); await p.click(".feature.is-active .btn--demo"); await p.waitForTimeout(1000); console.log("video src:", await p.evaluate(() => document.querySelector(".ov video")?.currentSrc)); await p.keyboard.press("Escape"); await p.waitForTimeout(400); console.log("after esc:", await p.evaluate(() => document.querySelector(".ov").dataset.open)); await p.click(".feature.is-active .btn--demo"); await p.waitForTimeout(900); });
await run("pricing-tilt", { width: 1440, height: 900 }, async (p) => { await p.evaluate(() => document.getElementById("pricing").scrollIntoView()); await p.waitForTimeout(300); await p.evaluate(() => window.__lenis.scrollTo(document.getElementById("pricing").getBoundingClientRect().top + window.scrollY - 700, { immediate: true })); await p.waitForTimeout(900); });
await run("pricing-hover", { width: 1440, height: 900 }, async (p) => { await p.evaluate(() => window.__lenis.scrollTo(document.getElementById("pricing"), { immediate: true })); await p.waitForTimeout(900); await p.hover(".plan--paper .btn"); await p.waitForTimeout(600); });
await run("faq", { width: 1440, height: 900 }, async (p) => { await p.evaluate(() => window.__lenis.scrollTo(document.getElementById("faqs"), { immediate: true })); await p.waitForTimeout(800); await p.click(".faq__item:nth-child(3) .faq__q"); await p.waitForTimeout(700); console.log("faq:", await p.evaluate(() => [...document.querySelectorAll(".faq__item")].map(i => i.dataset.open).join(","))); });
await run("anchor", { width: 1440, height: 900 }, async (p) => { await p.click('.nav__links a[href="#pricing"]'); await p.waitForTimeout(1800); console.log("anchor:", await p.evaluate(() => Math.round(document.getElementById("pricing").getBoundingClientRect().top))); });
await run("menu", { width: 390, height: 844 }, async (p) => { await p.click(".nav__menu"); await p.waitForTimeout(900); }, { isMobile: true, hasTouch: true });
await run("m-card", { width: 390, height: 844 }, async (p) => { await go(p, 2600); await p.waitForTimeout(900); await p.click(".feature.is-active .btn--demo"); await p.waitForTimeout(1000); }, { isMobile: true, hasTouch: true });
console.log("errors:", errors);
await browser.close();
