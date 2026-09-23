import SmoothScroll from "@/components/SmoothScroll";
import Chrome from "@/components/Chrome";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Letter from "@/components/Letter";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { OverlayProvider } from "@/components/Overlay";

export default function Page() {
  return (
    <OverlayProvider>
      <SmoothScroll />
      <Loader />
      <Chrome />
      <Nav />
      <main>
        <Hero />
        <Story />
        <div className="after">
          <Letter />
          <Process />
          <Pricing />
          <Faq />
          <Footer />
        </div>
      </main>
    </OverlayProvider>
  );
}
