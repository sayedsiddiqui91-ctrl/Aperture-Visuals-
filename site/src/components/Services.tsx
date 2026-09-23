"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { services } from "@/data/content";
import { photo } from "@/lib/renders";
import { gsap } from "@/lib/gsap";

const R = 1200; // cylinder radius (px)
const STEP = 15; // degrees between cards

/** Statement, then a cylinder of service cards that rotates into view as you scroll. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const car = el.querySelector<HTMLElement>(".carousel")!;
      const cards = el.querySelectorAll<HTMLElement>(".card");
      const n = cards.length;
      // rotate about the cylinder axis first, then push out to its surface
      cards.forEach((c, i) => {
        c.style.transform = `rotateY(${(i - (n - 1) / 2) * STEP}deg) translateZ(${R}px)`;
      });
      gsap.set(car, { z: -R, rotationY: 60, y: 0 });
      // rotates in from the right and drifts down while the section passes (like the reference)
      gsap.to(car, {
        rotationY: 0,
        y: 400,
        ease: "none",
        scrollTrigger: { trigger: el.querySelector(".services__stage"), start: "top 85%", end: "bottom 15%", scrub: 0.6 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title">
      <div className="container">
        <div className="slabel slabel--center" data-reveal>
          <span className="slabel__t">Our services</span>
        </div>
        <h2 className="h-48 services__head" id="services-title" data-reveal="0.1">
          {services.statement}
        </h2>
      </div>
      <div className="services__stage">
        <div className="services__pin">
          <div className="carousel">
            {services.cards.map((c) => {
              const img = photo(c.image);
              return (
                <article className="card" key={c.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} srcSet={img.srcSet} sizes="360px" alt="" loading="lazy" />
                  <div className="card__meta">
                    <h3>{c.title}</h3>
                    <Link href={c.href}>View work</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
