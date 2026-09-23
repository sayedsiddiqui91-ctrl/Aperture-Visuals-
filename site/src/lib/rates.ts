import "server-only";

/**
 * Daily BDT exchange rates from the keyless currency-api (github.com/fawazahmed0/exchange-api,
 * listed in public-apis). Fetched on the server and cached for a day, so visitors never call a
 * third party and the page still renders if both endpoints are down.
 */
export type Rates = { date: string; source: "live" | "fallback"; perBDT: Record<string, number> };

const ENDPOINTS = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/bdt.min.json",
  "https://latest.currency-api.pages.dev/v1/currencies/bdt.min.json",
];
const WANT = ["usd", "aud", "gbp", "eur"] as const;

// Last known reference rates (2026-09-22) — only used if every endpoint fails.
const FALLBACK: Rates = {
  date: "2026-09-22",
  source: "fallback",
  perBDT: { BDT: 1, USD: 0.008137, AUD: 0.011426, GBP: 0.00608, EUR: 0.007091 },
};

export async function getRates(): Promise<Rates> {
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const json = (await res.json()) as { date?: string; bdt?: Record<string, number> };
      if (!json.bdt || WANT.some((c) => typeof json.bdt![c] !== "number" || !(json.bdt![c] > 0))) continue;
      const perBDT: Record<string, number> = { BDT: 1 };
      for (const c of WANT) perBDT[c.toUpperCase()] = json.bdt[c];
      return { date: json.date ?? FALLBACK.date, source: "live", perBDT };
    } catch {
      // try the next endpoint
    }
  }
  return FALLBACK;
}
