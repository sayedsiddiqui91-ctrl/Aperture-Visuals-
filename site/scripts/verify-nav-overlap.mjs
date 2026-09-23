// Recreates the reported bug: scroll through the page and flag any moment where the nav logo is visible,
// has no bar behind it, and sits directly on top of page text.
import { chromium } from "playwright";
const B = process.env.BASE || "http://localhost:3020";
const browser = await chromium.launch({ channel: "msedge", headless: true });
for (const vp of [{ width: 908, height: 1020 }, { width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await (await browser.newContext({ viewport: vp, ...(vp.width < 500 ? { isMobile: true, hasTouch: true } : {}) })).newPage();
  await page.goto(B + "/", { waitUntil: "load" });
  await page.waitForTimeout(2000);
  const H = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const probe = () =>
    page.evaluate(() => {
      const nav = document.querySelector(".nav");
      const logo = document.querySelector(".nav__logo").getBoundingClientRect();
      const hidden = nav.dataset.hidden === "true" || nav.getBoundingClientRect().bottom <= 1;
      const bar = !!nav.dataset.bar;
      // text elements (leaf nodes with text) intersecting the logo box, excluding the nav itself
      const hits = [...document.querySelectorAll("h1,h2,h3,p,li,span,a,strong,time")].filter((el) => {
        if (el.closest(".nav, .menu, dialog")) return false;
        if (!el.textContent.trim() || el.children.length > 2) return false;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || +cs.opacity === 0) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.bottom > logo.top && r.top < logo.bottom && r.right > logo.left && r.left < logo.right;
      });
      return { y: Math.round(scrollY), hidden, bar, over: nav.dataset.over, text: hits.map((h) => h.textContent.trim().slice(0, 28)) };
    });
  let bad = 0, samples = 0, hiddenCount = 0, barCount = 0;
  const step = async (y) => {
    await page.evaluate((y) => window.__lenis.scrollTo(y, { duration: 0.35 }), y);
    await page.waitForTimeout(550);
    const s = await probe();
    samples++;
    if (s.hidden) hiddenCount++;
    if (s.bar) barCount++;
    if (!s.hidden && !s.bar && s.text.length) { bad++; console.log("   OVERLAP at y=" + s.y, s.text.join(" | ")); }
    return s;
  };
  for (let y = 0; y <= H; y += 260) await step(y); // down
  const down = { hiddenCount, barCount };
  hiddenCount = 0; barCount = 0;
  for (let y = H; y >= 0; y -= 260) await step(y); // back up
  console.log(`${vp.width}x${vp.height}: ${samples} samples, logo-on-text overlaps without a bar: ${bad} | scrolling down: hidden ${down.hiddenCount} times | scrolling up: bar shown ${barCount} times, hidden ${hiddenCount}`);
  await page.close();
}
await browser.close();
