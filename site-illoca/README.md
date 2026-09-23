# Aperture Visuals — website

Next.js 16 + GSAP ScrollTrigger + Lenis. Design follows the illoca.unseen.co reference
(cream graph paper, cobalt, coral) with Aperture's serif identity and real renders.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Content

All copy lives in `src/data/content.ts` (nav, hero, chapters, letter, process, pricing, FAQs, footer, contact).
Social links are placeholders (`#`) until real URLs are supplied.

## Assets

Raw renders (PNG, from the client's Drive) go in `../assets-raw/`. Then:

```bash
npm run assets
```

This writes, per render, to `public/renders/`:

- `<name>-960.webp`, `<name>-1920.webp` — the photograph
- `<name>-sketch-960.webp`, `<name>-sketch-1920.webp` — a generated cobalt pencil sketch (used for the sketch→render reveal)
- `<name>-lqip.webp` — tiny placeholder

and refreshes `src/data/renders.json` (aspect ratios) and the traced logo SVGs in `public/brand/`.
To use a new render, drop the PNG in `assets-raw/`, run the pipeline, and reference its filename (without extension) in `content.ts`.

The showreel is `public/video/showreel.mp4` (loaded on demand only).

## How the page is built

- `Story.tsx` owns one **fixed stage** for the hero image and all five chapters. The frame starts over `.hero__slot`,
  rides to the top of the viewport as the headline scrolls away, then docks left/right (desktop) or upward (phones)
  while each chapter's text staggers in. Scroll length is 5.5 viewports per chapter (4.5 on phones), matching the
  reference's pacing. Everything after the story lives in `.after`, which scrolls over the stage.
- Sizes use `--s` = one design pixel (1920-wide desktop design, 390-wide phone design), so the layout scales
  proportionally like the reference instead of at fixed pixel sizes.
- Buttons (`Button.tsx`) reproduce the reference's three shapes and hover behaviour (fill scales up, label slides).
- "Watch the demo" opens `Overlay.tsx`: a tilted paper "feature overview" card with steps + video/render.

## Verification scripts

- `node scripts/shot.mjs 1440 900 0 1300 …` — headless screenshots at scroll positions (uses system Edge via Playwright)
- `node scripts/interact.mjs` — exercises hovers, the overview card, pricing tilt, FAQ, anchors and the mobile menu
- `node scripts/ref3.mjs` / `ref4.mjs` / `ref5.mjs` — capture and inspect the reference site for side-by-side checks
