import Link from "next/link";
import { featuredProjects, type Project } from "@/data/content";
import { photo } from "@/lib/renders";
import { Button } from "./Button";

/* 2 / 3 / 2 / 3 / 2 rhythm: large, medium, large-tall, wide, large */
const shape = (i: number) => {
  const r = i % 12;
  if (r < 2) return "tile tile--l";
  if (r < 5) return "tile";
  if (r < 7) return "tile tile--l tile--tall";
  if (r < 10) return "tile tile--w";
  return "tile tile--l";
};

export function Tile({ p, i, level = 3, reveal = true }: { p: Project; i: number; level?: 2 | 3; reveal?: boolean }) {
  const img = photo(p.cover);
  const H = level === 2 ? "h2" : "h3";
  return (
    <Link href={`/projects/${p.slug}`} className={shape(i)} data-reveal={reveal ? (i % 3) * 0.08 : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes="(max-width: 991px) 50vw, 720px"
        alt={`${p.name} — ${p.sector.toLowerCase()} visualization`}
        loading={i < 2 ? "eager" : "lazy"}
      />
      <div className="tile__meta">
        <H>{p.name}</H>
        <span>{p.sector}</span>
      </div>
    </Link>
  );
}

export function Grid({ list, level = 3, reveal = true }: { list: Project[]; level?: 2 | 3; reveal?: boolean }) {
  return (
    <div className="portfolio__grid">
      {list.map((p, i) => (
        <Tile key={p.slug} p={p} i={i} level={level} reveal={reveal} />
      ))}
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio" id="work" aria-labelledby="portfolio-title">
      <div className="portfolio__head">
        <div className="slabel slabel--center" data-reveal>
          <span className="slabel__t">Our work</span>
        </div>
        <h2 className="h-64" id="portfolio-title" data-reveal="0.1">
          Featured Projects
        </h2>
      </div>
      <Grid list={featuredProjects} />
      <div className="portfolio__more">
        <Button label="All projects" href="/projects" variant="outline" />
      </div>
    </section>
  );
}
