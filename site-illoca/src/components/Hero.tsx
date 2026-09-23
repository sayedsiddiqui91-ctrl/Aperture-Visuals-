"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { READY_EVENT } from "./Loader";
import { ScribbleArrow, Underline } from "./Icons";
import { Split } from "./Split";

/**
 * Headline only. The hero image is the story's fixed frame, which sits over
 * `.hero__slot` and grows to the top of the viewport as this scrolls away.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const strokeLetters = el.querySelectorAll(".hero__stroke .c");
      const fill = el.querySelector(".hero__fill")!;
      const notes = el.querySelectorAll(".hero__note");
      const lines = el.querySelectorAll(".hero__note .uline svg");
      gsap.set(strokeLetters, { opacity: 0 });
      gsap.set(fill, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(notes, { opacity: 0 });
      gsap.set(lines, { scaleX: 0 });

      const intro = () => {
        if (reduce) {
          gsap.set([strokeLetters, notes], { opacity: 1 });
          gsap.set(fill, { clipPath: "inset(0 0% 0 0)" });
          gsap.set(lines, { scaleX: 1 });
          return;
        }
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          // the outline is "drawn" letter by letter, then the ink fills across
          .to(strokeLetters, { opacity: 1, duration: 0.5, stagger: 0.02 }, 0)
          .to(fill, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power3.inOut" }, 0.5)
          .to(notes, { opacity: 1, duration: 0.6, stagger: 0.2 }, 1.2)
          .to(lines, { scaleX: 1, duration: 0.7, ease: "power2.out", stagger: 0.2 }, 1.4);
      };
      document.addEventListener(READY_EVENT, intro, { once: true });
      return () => document.removeEventListener(READY_EVENT, intro);
    }, el);
    return () => ctx.revert();
  }, []);

  const text = hero.title.join(" ");
  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__head">
        <span className="hero__note hero__note--l t-hand">
          <span className="uline">
            {hero.noteLeft}
            <Underline />
          </span>
        </span>
        <h1 className="hero__title t-display">
          <span className="sr-only">{text}</span>
          <span className="hero__stroke" aria-hidden="true">
            <Split text={hero.title[0]} /> <br />
            <em><Split text={hero.title[1]} /></em>
          </span>
          <span className="hero__fill" aria-hidden="true">
            {hero.title[0]} <br />
            <em>{hero.title[1]}</em>
          </span>
        </h1>
        <span className="hero__note hero__note--r t-hand">
          <ScribbleArrow />
          <span>
            <b className="uline">
              {hero.noteRight[0]}
              <Underline />
            </b>
            <b>{hero.noteRight[1]}</b>
          </span>
        </span>
      </div>
      <div className="hero__slot" aria-hidden="true" />
    </section>
  );
}
