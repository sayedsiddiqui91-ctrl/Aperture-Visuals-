import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/content";

export const metadata: Metadata = { title: "Projects — Aperture Visuals" };

export default function ProjectsPage() {
  return (
    <main className="page">
      <Reveal />
      <div className="container plist">
        <div className="plist__head">
          <h1 className="h-64" data-reveal>
            Projects
          </h1>
          <p className="t-small" style={{ color: "var(--ink-2)" }} data-reveal="0.1">
            {projects.length} projects · exterior, interior, healthcare, retail, hospitality, masterplan
          </p>
        </div>
      </div>
      <Portfolio all />
      <div style={{ height: 96 }} />
      <Footer />
    </main>
  );
}
