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

export default function Page() {
  return (
    <main>
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
