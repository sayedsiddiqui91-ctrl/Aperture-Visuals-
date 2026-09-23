"use client";
import { useState } from "react";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        {/* label sits above both columns so the heading and the first question start on the same line */}
        <div className="slabel" data-reveal>
          <span className="slabel__t">FAQs</span>
        </div>
      </div>
      <div className="container faq__grid">
        <h2 className="h-48 faq__title" id="faq-title" data-reveal="0.1">
          {faqs.title}
        </h2>
        <ul className="faq__list" data-reveal="0.1">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq__item" key={item.q} data-open={isOpen ? "true" : "false"}>
                {/* accordion pattern: the button lives inside the heading, not the other way round */}
                <h3 className="faq__h">
                  <button className="faq__q" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {item.q}
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={!isOpen}>
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
