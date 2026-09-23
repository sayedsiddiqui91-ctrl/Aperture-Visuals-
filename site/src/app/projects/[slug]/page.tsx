import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/data/content";
import { photo } from "@/lib/renders";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/Button";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  return { title: p ? `${p.name} — Aperture Visuals` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const cover = photo(p.cover);
  const nextCover = photo(next.cover);

  return (
    <main className="page">
      <Reveal />
      <section className="phero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover.src} srcSet={cover.srcSet} sizes="100vw" alt={p.name} fetchPriority="high" />
        <div className="hero__overlay" />
        <div className="phero__content">
          <h1 className="h-64">{p.name}</h1>
          <div className="phero__meta">
            <div>
              <span>Location</span>
              {p.location}
            </div>
            <div>
              <span>Sector</span>
              {p.sector}
            </div>
            <div>
              <span>Service</span>
              {p.service}
            </div>
            <div>
              <span>Year</span>
              {p.year}
            </div>
          </div>
        </div>
      </section>

      <div className="container pintro">
        <h2 className="h-32" data-reveal>
          {p.intro}
        </h2>
        <div className="pintro__body" data-reveal="0.1">
          {p.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>

      <div className="pgallery">
        {p.gallery.map((k, i) => {
          const img = photo(k);
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={k} src={img.src} srcSet={img.srcSet} sizes="100vw" alt={`${p.name} — image ${i + 1}`} loading="lazy" data-reveal />
          );
        })}
      </div>

      <div className="container pnext">
        <span className="t-label">Next project</span>
        <Link href={`/projects/${next.slug}`} className="h-48">
          {next.name}
        </Link>
        <Link href={`/projects/${next.slug}`} className="tile tile--l" style={{ width: "min(714px, 100%)", aspectRatio: "714 / 420" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nextCover.src} srcSet={nextCover.srcSet} sizes="720px" alt="" loading="lazy" />
          <div className="tile__meta">
            <h2>{next.name}</h2>
            <span>{next.location}</span>
          </div>
        </Link>
        <Button label="All projects" href="/projects" variant="outline" />
      </div>
      <Footer />
    </main>
  );
}
