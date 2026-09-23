"use client";
import { useEffect, useRef } from "react";
import { pricing } from "@/data/content";
import { TickIcon } from "./Icons";
import { Button } from "./Button";
import { useOverlay } from "./Overlay";
import { gsap } from "@/lib/gsap";

export default function Pricing() {
  const { act } = useOverlay();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // The folder arrives tilted and straightens as it scrolls into view.
      gsap.fromTo(
        el,
        { rotate: -3 },
        { rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.4 } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="folder folder--sand folder--tilt" id="pricing" aria-labelledby="pricing-title" ref={root}>
      <div className="folder__sheet folder__sheet--sand">
        <div className="folder__tab">{pricing.tab}</div>
        <div className="folder__inner">
          <h2 className="pricing__headline" id="pricing-title">
            Pricing varies with scale, detail and deadline. These are <u>starting estimates</u>.
          </h2>
          <div className="pricing__grid">
            {pricing.plans.map((p) => (
              <article className={`plan plan--${p.tone}`} key={p.name}>
                <h3 className="plan__name">{p.name}</h3>
                <p className="plan__price">
                  <b>{p.price}</b> / {p.unit}
                </p>
                <ul className="plan__list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <TickIcon />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.tone === "paper" ? "paper" : "paper-dark"}
                  glyph={p.cta.action === "video" ? "play" : "trail"}
                  label={p.cta.label}
                  onClick={() => act(p.cta.action)}
                />
              </article>
            ))}
          </div>
          <p className="pricing__note">{pricing.footnote}</p>
        </div>
      </div>
    </section>
  );
}
