import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "@/data/content";
import { Button } from "@/components/Button";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Page not found — Aperture Visuals", robots: { index: false } };

export default function NotFound() {
  const picks = featuredProjects.slice(0, 3);
  return (
    <main className="page nf">
      <div className="wm" aria-hidden="true" />
      <div className="container nf__inner">
        <div className="slabel">
          <span className="slabel__t">404 · Page not found</span>
        </div>
        <h1 className="h-64">This view hasn&apos;t been rendered yet.</h1>
        <p className="nf__lead">The page may have moved, or the link is mistyped. Here are some places to start:</p>
        <div className="btn-row">
          <Button label="Back to home" href="/" variant="black" />
          <Button label="All projects" href="/projects" variant="outline" />
        </div>
        <ul className="nf__links">
          {picks.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`}>
                {p.name} <span>{p.sector}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
