"use client";
import { getLenis } from "@/lib/scroll";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CloseIcon } from "./Icons";
import { site } from "@/data/content";

type ModalState =
  | { type: "video" }
  | { type: "lightbox"; image: string; alt: string }
  | null;

interface Ctx {
  open: (m: Exclude<ModalState, null>) => void;
  close: () => void;
  /** Resolve a content action (quote / email / video / lightbox) into behaviour. */
  act: (action: string, payload?: { image?: string; alt?: string }) => void;
}

const ModalCtx = createContext<Ctx | null>(null);
export const useModal = () => {
  const c = useContext(ModalCtx);
  if (!c) throw new Error("useModal outside provider");
  return c;
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>(null);
  const video = useRef<HTMLVideoElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((m: Exclude<ModalState, null>) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setState(m);
  }, []);
  const close = useCallback(() => {
    setState(null);
    lastFocus.current?.focus();
  }, []);

  const act = useCallback<Ctx["act"]>(
    (action, payload) => {
      if (action === "quote") window.open(site.whatsapp, "_blank", "noopener");
      else if (action === "email") window.location.href = `mailto:${site.email}?subject=Project%20enquiry`;
      else if (action === "video") open({ type: "video" });
      else if (action === "lightbox" && payload?.image) open({ type: "lightbox", image: payload.image, alt: payload.alt ?? "" });
    },
    [open]
  );

  useEffect(() => {
    if (!state) {
      getLenis()?.start();
      return;
    }
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    if (state.type === "video") {
      const v = video.current;
      v?.play().catch(() => {});
    }
    const closeBtn = document.querySelector<HTMLButtonElement>(".modal__close");
    closeBtn?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      video.current?.pause();
    };
  }, [state, close]);

  return (
    <ModalCtx.Provider value={{ open, close, act }}>
      {children}
      <div
        className="modal"
        data-open={state ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-hidden={state ? "false" : "true"}
        aria-label={state?.type === "video" ? "Showreel" : "Render"}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="modal__box">
          <button className="btn btn--white modal__close" onClick={close} aria-label="Close">
            <span className="btn__ico"><CloseIcon /></span>
            Close
          </button>
          {state?.type === "video" && (
            <video ref={video} src="/video/showreel.mp4" controls playsInline preload="none" />
          )}
          {state?.type === "lightbox" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/renders/${state.image}-1920.webp`} alt={state.alt} />
          )}
          {state?.type === "lightbox" && <div className="modal__caption">{state.alt}</div>}
        </div>
      </div>
    </ModalCtx.Provider>
  );
}
