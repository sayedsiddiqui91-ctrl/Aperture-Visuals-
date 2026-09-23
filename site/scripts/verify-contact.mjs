// Contact flow: stats, three contact options, WhatsApp chooser on desktop vs direct link on phones, socials.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
const B = process.env.BASE || "http://localhost:3020";
const V = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/v/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const scrollTo = (p, sel, off = 0) => p.evaluate(([s, o]) => { const el = document.querySelector(s); window.__lenis?.scrollTo(el.getBoundingClientRect().top + scrollY + o, { immediate: true }); }, [sel, off]);

// ---------- desktop ----------
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await dctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: B });
let p = await dctx.newPage();
p.on("pageerror", (e) => errors.push("desktop: " + e.message));
let popups = 0; dctx.on("page", () => popups++);
await p.goto(B + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);

console.log("stats:", await p.$$eval(".about__num", (n) => n.map((x) => x.querySelector("strong").textContent + " " + x.querySelector(".t-label").textContent).join(" | ")));
await scrollTo(p, "#contact", 400); await p.waitForTimeout(900);
console.log("contact buttons:", JSON.stringify(await p.$$eval(".cta .btn", (b) => b.map((x) => x.querySelector(".btn__face--front").textContent.trim() + " -> " + x.getAttribute("href").slice(0, 45)))));
await p.screenshot({ path: V + "contact.jpg", quality: 74, type: "jpeg" });

// click WhatsApp on desktop -> chooser, no navigation/popup
await p.click(".cta .btn[href^='https://wa.me/']"); await p.waitForTimeout(600);
const dlg = await p.evaluate(() => { const d = document.querySelector("dialog.wa"); return { open: d.open, links: [...d.querySelectorAll("a")].map((a) => a.getAttribute("href").split("?")[0]), qr: !!d.querySelector(".wa__qr-code svg"), focus: document.activeElement?.className }; });
console.log("desktop WhatsApp click -> chooser:", JSON.stringify(dlg), "| popups opened:", popups, "| still on page:", p.url() === B + "/");
await p.screenshot({ path: V + "wa-dialog.jpg", quality: 74, type: "jpeg" });
const a11y = await new AxeBuilder({ page: p }).include("dialog.wa").analyze();
console.log("axe on chooser:", a11y.violations.length ? a11y.violations.map((v) => v.id).join(", ") : "0 violations");
await p.click(".wa__num button"); await p.waitForTimeout(300);
console.log("copy button:", await p.$eval(".wa__num button", (b) => b.textContent), "| clipboard:", await p.evaluate(() => navigator.clipboard.readText()));
await p.keyboard.press("Escape"); await p.waitForTimeout(300);
console.log("Esc closes:", !(await p.$eval("dialog.wa", (d) => d.open)));
// the footer + menu WhatsApp links are intercepted too
await p.evaluate(() => window.__lenis.scrollTo(document.documentElement.scrollHeight, { immediate: true })); await p.waitForTimeout(800);
await p.click(".footer__group a[href^='https://wa.me/']"); await p.waitForTimeout(400);
console.log("footer WhatsApp -> chooser:", await p.$eval("dialog.wa", (d) => d.open));
await p.keyboard.press("Escape");
console.log("socials:", JSON.stringify(await p.$$eval(".footer__social a", (a) => a.map((x) => x.getAttribute("aria-label") + " " + x.href))));
console.log("footer contacts:", await p.$$eval(".footer__group:nth-child(2) li", (l) => l.map((x) => x.textContent.trim()).join(" | ")));
const ld = await p.evaluate(() => JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)["@graph"][0].sameAs);
console.log("structured data sameAs:", JSON.stringify(ld));
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
await p.click(".nav__burger"); await p.waitForTimeout(900);
console.log("menu contact options:", await p.$$eval(".menu__foot .btn", (b) => b.map((x) => x.querySelector(".btn__face--front").textContent.trim()).join(" | ")));
await p.screenshot({ path: V + "menu-contact.jpg", quality: 74, type: "jpeg" });
await dctx.close();

// ---------- phone: WhatsApp goes straight to wa.me (the app), no chooser ----------
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36" });
await mctx.route("https://wa.me/**", (r) => r.fulfill({ status: 200, body: "wa.me reached" }));
p = await mctx.newPage();
p.on("pageerror", (e) => errors.push("phone: " + e.message));
await p.goto(B + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
await scrollTo(p, "#contact", 300); await p.waitForTimeout(900);
await p.screenshot({ path: V + "m-contact.jpg", quality: 74, type: "jpeg" });
const [pop] = await Promise.all([mctx.waitForEvent("page", { timeout: 5000 }).catch(() => null), p.tap(".cta .btn[href^='https://wa.me/']")]);
await p.waitForTimeout(500);
console.log("phone WhatsApp tap -> chooser open:", await p.$eval("dialog.wa", (d) => d.open), "| opened:", pop ? pop.url().split("?")[0] : "nothing");
console.log("phone stats:", await p.$$eval(".about__num strong", (n) => n.map((x) => x.textContent).join(" ")));
await mctx.close();

console.log("page errors:", errors.length ? errors : "none");
await browser.close();
