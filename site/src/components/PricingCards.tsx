"use client";
import { useEffect, useState } from "react";
import { pricing } from "@/data/content";

type Currency = (typeof pricing.currencies)[number];
type Rates = { date: string; source: "live" | "fallback"; perBDT: Record<string, number> };

const EURO = new Set(["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"]);
const STORE = "av-currency";

/** Pick a sensible default from the browser locale — no IP geolocation. */
function guessCurrency(): Currency {
  try {
    const saved = localStorage.getItem(STORE) as Currency | null;
    if (saved && (pricing.currencies as readonly string[]).includes(saved)) return saved;
  } catch {}
  const region = (navigator.language.split("-")[1] || "").toUpperCase();
  if (region === "AU") return "AUD";
  if (region === "GB") return "GBP";
  if (region === "US") return "USD";
  if (EURO.has(region)) return "EUR";
  return "BDT";
}

// en-GB symbols are unambiguous across the offered currencies: US$24, A$34, £18, €21
const fmt = (amount: number, currency: Currency) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0, currencyDisplay: "symbol" }).format(amount);

export default function PricingCards({ rates }: { rates: Rates }) {
  const [cur, setCur] = useState<Currency>("BDT");
  useEffect(() => setCur(guessCurrency()), []);
  const choose = (c: Currency) => {
    setCur(c);
    try {
      localStorage.setItem(STORE, c);
    } catch {}
  };

  const converted = (bdt: number | null) => {
    if (bdt === null || cur === "BDT") return null;
    const r = rates.perBDT[cur];
    return r ? `≈ ${fmt(bdt * r, cur)}` : null;
  };

  return (
    <>
      <div className="cur" role="group" aria-label="Show indicative prices in">
        <span className="cur__label">Show in</span>
        {pricing.currencies.map((c) => (
          <button key={c} type="button" className="cur__btn" aria-pressed={cur === c} onClick={() => choose(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="pricing__grid">
        {pricing.plans.map((p, i) => {
          const conv = converted(p.amountBDT);
          return (
            <article className={`plan plan--${p.tone}`} key={p.name} data-reveal={i * 0.08}>
              <div className="plan__bar" aria-hidden="true" />
              <h3 className="plan__name">{p.name}</h3>
              <div className="plan__price">{p.price}</div>
              <span className="plan__unit">
                {p.unit}
                <span className="plan__conv" aria-live="polite">
                  {conv ? `${conv} ${p.unit}` : " "}
                </span>
              </span>
              <ul className="plan__list">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="pricing__note" data-reveal>
        {pricing.note}
        {cur !== "BDT" && (
          <>
            <br />
            {pricing.conversionNote} Rates of {rates.date}
            {rates.source === "fallback" ? " (cached)" : ""}.
          </>
        )}
      </p>
    </>
  );
}
