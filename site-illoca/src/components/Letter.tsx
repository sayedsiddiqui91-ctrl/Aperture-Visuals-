"use client";
import { useEffect, useRef } from "react";
import { letter } from "@/data/content";
import { photo } from "@/lib/renders";
import { gsap } from "@/lib/gsap";
import { Underline } from "./Icons";

/** Pinned for ~1.6 viewports: the letter rises out of its envelope while the prints drift. */
export default function Letter() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pin = el.querySelector<HTMLElement>(".letter__pin")!;
      const paper = el.querySelector<HTMLElement>(".letter__paper")!;
      const floats = el.querySelectorAll<HTMLElement>(".letter__float");
      const head = el.querySelectorAll(".letter__eyebrow, .letter__title");
      const uline = el.querySelector(".letter__eyebrow svg");

      if (reduce) return;
      gsap.set(paper, { y: () => window.innerHeight * 0.75 });
      gsap.set(head, { opacity: 0, y: 20 });
      gsap.set(uline, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", pin, scrub: 0.6, invalidateOnRefresh: true },
      });
      tl.to(head, { opacity: 1, y: 0, duration: 0.12, stagger: 0.04, ease: "power2.out" }, 0.02)
        .to(uline, { scaleX: 1, duration: 0.1 }, 0.1)
        .to(paper, { y: 0, duration: 0.6, ease: "power1.out" }, 0.1);
      floats.forEach((f, i) => {
        tl.fromTo(f, { y: [160, 220, -120, -180][i % 4] }, { y: [-120, -160, 120, 160][i % 4], duration: 1 }, 0);
      });
      // before the section pins, fade the heading in as it approaches
      gsap.from(el, { opacity: 1 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="letter" ref={root} aria-labelledby="letter-title">
      <div className="letter__pin">
        {letter.floats.map((f) => {
          const p = photo(f.image);
          return (
            <div className="letter__float" key={f.image} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} srcSet={p.srcSet} sizes="220px" alt="" loading="lazy" />
            </div>
          );
        })}
        <div className="letter__eyebrow t-hand">
          <span className="uline">
            {letter.eyebrow}
            <Underline />
          </span>
        </div>
        <h2 className="letter__title t-display" id="letter-title">
          {letter.title}
        </h2>
        <div className="letter__paper">
          {letter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>{letter.signoff}</p>
        </div>
        <div className="letter__envelope" aria-hidden="true" />
      </div>
    </section>
  );
}
