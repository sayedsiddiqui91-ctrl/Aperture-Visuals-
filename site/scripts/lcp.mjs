// Real LCP under mobile throttling, N runs: median + which element was the LCP.
import { chromium } from "playwright";
const URL = process.env.URL || "http://localhost:3020/";
const N = Number(process.env.N || 5);
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
for (let i = 0; i < N; i++) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  // Lighthouse "slow 4G": 150ms RTT, 1.6 Mbps down
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lcp.push({ t: Math.round(e.startTime), el: e.element ? e.element.tagName + "." + (e.element.className?.baseVal ?? e.element.className ?? "") + " " + (e.element.textContent || e.url || "").trim().slice(0, 30) : e.url, size: e.size }))).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(6000);
  const lcp = await page.evaluate(() => window.__lcp);
  const last = lcp[lcp.length - 1];
  results.push(last);
  console.log(`run ${i + 1}: ${last.t}ms  ${last.el}  (candidates: ${lcp.map((c) => c.t + "ms " + c.el.split(" ")[0]).join(" → ")})`);
  await ctx.close();
}
const ts = results.map((r) => r.t).sort((a, b) => a - b);
console.log("MEDIAN LCP:", ts[Math.floor(ts.length / 2)], "ms");
await browser.close();
