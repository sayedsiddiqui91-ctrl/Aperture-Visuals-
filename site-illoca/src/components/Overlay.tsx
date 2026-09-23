"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/scroll";
import { chapters, overview, site, type Chapter } from "@/data/content";
import { CloseIcon, Underline } from "./Icons";
import { Button } from "./Button";

interface Ctx {
  /** Open the feature-overview card for a chapter. */
  openChapter: (n: number) => void;
  openVideo: () => void;
  /** Resolve a content action into behaviour. */
  act: (action: string, chapter?: number) => void;
}
const OverlayCtx = createContext<Ctx | null>(null);
export const useOverlay = () => {
  const c = useContext(OverlayCtx);
  if (!c) throw new Error("useOverlay outside provider");
  return c;
};

/**
 * The "Watch the demo" panel: a tilted paper card sliding in from the bottom-left
 * with an eyebrow, the chapter title, three steps and the media — plus a plain
 * lightbox for the full-size render.
 */
export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [card, setCard] = useState<Chapter | null>(null);
  const [lightbox, setLightbox] = useState<Chapter | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const openChapter = useCallback((n: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setCard(chapters.find((c) => c.n === n) ?? null);
  }, []);
  const openVideo = useCallback(() => openChapter(2), [openChapter]);
  const close = useCallback(() => {
    setLightbox(null);
    setCard(null);
    lastFocus.current?.focus();
  }, []);
  const act = useCallback<Ctx["act"]>(
    (action, chapter) => {
      if (action === "quote") window.open(site.whatsapp, "_blank", "noopener");
      else if (action === "email") window.location.href = `mailto:${site.email}?subject=Project%20enquiry`;
      else if (action === "video") openVideo();
      else if (chapter) openChapter(chapter);
    },
    [openChapter, openVideo]
  );

  useEffect(() => {
    const open = !!card || !!lightbox;
    if (!open) {
      getLenis()?.start();
      return;
    }
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    if (card?.cta.action === "video") video.current?.play().catch(() => {});
    document.querySelector<HTMLButtonElement>(lightbox ? ".lb__close" : ".ov__close")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      video.current?.pause();
    };
  }, [card, lightbox, close]);

  const title = card ? card.title.join(" ") : "";

  return (
    <OverlayCtx.Provider value={{ openChapter, openVideo, act }}>
      {children}

      <div className="ov" data-open={card ? "true" : "false"} role="dialog" aria-modal="true" aria-hidden={!card} aria-label={`${title} — feature overview`}>
        <div className="ov__bg" onClick={close} />
        <div className="ov__card">
          <div className="ov__head">
            <div className="t-hand uline" style={{ fontSize: "calc(18 * var(--s))", color: "var(--ink-2)" }}>
              {overview.eyebrow}
              <Underline />
            </div>
            <button className="ov__close" onClick={close} aria-label="Close">
              {overview.close} <CloseIcon />
            </button>
          </div>
          {card && (
            <>
              <h3 className="ov__title t-display">{title}</h3>
              <ol className="ov__steps">
                {card.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="ov__media">
                {card.cta.action === "video" ? (
                  <video ref={video} src="/video/showreel.mp4" controls playsInline preload="none" />
                ) : (
                  <button type="button" onClick={() => setLightbox(card)} aria-label="Open full-size render" style={{ width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/renders/${card.image}-960.webp`} alt={card.alt} />
                  </button>
                )}
              </div>
              {card.cta.action !== "video" && (
                <p className="t-hand" style={{ fontSize: "calc(13 * var(--s))", margin: "calc(10 * var(--s)) 0 0" }}>
                  tap the image for full size
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="lb" data-open={lightbox ? "true" : "false"} role="dialog" aria-modal="true" aria-hidden={!lightbox} aria-label="Render" onClick={(e) => e.target === e.currentTarget && setLightbox(null)}>
        <Button variant="paper" glyph="arrow" label="Close" className="lb__close" onClick={() => setLightbox(null)} />
        {lightbox && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/renders/${lightbox.image}-1920.webp`} alt={lightbox.alt} />
        )}
      </div>
    </OverlayCtx.Provider>
  );
}
