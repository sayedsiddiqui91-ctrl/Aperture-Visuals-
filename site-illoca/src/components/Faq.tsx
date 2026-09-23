"use client";
import { useState } from "react";
import { faqs, site } from "@/data/content";
import { ChevronIcon, Underline } from "./Icons";
import { Button } from "./Button";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="folder folder--tan folder--tilt" id="faqs" aria-labelledby="faq-title">
      <div className="folder__sheet folder__sheet--tan">
        <div className="folder__tab">{faqs.tab}</div>
        <div className="folder__inner faq">
          <div>
            <div className="t-hand uline">
              {faqs.eyebrow}
              <Underline />
            </div>
            <h2 className="faq__title t-display" id="faq-title">
              {faqs.title.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h2>
            <Button variant="demo" glyph="arrow" label={site.email} href={`mailto:${site.email}`} />
          </div>
          <ul className="faq__list">
            {faqs.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li className="faq__item" key={item.q} data-open={isOpen ? "true" : "false"}>
                  <button className="faq__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {item.q}
                    <i><ChevronIcon /></i>
                  </button>
                  <div className="faq__a" id={`faq-a-${i}`} role="region" aria-hidden={!isOpen}>
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
