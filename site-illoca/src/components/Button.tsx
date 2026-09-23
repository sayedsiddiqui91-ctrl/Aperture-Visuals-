import { CtaGlyph, TrailGlyph, ArrowGlyph, PlayGlyph } from "./Icons";

type Common = { label: string; className?: string; onClick?: () => void; href?: string; external?: boolean; ariaLabel?: string };

/**
 * The reference's three button shapes. Labels are doubled so the second copy
 * can slide up on hover; the fill layer scales up from the bottom.
 */
export function Button({
  variant = "nav",
  glyph = "cta",
  label,
  className = "",
  onClick,
  href,
  external,
  ariaLabel,
}: Common & { variant?: "nav" | "paper" | "paper-dark" | "demo"; glyph?: "cta" | "trail" | "arrow" | "play" }) {
  const Glyph = glyph === "cta" ? CtaGlyph : glyph === "trail" ? TrailGlyph : glyph === "play" ? PlayGlyph : ArrowGlyph;
  const cls =
    variant === "demo"
      ? `btn btn--demo ${className}`
      : `btn ${variant === "nav" ? "btn--nav" : "btn--paper"} ${variant === "paper-dark" ? "btn--on-dark" : ""} ${className}`;
  const inner =
    variant === "demo" ? (
      <>
        <span className="btn__sq"><Glyph /></span>
        <span className="btn__cell">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </>
    ) : (
      <>
        <span className="btn__fill" aria-hidden="true" />
        <span className="btn__ico"><Glyph /></span>
        <span className="btn__label">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </>
    );
  if (href)
    return (
      <a className={cls} href={href} onClick={onClick} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  return (
    <button className={cls} onClick={onClick} aria-label={ariaLabel} type="button">
      {inner}
    </button>
  );
}
