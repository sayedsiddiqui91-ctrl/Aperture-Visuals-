"use client";
import { useEffect, useRef, useState } from "react";
import { cookie, site } from "@/data/content";
import { getLenis } from "@/lib/scroll";
import { CheckIcon, CloseIcon } from "./Icons";

/** Grain, X/Y readout, top-right email, Lenis-synced scrollbar pill, cookie notice. */
export default function Chrome() {
  const x = useRef<HTMLSpanElement>(null);
  const y = useRef<HTMLSpanElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [sbVisible, setSbVisible] = useState(false);
  const [cookieHidden, setCookieHidden] = useState(true);

  useEffect(() => {
    try {
      setCookieHidden(localStorage.getItem("av-cookie") !== null);
    } catch {
      setCookieHidden(false);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (x.current) x.current.textContent = (e.clientX / window.innerWidth).toFixed(2);
        if (y.current) y.current.textContent = (e.clientY / window.innerHeight).toFixed(2);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scrollbar: the pill tracks scroll progress, shows while scrolling, drags to scroll.
  useEffect(() => {
    let hide = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (thumb.current) thumb.current.style.transform = `translateY(${p * (window.innerHeight - 52)}px)`;
      // on phones the notice would sit over the story text — dismiss it once the story starts
      if (window.matchMedia("(pointer: coarse)").matches && window.scrollY > window.innerHeight) setCookieHidden(true);
      setSbVisible(true);
      clearTimeout(hide);
      hide = window.setTimeout(() => setSbVisible(false), 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const drag = (e: React.PointerEvent) => {
    const start = e.clientY;
    const startY = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const move = (ev: PointerEvent) =>
      getLenis()?.scrollTo(startY + ((ev.clientY - start) / (window.innerHeight - 52)) * max, { immediate: true });
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const decide = (v: string) => {
    try {
      localStorage.setItem("av-cookie", v);
    } catch {}
    setCookieHidden(true);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="coords" aria-hidden="true">
        <div>
          X <span ref={x}>0.00</span>
        </div>
        <div>
          Y <span ref={y}>0.00</span>
        </div>
      </div>
      <a className="topmail" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="sb" data-visible={sbVisible} aria-hidden="true">
        <div className="sb__thumb" ref={thumb} onPointerDown={drag} />
      </div>
      <div className="cookie" data-hidden={cookieHidden} role="dialog" aria-label="Cookie notice" aria-hidden={cookieHidden}>
        <p>
          {cookie.text} <a href="#faqs">{cookie.link}</a>.
        </p>
        <div className="cookie__btns">
          <button className="cookie__btn cookie__btn--ok" onClick={() => decide("accept")}>
            <i><CheckIcon /></i>
            {cookie.accept}
          </button>
          <button className="cookie__btn cookie__btn--no" onClick={() => decide("reject")}>
            <i><CloseIcon /></i>
            {cookie.reject}
          </button>
        </div>
      </div>
    </>
  );
}
