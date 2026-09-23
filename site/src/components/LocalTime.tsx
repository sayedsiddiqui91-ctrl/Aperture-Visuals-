"use client";
import { useEffect, useState } from "react";

/** Current time at the studio, so international clients know when to expect a reply. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setNow(f.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className}>
      <span className="ltime__dot" aria-hidden="true" />
      Dhaka {now ? <time>{now}</time> : "—"} <span className="ltime__tz">GMT+6</span>
    </span>
  );
}
