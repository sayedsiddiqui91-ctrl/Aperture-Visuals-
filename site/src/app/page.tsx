import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Advantages from "@/components/Advantages";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { faqs, site, socials } from "@/data/content";

const BASE = "https://aperturevisuals.com";

/* Only facts from the catalogue — no invented ratings or reviews. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${BASE}/#studio`,
      name: site.name,
      description: "Architectural visualization studio: photorealistic renders, cinematic animations and real-time experiences.",
      url: BASE,
      email: site.email,
      telephone: "+8801850355772",
      image: `${BASE}/video/poster-1920.webp`,
      logo: `${BASE}/brand/mark.svg`,
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      areaServed: "Worldwide",
      priceRange: "৳3,000+",
      ...(socials().length ? { sameAs: socials().map((s) => s.href) } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Reveal />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Pricing />
      <Advantages />
      <Cta />
      <Faq />
      <Footer />
    </main>
  );
}
