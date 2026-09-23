/** Splits text into word/letter spans so GSAP can stagger the letters. */
export function Split({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`split ${className}`} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i}>
          <span className="w" aria-hidden="true">
            {[...w].map((ch, j) => (
              <span className="c" key={j}>{ch}</span>
            ))}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
