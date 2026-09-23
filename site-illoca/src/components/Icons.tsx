/* Glyphs drawn to match the reference's icon squares (37×37 grid). */

/** Dotted arc + arrow — the navy CTA square. */
export const CtaGlyph = () => (
  <svg viewBox="0 0 37 37" fill="none" aria-hidden="true">
    <rect x="9.5" y="8" width="1" height="20" rx="0.2" fill="currentColor" fillOpacity="0.4" />
    <path d="M28 28C28 18.06 19.94 10 10 10" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="1 1" />
    <path d="M6 27h26v2H6z" fill="currentColor" />
    <path d="M27 21l5 7-5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
/** Dotted trail + chevron — the cream button square. */
export const TrailGlyph = () => (
  <svg viewBox="0 0 37 37" fill="none" aria-hidden="true">
    <path d="M21 25l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {[4, 8, 12, 16, 20].map((x, i) => (
      <circle key={x} cx={x} cy="19" r="1" fill="currentColor" fillOpacity={0.2 * i + 0.2} />
    ))}
  </svg>
);
export const ArrowGlyph = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 10h14M11 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const PlayGlyph = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6 3.5v13l10-6.5z" />
  </svg>
);
export const CheckIcon = () => (
  <svg viewBox="0 0 37 37" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M26.59 13.65L16.98 25.75 11 19.72l1.88-1.87 3.88 3.91 7.75-9.76z" fill="currentColor" />
  </svg>
);
export const TickIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M1.5 5.5 4 8l4.5-6" />
  </svg>
);
export const ChevronIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2 3.5 5 6.5l3-3" />
  </svg>
);
export const CloseIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2 2l6 6M8 2l-6 6" />
  </svg>
);
/** Three-slab square, as in the reference's mobile "Menu" icon. */
export const MenuIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.375 0C19.72 0 20 .28 20 .625v18.75c0 .345-.28.625-.625.625H.625A.625.625 0 0 1 0 19.375V.625C0 .28.28 0 .625 0h18.75zM1.875 13.75a.625.625 0 0 0-.625.625v3.75c0 .345.28.625.625.625h16.25c.345 0 .625-.28.625-.625v-3.75a.625.625 0 0 0-.625-.625H1.875zm0-6.25a.625.625 0 0 0-.625.625v3.75c0 .345.28.625.625.625h16.25c.345 0 .625-.28.625-.625v-3.75a.625.625 0 0 0-.625-.625H1.875zm0-6.25a.625.625 0 0 0-.625.625v3.75c0 .345.28.625.625.625h16.25c.345 0 .625-.28.625-.625v-3.75a.625.625 0 0 0-.625-.625H1.875z" />
  </svg>
);
export const ScribbleArrow = () => (
  <svg viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <path d="M42 2C30 3 14 7 4 18M4 18l7-1M4 18l1-7" />
  </svg>
);
/** A wobbly hand-drawn underline; scaleX it in from the left. */
export const Underline = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 325 5" preserveAspectRatio="none" aria-hidden="true">
    <path d="M1 3.2C40 1.6 82 3.6 123 2.4S205 3.8 246 2.2 302 3.4 324 2.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

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
export const BrandMark = ({ className }: { className?: string }) => <span className={className} aria-hidden="true" style={mask("/brand/mark.svg")} />;
export const BrandWordmark = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <span className={className} role="img" aria-label="Aperture" style={{ ...mask("/brand/wordmark.svg"), aspectRatio: "442 / 74", ...style }} />
);
