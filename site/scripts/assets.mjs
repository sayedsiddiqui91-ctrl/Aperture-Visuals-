// Asset pipeline: raw renders -> web-sized WebP photos, a tiny placeholder, and the traced logo.
// Usage: node scripts/assets.mjs
import sharp from "sharp";
import potrace from "potrace";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("../assets-raw");
const OUT = path.resolve("public/renders");
const WIDTHS = [960, 1920];



async function processRender(file) {
  const name = path.parse(file).name;
  const src = path.join(RAW, file);
  const input = await sharp(src).rotate().flatten({ background: "#fff" }).removeAlpha().toBuffer();
  for (const w of WIDTHS) {
    await sharp(input).resize(w).webp({ quality: 80 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  // tiny blurred placeholder
  await sharp(input).resize(24).blur(2).webp({ quality: 40 }).toFile(path.join(OUT, `${name}-lqip.webp`));
  const m = await sharp(input).metadata();
  console.log(`${name}: ${m.width}x${m.height}`);
  return { name, ratio: +(m.width / m.height).toFixed(4) };
}

async function traceLogo() {
  // logo.jpg is a 4-up sheet; the black-on-white mark lives in the right column.
  const src = path.resolve("../logo.jpg");
  const mark = await sharp(src).extract({ left: 1440, top: 676, width: 360, height: 512 }).threshold(128).png().toBuffer();
  const word = await sharp(src).extract({ left: 1400, top: 1217, width: 442, height: 74 }).threshold(128).png().toBuffer();
  await mkdir("public/brand", { recursive: true });
  const trace = (buf) =>
    new Promise((res, rej) =>
      potrace.trace(buf, { threshold: 128, turdSize: 20, optTolerance: 0.3 }, (err, svg) => (err ? rej(err) : res(svg)))
    );
  await writeFile("public/brand/mark.svg", await trace(mark));
  await writeFile("public/brand/wordmark.svg", await trace(word));
  console.log("logo traced");
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(RAW)).filter((f) => f.endsWith(".png"));
const manifest = [];
for (const f of files) manifest.push(await processRender(f));
await writeFile("src/data/renders.json", JSON.stringify(Object.fromEntries(manifest.map((m) => [m.name, m.ratio])), null, 2));
await traceLogo();

console.log("done");
