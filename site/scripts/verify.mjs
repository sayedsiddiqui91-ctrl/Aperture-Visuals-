import { chromium } from "playwright";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/v/";
import { mkdirSync } from "node:fs"; mkdirSync(OUT, { recursive: true });
const B = "http://localhost:3020";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const open = async (vp, path, opts = {}) => {
  const page = await (await browser.newContext({ viewport: vp, ...opts })).newPage();
  page.on("pageerror", (e) => errors.push(path + ": " + e.message));
  await page.goto(B + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  return page;
};
const to = (p, sel, off = 0) => p.evaluate(([s, o]) => { const el = document.querySelector(s); window.__lenis?.scrollTo(el.getBoundingClientRect().top + scrollY + o, { immediate: true }); }, [sel, off]);
const D = { width: 1440, height: 900 };

// 1. Pricing: an Australian visitor defaults to AUD; switching to USD updates every card
let p = await open(D, "/", { locale: "en-AU" });
await to(p, "#pricing", -40); await p.waitForTimeout(900);
const readConv = () => p.$$eval(".plan__conv", (els) => els.map((e) => e.textContent.trim()));
console.log("pricing en-AU default:", await p.$eval(".cur__btn[aria-pressed=true]", (e) => e.textContent), JSON.stringify(await readConv()));
await p.screenshot({ path: OUT + "pricing-aud.jpg", quality: 72, type: "jpeg" });
await p.click(".cur__btn:has-text('USD')"); await p.waitForTimeout(300);
console.log("after USD click:", JSON.stringify(await readConv()));
await p.click(".cur__btn:has-text('BDT')"); await p.waitForTimeout(300);
console.log("after BDT click (should be blank):", JSON.stringify(await readConv()));
// persistence
await p.click(".cur__btn:has-text('GBP')"); await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(800);
console.log("after reload remembers:", await p.$eval(".cur__btn[aria-pressed=true]", (e) => e.textContent));
// 2. CTA: Dhaka time + QR + fallback call button
await to(p, "#contact", 200); await p.waitForTimeout(900);
console.log("CTA:", JSON.stringify(await p.evaluate(() => ({ time: document.querySelector(".cta .ltime")?.textContent, primary: [...document.querySelectorAll(".cta .btn")].map((b) => b.textContent.trim().split(/\s{2,}|(?<=\S)(?=[A-Z])/)[0] + " -> " + b.getAttribute("href")), qr: !!document.querySelector(".cta__qr svg"), qrVisible: getComputedStyle(document.querySelector(".cta__qr")).display }))));
await p.screenshot({ path: OUT + "cta.jpg", quality: 72, type: "jpeg" });
// 3. Footer
await p.evaluate(() => window.__lenis.scrollTo(document.documentElement.scrollHeight, { immediate: true })); await p.waitForTimeout(900);
console.log("footer socials shown:", await p.$$eval(".footer__social a", (a) => a.length), "| studio time:", await p.$eval(".ltime--footer", (e) => e.textContent));
await p.screenshot({ path: OUT + "footer.jpg", quality: 72, type: "jpeg" });
await p.close();

// 4. Hero: video picks the right file, pause button works
p = await open(D, "/");
await p.waitForTimeout(2000);
console.log("hero desktop video:", await p.$eval(".hero__video", (v) => v.currentSrc.split("/").pop() + " playing=" + v.dataset.playing + " paused=" + v.paused));
await p.click(".hero__pause"); await p.waitForTimeout(300);
console.log("after pause:", await p.$eval(".hero__video", (v) => "paused=" + v.paused), "| label:", await p.$eval(".hero__pause", (b) => b.getAttribute("aria-label")));
await p.screenshot({ path: OUT + "hero.jpg", quality: 72, type: "jpeg" });
// 5. Menu: closed menu unreachable by keyboard; focus moves in on open and back on close
const tabTargets = [];
for (let i = 0; i < 6; i++) { await p.keyboard.press("Tab"); tabTargets.push(await p.evaluate(() => document.activeElement?.className?.toString().split(" ")[0] || document.activeElement?.tagName)); }
console.log("tab order (closed menu should not appear):", tabTargets.join(" > "));
await p.click(".nav__burger"); await p.waitForTimeout(900);
console.log("focus on open:", await p.evaluate(() => document.activeElement.className));
await p.keyboard.press("Escape"); await p.waitForTimeout(600);
console.log("focus on close:", await p.evaluate(() => document.activeElement.className));
await p.close();

// 6. Projects filter: chip click + deep link
p = await open(D, "/projects");
const count = () => p.$$eval(".portfolio__grid .tile", (t) => t.length);
console.log("projects all:", await count());
await p.click(".chip:has-text('Interior')"); await p.waitForTimeout(500);
console.log("Interior chip:", await count(), "url:", p.url().replace(B, ""));
await p.screenshot({ path: OUT + "projects-interior.jpg", quality: 72, type: "jpeg" });
await p.goto(B + "/projects?type=Exterior", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
console.log("deep link ?type=Exterior:", await count(), "pressed:", await p.$eval(".chip[aria-pressed=true]", (c) => c.textContent));
await p.goto(B + "/projects?type=Bogus", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
console.log("bogus type falls back to all:", await count());
await p.close();

// 7. 404 + sitemap/robots
p = await open(D, "/nope");
await p.screenshot({ path: OUT + "404.jpg", quality: 72, type: "jpeg" });
await p.close();
const sm = await (await fetch(B + "/sitemap.xml")).text();
console.log("sitemap urls:", (sm.match(/<loc>/g) || []).length, "| robots:", (await (await fetch(B + "/robots.txt")).text()).replace(/\n/g, " "));

// 8. Phone: hero uses the portrait video, pricing + CTA layout
const M = { width: 390, height: 844 };
p = await open(M, "/", { isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: "en-US" });
await p.waitForTimeout(1500);
console.log("hero phone video:", await p.$eval(".hero__video", (v) => v.currentSrc.split("/").pop()), "| poster:", await p.$eval(".hero__poster", (i) => i.currentSrc.split("/").pop()));
await p.screenshot({ path: OUT + "m-hero.jpg", quality: 72, type: "jpeg" });
await to(p, "#pricing", 0); await p.waitForTimeout(900);
await p.screenshot({ path: OUT + "m-pricing.jpg", quality: 72, type: "jpeg" });
await to(p, "#contact", 300); await p.waitForTimeout(900);
await p.screenshot({ path: OUT + "m-cta.jpg", quality: 72, type: "jpeg" });
await p.close();

console.log("page errors:", errors.length ? errors : "none");
await browser.close();
