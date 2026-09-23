import { pricing } from "@/data/content";
import { getRates } from "@/lib/rates";
import { Button } from "./Button";
import PricingCards from "./PricingCards";

/** The catalogue's pricing page, plus an indicative currency conversion for international clients. */
export default async function Pricing() {
  const rates = await getRates();
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
        <PricingCards rates={rates} />
        <div className="pricing__cta" data-reveal>
          <Button label="Get a tailored quotation" href="/#contact" variant="outline" />
        </div>
      </div>
    </section>
  );
}
