# Aperture Visuals — website

Next.js 16 + GSAP ScrollTrigger + Lenis. Design follows the bloom3d.studio reference
themed to the catalogue: teal #082C2E, gold #B5955A, white, grey monogram watermark; Poppins body, Cormorant Garamond display. Pricing section reproduces the catalogue pricing page.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

- `/` — video hero (pinned 2 viewports), Featured Projects grid (12), services 3D carousel, statement + count-up stats,
  "Why work with us" pinned split, parallax CTA, FAQ, footer.
- `/projects` — all projects.
- `/projects/[slug]` — hero image, meta, intro, gallery, next project. Statically generated from `src/data/content.ts`.

## Content

Everything lives in `src/data/content.ts`. Items marked `TODO` are placeholders to confirm with the client:
stats, "Schedule a call" link, social URLs, street address, and the project names/locations (working titles).

## Assets

- Raw renders (PNG from the client's Drive) go in `../assets-raw/`; `npm run assets` writes web sizes to `public/renders/`
  (960 / 1920 WebP, plus generated sketch layers that this design no longer uses) and refreshes `src/data/renders.json`.
- Hero video: `public/video/hero.mp4` (1080p, 8 MB), `hero-720.mp4` (3.6 MB), `poster.jpg` — transcoded from the client's
  MP4 with the static ffmpeg in `@ffmpeg-installer/ffmpeg` (`node_modules/@ffmpeg-installer/*/ffmpeg`).

## Verification scripts

- `node scripts/shot.mjs 1440 900 0 1300 …` — headless screenshots at scroll positions (system Edge via Playwright)
- `node scripts/interact.mjs` — menu, hovers, carousel, advantages, FAQ, project pages, mobile
- `node scripts/bloom.mjs` / `bloom2.mjs` — capture and inspect the reference site for side-by-side checks

The previous illoca-style build is archived in `../site-illoca/`.
