"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/data/content";
import { Button } from "./Button";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = el.querySelectorAll(".hero__title .line > span");
      const rest = el.querySelectorAll(".hero__eyebrow, .hero__btns");
      gsap.set(rest, { opacity: 0, y: reduce ? 0 : 12 });
      gsap.set(lines, { yPercent: reduce ? 0 : 110 });
      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.2 })
        .to(lines, { yPercent: 0, duration: reduce ? 0 : 1.2, stagger: 0.1 }, 0)
        .to(rest, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.5);
      // the content settles and dims slightly as the portfolio slides over
      gsap.to(el.querySelector(".hero__content"), {
        y: -60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "50% top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-label="Intro">
      <div className="hero__sticky">
        <video className="hero__video" autoPlay muted loop playsInline poster="/video/poster.jpg" preload="metadata">
          <source src="/video/hero.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/video/hero-720.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title lines">
              {hero.title.map((l, i) => (
                <span className="line" key={i}>
                  <span>{l}</span>
                </span>
              ))}
            </h1>
          </div>
          <div className="btn-row hero__btns">
            <Button label={hero.secondary.label} href={hero.secondary.href} variant="glass" />
            <Button label={hero.primary.label} href={hero.primary.href} variant="white" />
          </div>
        </div>
      </div>
    </section>
  );
}
