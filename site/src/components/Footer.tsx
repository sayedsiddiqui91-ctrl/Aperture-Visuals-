import Link from "next/link";
import { footer, site } from "@/data/content";
import { Button } from "./Button";

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__wrap">
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
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__group">
              <span className="t-label">Address</span>
              <ul>
                {site.address.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="footer__group">
              <span className="t-label">Socials</span>
              <div className="footer__social">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener">
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{footer.copyright}</span>
          <span>{site.tagline}</span>
        </div>
      </div>
      <div className="footer__band" aria-hidden="true">
        {footer.band[0]}
        <b>·</b>
        {footer.band[1]}
      </div>
    </footer>
  );
}
