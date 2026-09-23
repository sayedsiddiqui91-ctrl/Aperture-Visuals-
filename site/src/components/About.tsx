"use client";
import { useEffect, useRef } from "react";
import { about } from "@/data/content";
import { gsap } from "@/lib/gsap";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      el.querySelectorAll<HTMLElement>(".about__num strong").forEach((s) => {
        const target = Number(s.dataset.value);
        const suffix = s.dataset.suffix ?? "";
        const obj = { v: 0 };
        s.textContent = "0" + suffix; // server HTML carries the real value; count up from 0 only in the browser
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: s, start: "top 85%", once: true },
          onUpdate: () => {
            s.textContent = Math.round(obj.v) + suffix;
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section className="about" ref={root} aria-label="About">
      <div className="container">
        <h2 className="h-48 about__statement" data-reveal>
          {about.statement}
        </h2>
        <div className="about__nums">
          {about.stats.map((s, i) => (
            <div className="about__num" key={s.label} data-reveal={i * 0.06}>
              <strong data-value={s.value} data-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </strong>
              <span className="t-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
