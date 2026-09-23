"use client";
import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/scroll";
import { gsap } from "@/lib/gsap";
import { BrandMark } from "./Icons";

export const READY_EVENT = "aperture:ready";

/** The four-tile mark holds on the paper, then the page fades up. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const tiles = el.querySelectorAll<HTMLElement>(".loader__tile");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    getLenis()?.stop();
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setDone(true);
        getLenis()?.start();
        document.dispatchEvent(new CustomEvent(READY_EVENT));
      },
    });
    tl.to(tiles, { opacity: 1, duration: reduce ? 0.2 : 0.4, stagger: reduce ? 0 : 0.1 }).to(
      el,
      { opacity: 0, duration: 0.6, ease: "power2.inOut" },
      reduce ? "+=0.2" : "+=0.9"
    );
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__tiles">
        <div className="loader__tile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </div>
        <div className="loader__tile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16l8-8 8 8" /></svg>
        </div>
        <div className="loader__tile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="6" /></svg>
        </div>
        <div className="loader__tile">
          <BrandMark />
        </div>
      </div>
    </div>
  );
}
