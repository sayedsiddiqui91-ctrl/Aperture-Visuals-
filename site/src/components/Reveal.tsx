"use client";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/** Fades [data-reveal] elements up as they enter; lines inside .lines slide up per line. */
export default function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: reduce ? 0 : 24 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: Number(el.dataset.reveal) || 0, scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });
      document.querySelectorAll<HTMLElement>(".lines[data-lines]").forEach((el) => {
        const spans = el.querySelectorAll(".line > span");
        gsap.fromTo(spans, { yPercent: reduce ? 0 : 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}

/** Splits an array of lines into masked spans for the line reveal. */
export function Lines({ lines, className = "", as: Tag = "h2", id }: { lines: string[]; className?: string; as?: "h1" | "h2" | "p"; id?: string }) {
  return (
    <Tag className={`lines ${className}`} data-lines="" id={id}>
      {lines.map((l, i) => (
        // the trailing space keeps words apart in the text/accessible name ("architecture to", not "architectureto")
        <span className="line" key={i}>
          <span>{l}</span>{" "}
        </span>
      ))}
    </Tag>
  );
}
