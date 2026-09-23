"use client";
import { useEffect, useRef } from "react";
import { contact, cta } from "@/data/content";
import { photo } from "@/lib/renders";
import { Button } from "./Button";
import { gsap } from "@/lib/gsap";
import { Lines } from "./Reveal";
import LocalTime from "./LocalTime";

export default function Cta() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el.querySelector(".cta__bg"),
        { yPercent: -8 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  const img = photo(cta.image);
  return (
    <section className="cta" id="contact" ref={root} aria-labelledby="cta-title" data-nav="dark">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cta__bg" src={img.src} srcSet={img.srcSet} sizes="100vw" alt="" loading="lazy" />
      <div className="cta__overlay" />
      <div className="cta__content">
        <LocalTime className="ltime" />
        <Lines lines={["Let's talk about", "your next project"]} className="h-64" id="cta-title" />
        <p className="cta__lead">{cta.lead}</p>
        <div className="btn-row">
          <Button label={contact.whatsapp.label} href={contact.whatsapp.href} variant="white" arrow external />
          <Button label={contact.call.label} href={contact.call.href} variant="black" external />
          <Button label={contact.email.label} href={contact.email.href} variant="glass" external />
        </div>
      </div>
    </section>
  );
}
