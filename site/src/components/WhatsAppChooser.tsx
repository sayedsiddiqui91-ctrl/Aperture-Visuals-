"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/content";

/** True on phones and tablets, where wa.me opens the WhatsApp app directly. */
const isHandheld = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.matchMedia("(pointer: coarse)").matches);

/**
 * On a computer, a wa.me link opens WhatsApp's web page, which pushes "Download WhatsApp" even when the desktop app
 * is installed. So on desktop, every WhatsApp link on the site opens this chooser instead: open the installed app,
 * use WhatsApp Web, or scan the QR code with a phone. Phones follow the link normally.
 */
export default function WhatsAppChooser({ qr }: { qr: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!a || isHandheld()) return;
      e.preventDefault();
      setCopied(false);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialog.current?.close();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.phoneDisplay);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="wa"
      aria-labelledby="wa-title"
      onClick={(e) => e.target === e.currentTarget && close()} // click on the backdrop
    >
      <div className="wa__card">
        <button className="wa__close" type="button" onClick={close} aria-label="Close">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
        <p className="wa__eyebrow">WhatsApp</p>
        <h2 className="wa__title" id="wa-title">
          Chat with the studio
        </h2>
        <div className="wa__body">
          <div className="wa__options">
            <a className="wa__opt wa__opt--primary" href={site.whatsappApp} onClick={close}>
              <strong>Open the WhatsApp app</strong>
              <span>If WhatsApp is installed on this computer</span>
            </a>
            <a className="wa__opt" href={site.whatsappWeb} target="_blank" rel="noopener" onClick={close}>
              <strong>Use WhatsApp Web</strong>
              <span>Opens in your browser</span>
            </a>
            <div className="wa__num">
              <span>
                Number <b>{site.phoneDisplay}</b>
              </span>
              <button type="button" onClick={copy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div className="wa__qr">
            <span className="wa__qr-code" dangerouslySetInnerHTML={{ __html: qr }} aria-hidden="true" />
            <span>Or scan with your phone</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
