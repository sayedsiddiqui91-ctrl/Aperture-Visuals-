import { chromium } from "playwright";
const OUT = "C:/Users/LENOVO/AppData/Local/Temp/claude/E--aperture-visuals/bbfb8fb1-4a73-4e23-9c22-0a421d861a43/scratchpad/ref/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("https://illoca.unseen.co/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(200);
console.log("LOADER:", await page.evaluate(() => { const l=[...document.querySelectorAll("body *")].find(e=>getComputedStyle(e).position==="fixed" && e.getBoundingClientRect().width>1000 && e.querySelector("svg")); return l? l.outerHTML.slice(0,1800):"none"; }));
await page.waitForLoadState("networkidle").catch(()=>{});
await page.waitForTimeout(4000);
console.log("COOKIE:", await page.evaluate(() => { const c=[...document.querySelectorAll("div")].find(e=>/uses cookies/.test(e.textContent) && e.getBoundingClientRect().height<200 && e.getBoundingClientRect().height>20); return c? {html:c.outerHTML.slice(0,1500), rect:c.getBoundingClientRect().toJSON(), bg:getComputedStyle(c).backgroundColor}:"none"; }));
console.log("CURSOR:", await page.evaluate(() => [...document.querySelectorAll("[class*='cursor']")].filter(e=>!/cursor-pointer/.test(e.className)).slice(0,3).map(e=>e.outerHTML.slice(0,400))));
console.log("STROKE:", await page.evaluate(() => { const e=document.querySelector(".pagetitle-bg"); const s=getComputedStyle(e); return {webkitTextStroke:s.webkitTextStroke, color:s.color, opacity:s.opacity}; }));
console.log("H1 layers:", await page.evaluate(() => [...document.querySelector("h1").children].map(c=>({cls:c.className.slice(0,60), op:getComputedStyle(c).opacity, color:getComputedStyle(c).color}))));
console.log("NAV rect:", await page.evaluate(() => { const n=document.querySelector("nav"); const r=n.getBoundingClientRect(); const logo=n.querySelector("svg"); return {r:r.toJSON(), logo:logo.getBoundingClientRect().toJSON(), ul:n.querySelector("ul").getBoundingClientRect().toJSON(), gap:getComputedStyle(n.querySelector("ul")).gap}; }));
console.log("EMAIL/COORDS:", await page.evaluate(() => { const f=t=>[...document.querySelectorAll("a,div,span")].find(e=>e.childElementCount===0&&e.textContent.trim()===t); const em=f("hello@illoca.com"); const x=[...document.querySelectorAll("div,span")].find(e=>/^X\s/.test(e.textContent.trim())&&e.getBoundingClientRect().y<60); return {em: em&&em.parentElement.outerHTML.slice(0,300), x: x&&x.parentElement.outerHTML.slice(0,500)}; }));
console.log("CAPTION:", await page.evaluate(() => { const c=[...document.querySelectorAll("div,p,span")].find(e=>e.childElementCount<3&&/thinks with you/.test(e.textContent)&&e.getBoundingClientRect().height<60); return c? {html:c.parentElement.outerHTML.slice(0,900), rect:c.getBoundingClientRect().toJSON()}:"none"; }));
console.log("NOTES:", await page.evaluate(() => { const f=t=>[...document.querySelectorAll("div,span")].find(e=>e.childElementCount===0&&e.textContent.trim()===t); const a=f("architectural"), n=f("not"); return {a:a&&a.parentElement.outerHTML.slice(0,700), n:n&&n.parentElement.parentElement.outerHTML.slice(0,900)}; }));
// go to chapter 1 and click watch the demo
await page.mouse.move(720,450); for(let i=0;i<9;i++){ await page.mouse.wheel(0,700); await page.waitForTimeout(500);} await page.waitForTimeout(1500);
console.log("FEATURE1 html:", await page.evaluate(() => { const t=[...document.querySelectorAll("h2,h3,div")].find(e=>/Augmented Sketch/.test(e.textContent)&&e.getBoundingClientRect().height<400&&e.getBoundingClientRect().height>100); return t? t.outerHTML.slice(0,3000):"none"; }));
const btn = page.locator("button:has-text('Watch the demo')").first();
await btn.click({ force: true }).catch(e=>console.log("click err", e.message)); await page.waitForTimeout(2000);
await page.screenshot({ path: OUT+"watch-modal.jpg", type:"jpeg", quality:70 });
console.log("MODAL:", await page.evaluate(() => { const m=[...document.querySelectorAll("div")].find(e=>getComputedStyle(e).position==="fixed"&&e.getBoundingClientRect().width>1200&&(e.querySelector("video,iframe"))); return m? {html:m.outerHTML.slice(0,1200), media:[...m.querySelectorAll("video,iframe")].map(v=>v.src||v.currentSrc)}:"none"; }));
await page.keyboard.press("Escape"); await page.waitForTimeout(800);
// letter section pin check + pricing rotation
for(let i=0;i<32;i++){ await page.mouse.wheel(0,700); await page.waitForTimeout(250);} await page.waitForTimeout(1200);
for (let k=0;k<6;k++){ await page.mouse.wheel(0,500); await page.waitForTimeout(900); await page.screenshot({path:OUT+`letter-${k}.jpg`,type:"jpeg",quality:60}); console.log("letter step",k, await page.evaluate(()=>{ const p=[...document.querySelectorAll("div,section")].find(e=>/To those who shape the world,/.test(e.textContent)&&e.getBoundingClientRect().height<700&&e.getBoundingClientRect().height>300); const pr=[...document.querySelectorAll("div,section")].find(e=>/1,000 starter credits/.test(e.textContent)&&e.getBoundingClientRect().height<3000&&e.getBoundingClientRect().height>500); return {paperY:p&&Math.round(p.getBoundingClientRect().y), paperTr:p&&getComputedStyle(p).transform, pricingY: pr&&Math.round(pr.getBoundingClientRect().y), pricingTr: pr&&getComputedStyle(pr).transform, st: document.querySelector(".lenis").scrollTop}; })); }
await browser.close();
