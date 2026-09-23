import Link from "next/link";

const Arrow = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
  </svg>
);

/** 54px button whose face flips on hover (front face rotates up, back face rotates in). */
export function Button({
  label,
  href,
  variant = "white",
  external,
  arrow,
  onClick,
  className = "",
}: {
  label: string;
  href?: string;
  variant?: "white" | "black" | "glass" | "outline";
  external?: boolean;
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const faces = (
    <>
      <span className="btn__face btn__face--front">
        {label}
        {arrow && <Arrow />}
      </span>
      <span className="btn__face btn__face--back" aria-hidden="true">
        {label}
        {arrow && <Arrow />}
      </span>
    </>
  );
  const cls = `btn btn--${variant} ${className}`;
  if (!href) return <button className={cls} onClick={onClick} type="button">{faces}</button>;
  if (external || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http"))
    return (
      <a className={cls} href={href} onClick={onClick} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
        {faces}
      </a>
    );
  return (
    <Link className={cls} href={href} onClick={onClick}>
      {faces}
    </Link>
  );
}
