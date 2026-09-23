"use client";
import { useEffect, useRef, useState } from "react";
import { advantages } from "@/data/content";
import { photo } from "@/lib/renders";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

/** Pinned split: the list advances with scroll (or click), the image swaps per item. */
export default function Advantages() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = advantages.items.length;

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [n]);

  const jump = (i: number) => {
    setActive(i);
    const el = root.current!;
    if (window.innerWidth < 992) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    getLenis()?.scrollTo(top + ((i + 0.5) / n) * travel, { duration: 1 });
  };

  return (
    <section className="adv" ref={root} aria-labelledby="adv-title">
      <div className="adv__pin">
        <div className="adv__panel">
          <h2 className="h-48" id="adv-title">
            {advantages.title}
          </h2>
          <ol className="adv__list">
            {advantages.items.map((it, i) => (
              <li className={`adv__item ${i === active ? "is-active" : ""}`} key={it.title} onClick={() => jump(i)}>
                <i>0{i + 1}</i>
                <h3>{it.title}</h3>
                <div className="adv__body">
                  <p>{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="adv__img" aria-hidden="true">
          {advantages.items.map((it, i) => {
            const img = photo(it.image);
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={it.image} src={img.src} srcSet={img.srcSet} sizes="720px" alt="" className={i === active ? "is-active" : ""} loading="lazy" />
            );
          })}
        </div>
      </div>
    </section>
  );
}
