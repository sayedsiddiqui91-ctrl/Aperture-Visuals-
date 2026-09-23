"use client";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/content";
import { Button } from "./Button";
import { gsap } from "@/lib/gsap";

/* Pick the lightest video that fills the screen: portrait 540p for phones, 720p for most laptops, 1080p above. */
const pickVideo = () => {
  if (window.innerWidth < 768) return "/video/hero-540p.mp4";
  const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  return px <= 1600 ? "/video/hero-720.mp4" : "/video/hero.mp4";
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const v = video.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    // Attach the right source after first paint; the poster image is the LCP until the video plays.
    if (!reduce && !saveData) {
      v.src = pickVideo();
      v.play().catch(() => setPaused(true));
    } else {
      setPaused(true);
    }

    // The headline entrance is a CSS animation (globals.css) so it starts at first paint instead of
    // waiting for hydration — the headline is the LCP element on phones.
    const ctx = gsap.context(() => {
      // the content settles and dims slightly as the portfolio slides over
      gsap.to(el.querySelector(".hero__content"), {
        y: -60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "50% top", scrub: true },
      });
    }, el);

    // don't decode video that has scrolled out of view
    const io = new IntersectionObserver(([e]) => {
      if (!v.getAttribute("src")) return;
      if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    return () => {
      ctx.revert();
      io.disconnect();
    };
  }, []);

  const toggle = () => {
    const v = video.current!;
    if (!v.getAttribute("src")) v.src = pickVideo();
    if (v.paused) {
      delete v.dataset.userPaused;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.dataset.userPaused = "1";
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section className="hero" ref={root} aria-label="Intro">
      <div className="hero__sticky">
        <picture>
          <source media="(max-width: 767px)" srcSet="/video/poster-portrait.webp" />
          <source media="(max-width: 1280px)" srcSet="/video/poster-1280.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__poster" src="/video/poster-1920.webp" alt="" fetchPriority="high" />
        </picture>
        <video
          ref={video}
          className="hero__video"
          data-playing={playing}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => {
            setPlaying(true);
            setPaused(false);
          }}
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title lines">
              {hero.title.map((l, i) => (
                <span className="line" key={i}>
                  <span>{l}</span>{" "}
                </span>
              ))}
            </h1>
          </div>
          <div className="btn-row hero__btns">
            <Button label={hero.secondary.label} href={hero.secondary.href} variant="glass" />
            <Button label={hero.primary.label} href={hero.primary.href} variant="white" />
          </div>
        </div>
        <button className="hero__pause" type="button" onClick={toggle} aria-label={paused ? "Play background video" : "Pause background video"}>
          {paused ? (
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
