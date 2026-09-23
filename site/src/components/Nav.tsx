"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site, cta } from "@/data/content";
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

/** Wordmark left, hamburger right (blend-difference so it reads on video and paper); right-side panel menu. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav__logo" aria-label="Aperture Visuals — home" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true" style={mask("/brand/mark.svg")} />
          <span className="nav__word" role="img" aria-label="Aperture" style={mask("/brand/wordmark.svg")} />
        </Link>
        <button className="nav__burger" aria-label="Open menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
          <span />
        </button>
      </header>

      <div className="menu" id="menu" data-open={open ? "true" : "false"} aria-hidden={!open}>
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
            <div className="btn-row">
              <Button label={cta.primary.label} href={cta.primary.href} variant="black" arrow external onClick={() => setOpen(false)} />
              <Button label={cta.secondary.label} href={cta.secondary.href} variant="outline" external onClick={() => setOpen(false)} />
            </div>
            <p className="t-label">
              {site.email} · {site.phone}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
