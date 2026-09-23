"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, cta, contact } from "@/data/content";
import { Button } from "./Button";
import { getLenis } from "@/lib/scroll";

const mask = (url: string): React.CSSProperties => ({
  display: "inline-block",
  background: "currentColor",
  WebkitMaskImage: `url(${url})`,
  maskImage: `url(${url})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

/** Vertical centre of the 72px nav bar. */
const NAV_Y = 36;
/** Below this scroll depth the nav always shows (you are still on the hero). */
const HIDE_AFTER = 160;

/**
 * Wordmark left, hamburger right; right-side panel menu.
 * The nav is white over dark areas (sections marked data-nav="dark") and teal over light ones,
 * so it always has solid contrast — a blend mode washes out over mid-tone footage.
 * Once scrolled it gets a frosted bar (so the logo never sits on page text), hides while scrolling
 * down, and slides back in on the way up.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wasOpen = useRef(false);
  const lastY = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        const focusInNav = document.activeElement?.closest(".nav");
        setHidden(dy > 0 && y > HIDE_AFTER && !openRef.current && !focusInNav);
        lastY.current = y;
      }
      if (y <= HIDE_AFTER) setHidden(false);
      setScrolled(y > 8);
      const dark = [...document.querySelectorAll<HTMLElement>("[data-nav=dark]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= NAV_Y && r.bottom >= NAV_Y;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (open) {
      getLenis()?.stop();
      document.querySelector<HTMLElement>(".menu__close")?.focus();
    } else {
      getLenis()?.start();
      if (wasOpen.current) document.querySelector<HTMLElement>(".nav__burger")?.focus();
    }
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className="nav"
        data-over={overDark === null ? undefined : overDark ? "dark" : "light"}
        data-bar={scrolled && overDark !== null ? (overDark ? "dark" : "light") : undefined}
        data-hidden={hidden}
        onFocus={() => setHidden(false)}
      >
        <Link href="/" className="nav__logo" aria-label="Aperture Visuals — home" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true" style={mask("/brand/mark.svg")} />
          <span className="nav__word" role="img" aria-label="Aperture" style={mask("/brand/wordmark.svg")} />
        </Link>
        <button className="nav__burger" aria-label="Open menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
          <span />
        </button>
      </header>

      <div className="menu" id="menu" data-open={open ? "true" : "false"} inert={!open}>
        <div className="menu__overlay" onClick={() => setOpen(false)} />
        <nav className="menu__panel" aria-label="Site">
          <button className="menu__close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
          <ul className="menu__links">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <p>{cta.title}</p>
            <div className="btn-row btn-row--stack">
              <Button label={contact.whatsapp.label} href={contact.whatsapp.href} variant="black" arrow external onClick={() => setOpen(false)} />
              <Button label={contact.call.label} href={contact.call.href} variant="outline" external onClick={() => setOpen(false)} />
              <Button label={contact.email.label} href={contact.email.href} variant="outline" external onClick={() => setOpen(false)} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
