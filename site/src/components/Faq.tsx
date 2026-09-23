"use client";
import { useState } from "react";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div>
          <div className="slabel" data-reveal>
            <span className="slabel__t">FAQs</span>
          </div>
          <h2 className="h-48" id="faq-title" data-reveal="0.1">
            {faqs.title}
          </h2>
        </div>
        <ul className="faq__list" data-reveal="0.1">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq__item" key={item.q} data-open={isOpen ? "true" : "false"}>
                <button className="faq__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <h3 style={{ fontSize: "inherit", fontWeight: "inherit" }}>{item.q}</h3>
                  <i aria-hidden="true" />
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
    </section>
  );
}
