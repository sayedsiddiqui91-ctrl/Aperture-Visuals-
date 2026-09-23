import { pricing } from "@/data/content";
import { Button } from "./Button";

/** The catalogue's pricing page: label + rule, two-line intro, three cards with coloured top bars and diamond bullets. */
export default function Pricing() {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="wm" aria-hidden="true" />
      <div className="container">
        <div className="slabel" data-reveal>
          <h2 id="pricing-title">{pricing.label}</h2>
          <p>
            {pricing.intro[0]}
            <br />
            {pricing.intro[1]}
          </p>
        </div>
        <div className="pricing__grid">
          {pricing.plans.map((p, i) => (
            <article className={`plan plan--${p.tone}`} key={p.name} data-reveal={i * 0.08}>
              <div className="plan__bar" aria-hidden="true" />
              <h3 className="plan__name">{p.name}</h3>
              <div className="plan__price">{p.price}</div>
              <span className="plan__unit">{p.unit}</span>
              <ul className="plan__list">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="pricing__note" data-reveal>
          {pricing.note}
        </p>
        <div className="pricing__cta" data-reveal>
          <Button label="Get a tailored quotation" href="/#contact" variant="outline" />
        </div>
      </div>
    </section>
  );
}
