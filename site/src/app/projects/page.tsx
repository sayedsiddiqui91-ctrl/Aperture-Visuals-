import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import { Grid } from "@/components/Portfolio";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Projects — Aperture Visuals",
  description: "Exterior, interior, healthcare, retail, hospitality and masterplan visualization by Aperture Visuals, Dhaka.",
  alternates: { canonical: "/projects" },
};

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
            {projects.length} projects across exterior, interior, healthcare, retail, hospitality and masterplan work
          </p>
        </div>
      </div>
      {/* the unfiltered grid is the server-rendered fallback until search params are available */}
      <Suspense fallback={<section className="portfolio portfolio--all" aria-label="Projects"><Grid list={projects} level={2} reveal={false} /></section>}>
        <ProjectsBrowser />
      </Suspense>
      <div style={{ height: 96 }} />
      <Footer />
    </main>
  );
}
