"use client";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";
import { BrandMark, BrandWordmark, MenuIcon, CloseIcon } from "./Icons";
import { Button } from "./Button";
import { gsap } from "@/lib/gsap";
import { READY_EVENT } from "./Loader";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Draws its frame after the loader, then fades the contents in.
    const onReady = () => {
      gsap.fromTo(".nav__frame rect", { strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 1.2, ease: "power3.inOut" });
      gsap.fromTo(".nav__inner", { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4 });
    };
    document.addEventListener(READY_EVENT, onReady, { once: true });
    return () => document.removeEventListener(READY_EVENT, onReady);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <svg className="nav__frame" viewBox="0 0 706 64" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="705" height="63" rx="2" strokeDasharray="1600" strokeDashoffset="1600" />
      </svg>
      <div className="nav__inner" style={{ opacity: 0 }}>
        <a href="#top" className="nav__brand" aria-label="Aperture Visuals — home" onClick={() => setOpen(false)}>
          <BrandMark className="nav__mark" />
          <BrandWordmark className="nav__word" />
        </a>
        <ul className="nav__links t-mono">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
        <Button variant="nav" glyph="cta" label="Get a quote" href={site.whatsapp} external />
        <button className="nav__menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div className="menu" id="mobile-menu" data-open={open ? "true" : "false"} aria-hidden={!open}>
        {nav.map((n) => (
          <a key={n.href} className="menu__link" href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <div className="menu__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsapp} target="_blank" rel="noopener">
            WhatsApp {site.phone}
          </a>
          <span>
            {site.location} · {site.availability}
          </span>
        </div>
      </div>
    </nav>
  );
}
