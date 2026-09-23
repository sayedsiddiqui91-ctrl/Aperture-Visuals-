"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/** Lenis smooth scroll wired to GSAP's ticker; in-page anchors scroll through it. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: !reduce, anchors: false });
    setLenis(lenis);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const href = a.getAttribute("href")!;
      const hash = href.startsWith("#") ? href : href.startsWith("/#") && location.pathname === "/" ? href.slice(1) : null;
      if (!hash) return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // new route → top, and honour a hash after navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.hash) {
      const t = setTimeout(() => {
        const el = document.querySelector<HTMLElement>(location.hash);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
      }, 300);
      return () => clearTimeout(t);
    }
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
}
