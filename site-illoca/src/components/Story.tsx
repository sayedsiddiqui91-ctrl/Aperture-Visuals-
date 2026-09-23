"use client";
import { useEffect, useRef } from "react";
import { chapters, hero, type Chapter } from "@/data/content";
import { photo, sketch } from "@/lib/renders";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CheckIcon, Underline } from "./Icons";
import { Button } from "./Button";
import { Split } from "./Split";
import { useOverlay } from "./Overlay";

/** Text block for one chapter. Letters are split so they can stagger in. */
function Feature({ c }: { c: Chapter }) {
  const { act } = useOverlay();
  return (
    <div className="feature" data-side={c.side}>
      <div className="feature__eyebrow t-hand">
        <i>{c.n}</i>
        <span className="uline">
          <Split text={c.eyebrow} />
          <Underline />
        </span>
      </div>
      <h2 className="feature__title t-display">
        {c.title.map((t) => (
          <span className="l" key={t}>
            <Split text={t} />{" "}
          </span>
        ))}
      </h2>
      <p className="feature__body">{c.body}</p>
      <Button
        variant="demo"
        glyph={c.cta.action === "video" ? "play" : "arrow"}
        label={c.cta.label}
        className="feature__btn"
        onClick={() => act(c.cta.action === "quote" ? "quote" : "chapter", c.n)}
      />
      {c.n === 1 && (
        <div className="feature__hint" aria-hidden="true">
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 3c3 7 7 11 15 15M19 18l-5-1M19 18l-1-5" /></svg>
          explore the work
        </div>
      )}
    </div>
  );
}

function Slide({ c }: { c: Chapter }) {
  const p = photo(c.image);
  const s = sketch(c.image);
  const eager = c.n === 1;
  return (
    <div className="slide" data-i={c.n}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sketch" src={s.src} srcSet={s.srcSet} sizes="100vw" alt="" aria-hidden="true" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo reveal" src={p.src} srcSet={p.srcSet} sizes="100vw" alt={c.alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
    </div>
  );
}

/**
 * One fixed stage for the whole hero + story. The frame starts where the hero
 * image sits, rides up to the top of the viewport as the headline scrolls away,
 * then docks left/right (desktop) or up (mobile) for each chapter's text.
 */
export default function Story() {
  const stage = useRef<HTMLDivElement>(null);
  const spacer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stage.current!;
    const sp = spacer.current!;
    const frame = st.querySelector<HTMLElement>(".frame")!;
    const slides = st.querySelectorAll<HTMLElement>(".slide");
    const features = st.querySelectorAll<HTMLElement>(".feature");
    const caption = st.querySelector<HTMLElement>(".caption")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx: gsap.Context | null = null;
    let lastW = 0;

    const build = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        const desktop = window.innerWidth >= 1024;
        const vh = window.innerHeight;
        const s = window.innerWidth / (desktop ? 1920 : 390);
        const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 40 * s;
        const frameY = 16 * s;
        const slot = document.querySelector<HTMLElement>(".hero__slot")!;
        const slotTop = slot.getBoundingClientRect().top + window.scrollY;
        const heroPx = Math.max(slotTop - frameY, 1);
        const L = vh * (desktop ? 5.5 : 4.5);
        const total = heroPx + chapters.length * L;
        const dockEdge = 660 * s;
        const dockBottom = vh * 0.38;
        sp.style.height = `${chapters.length * L}px`;

        gsap.set(frame, { top: slotTop, left: gutter, right: gutter, bottom: frameY });
        gsap.set(slides, { opacity: 0 });
        gsap.set(slides[0], { opacity: 1 });
        gsap.set(features, { opacity: 0, y: 24, yPercent: desktop ? -50 : 0 });
        gsap.set(caption, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { start: 0, end: total, scrub: reduce ? true : 0.5, invalidateOnRefresh: false },
        });

        // hero → story: the frame rides up with the page until it hits the top
        tl.to(frame, { top: frameY, duration: heroPx }, 0);
        tl.to(caption, { opacity: 0, duration: heroPx * 0.4 }, heroPx * 0.5);

        chapters.forEach((c, i) => {
          const base = heroPx + i * L;
          const slide = slides[i];
          const imgs = slide.querySelectorAll("img");
          const ph = slide.querySelector<HTMLElement>(".photo")!;
          const feat = features[i];
          const letters = feat.querySelectorAll(".c");
          const uline = feat.querySelector(".uline svg");
          const sq = feat.querySelector(".btn__sq");
          const cell = feat.querySelector<HTMLElement>(".btn__cell");
          const cellInner = cell?.querySelector("span") ?? null;
          const textLeft = c.side === "left";

          gsap.set(ph, { "--p": i === 0 ? 0.12 : 0 });
          gsap.set(letters, { opacity: 0, y: 6 });
          gsap.set(uline, { scaleX: 0 });
          gsap.set(sq, { scale: 0 });
          gsap.set(cell, { xPercent: -101 });
          gsap.set(cellInner, { xPercent: 101 });

          if (i > 0) tl.to(slide, { opacity: 1, duration: 0.06 * L }, base);
          // slow camera drift for the whole chapter (chapter 1 starts in the hero)
          const driftStart = i === 0 ? 0 : base;
          tl.fromTo(imgs, { scale: 1.22, xPercent: -3, yPercent: 3 }, { scale: 1, xPercent: 0, yPercent: 0, duration: base + L - driftStart }, driftStart);
          // sketch → photograph
          tl.to(ph, { "--p": 1, duration: 0.36 * L }, base + 0.18 * L);
          // dock the frame to make room for the text
          if (desktop) {
            tl.to(frame, textLeft ? { left: dockEdge, duration: 0.12 * L, ease: "power2.inOut" } : { right: dockEdge, duration: 0.12 * L, ease: "power2.inOut" }, base + 0.12 * L);
          } else {
            tl.to(frame, { bottom: dockBottom, duration: 0.12 * L, ease: "power2.inOut" }, base + 0.12 * L);
          }
          // text in: block, then letters, underline, button wipe
          tl.to(feat, { opacity: 1, y: 0, duration: 0.06 * L, ease: "power2.out" }, base + 0.2 * L);
          tl.to(letters, { opacity: 1, y: 0, duration: 0.05 * L, stagger: (0.08 * L) / Math.max(letters.length, 1) }, base + 0.2 * L);
          tl.to(uline, { scaleX: 1, duration: 0.06 * L, ease: "power2.out" }, base + 0.26 * L);
          tl.to(sq, { scale: 1, duration: 0.05 * L, ease: "power2.out" }, base + 0.3 * L);
          tl.to([cell, cellInner], { xPercent: 0, duration: 0.07 * L, ease: "power2.out" }, base + 0.34 * L);
          tl.call(() => feat.classList.add("is-active"), [], base + 0.2 * L);
          // hold, then release
          tl.to(feat, { opacity: 0, y: -16, duration: 0.06 * L, ease: "power2.in" }, base + 0.7 * L);
          tl.call(() => feat.classList.remove("is-active"), [], base + 0.7 * L);
          tl.to(frame, desktop ? { left: gutter, right: gutter, duration: 0.12 * L, ease: "power2.inOut" } : { bottom: frameY, duration: 0.12 * L, ease: "power2.inOut" }, base + 0.74 * L);
          if (i < chapters.length - 1) tl.to(slide, { opacity: 0, duration: 0.06 * L }, base + 0.94 * L);
        });

        // once the next section has covered the viewport, drop the stage from the compositor
        ScrollTrigger.create({
          trigger: document.querySelector(".after")!,
          start: "top top",
          onEnter: () => st.setAttribute("data-done", "true"),
          onLeaveBack: () => st.setAttribute("data-done", "false"),
        });
      }, st);
      ScrollTrigger.refresh();
    };

    const onResize = () => {
      if (window.innerWidth === lastW) return; // ignore mobile URL-bar height changes
      lastW = window.innerWidth;
      build();
    };
    lastW = window.innerWidth;
    build();
    // fonts/images settle → recompute the hero slot position
    const t = setTimeout(build, 600);
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <div className="stage" ref={stage} aria-label="Our work">
        <div className="frame">
          {chapters.map((c) => (
            <Slide key={c.n} c={c} />
          ))}
        </div>
        {chapters.map((c) => (
          <Feature key={c.n} c={c} />
        ))}
        <div className="caption" aria-hidden="true">
          {hero.caption}
          <i><CheckIcon /></i>
        </div>
      </div>
      <div className="story__spacer" id="work" ref={spacer} />
    </>
  );
}
