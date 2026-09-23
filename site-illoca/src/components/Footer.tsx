import { readFileSync } from "node:fs";
import path from "node:path";
import { footer, nav, site } from "@/data/content";
import { BrandWordmark } from "./Icons";

/* The traced monogram, laid flat in isometric and extruded upward as line-work —
   the reference does the same with its wordmark. */
function ExtrudedMark() {
  const svg = readFileSync(path.join(process.cwd(), "public/brand/mark.svg"), "utf8");
  const d = svg.match(/ d="([^"]+)"/)?.[1] ?? "";
  const layers = 16;
  const depth = 150;
  // isometric ground projection of the 360×512 glyph, centred in the viewBox
  const iso = "matrix(0.866,0.5,-0.866,0.5,500,140)";
  return (
    <svg viewBox="0 0 1000 640" fill="none" stroke="currentColor" strokeLinejoin="round" aria-hidden="true">
      <g transform="translate(0,-40)">
        {/* ground plane */}
        <path d="M500 540 L60 320 L500 100 L940 320 Z" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
        {/* extrusion sides: stacked outlines */}
        {Array.from({ length: layers }, (_, k) => (
          <g key={k} transform={`translate(0,${-(depth / layers) * k})`} opacity={k === 0 ? 0.9 : 0.28}>
            <g transform={iso}>
              <path d={d} strokeWidth={k === 0 ? 1.4 : 1} vectorEffect="non-scaling-stroke" />
            </g>
          </g>
        ))}
        {/* top face */}
        <g transform={`translate(0,${-depth})`}>
          <g transform={iso}>
            <path d={d} strokeWidth="1.8" vectorEffect="non-scaling-stroke" fill="rgba(31,79,216,0.85)" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__slant" aria-hidden="true" />
      <div className="footer__art">
        <ExtrudedMark />
      </div>
      <div className="footer__panel">
        <div className="footer__watermark" aria-hidden="true">
          aperture<sup>®</sup>
        </div>
        <div className="footer__grid">
          <div>
            <BrandWordmark className="footer__word" />
            <p className="footer__statement">
              {footer.statement[0]}
              <br />
              {footer.statement[1]}
            </p>
          </div>
          <div className="footer__col">
            <h4>Quick links</h4>
            <ul>
              {[{ label: "Home", href: "#top" }, ...nav].map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener">
                  WhatsApp {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{footer.copyright}</span>
          <span>{site.location}</span>
          <span>{site.availability}</span>
        </div>
      </div>
    </footer>
  );
}
