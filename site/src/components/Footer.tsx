import Link from "next/link";
import { footer, site, socials } from "@/data/content";
import { Button } from "./Button";
import LocalTime from "./LocalTime";

const ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Behance: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.2 11.3c.9-.4 1.4-1.1 1.4-2.2C9.6 7 8.1 6 6.1 6H1v12h5.3c2.1 0 3.9-1 3.9-3.3 0-1.4-.7-2.5-2-3.4zM3.3 8h2.4c.9 0 1.6.3 1.6 1.3S6.7 10.6 5.8 10.6H3.3zm2.6 8H3.3v-3.4h2.7c1.1 0 1.8.5 1.8 1.7S7 16 5.9 16zM17.2 9c-2.8 0-4.6 1.9-4.6 4.6 0 2.8 1.7 4.6 4.6 4.6 2.2 0 3.6-1 4.3-3.1h-2.2c-.3.8-1.1 1.2-2 1.2-1.4 0-2.2-.8-2.3-2.3H21.6c.2-3-1.4-5-4.4-5zm-2.2 3.6c.1-1.1.9-1.8 2.1-1.8 1.1 0 1.9.7 2 1.8zM15 6.8h4.6V8H15z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
    </svg>
  ),
};

export default function Footer() {
  const links = socials();
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__wrap" data-nav="dark">
        <div className="footer__cols">
          <div className="footer__cta">
            <h2>{footer.title}</h2>
            <div>
              <Button label={footer.button.label} href={footer.button.href} variant="white" external />
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__group">
              <span className="t-label">Navigate</span>
              <ul>
                {footer.navigate.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__group">
              <span className="t-label">Contacts</span>
              <ul>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </li>
                <li>
                  <a href={site.whatsapp} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__group">
              <span className="t-label">Studio</span>
              <ul>
                {site.address.map((a) => (
                  <li key={a}>{a}</li>
                ))}
                <li>
                  <LocalTime className="ltime ltime--footer" />
                </li>
              </ul>
            </div>
            {links.length > 0 && (
              <div className="footer__group">
                <span className="t-label">Socials</span>
                <div className="footer__social">
                  {links.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} title={s.label} target="_blank" rel="noopener">
                      {ICONS[s.label] ?? s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer__bottom">
          <span>{footer.copyright}</span>
          <span>{site.tagline}</span>
        </div>
      </div>
      <div className="footer__band" aria-hidden="true" data-nav="dark">
        {footer.band[0]}
        <b>·</b>
        {footer.band[1]}
      </div>
    </footer>
  );
}
