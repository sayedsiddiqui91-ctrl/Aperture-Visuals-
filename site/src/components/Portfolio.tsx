import Link from "next/link";
import { featuredProjects, projects, type Project } from "@/data/content";
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

export function Tile({ p, i }: { p: Project; i: number }) {
  const img = photo(p.cover);
  return (
    <Link href={`/projects/${p.slug}`} className={shape(i)} data-reveal={(i % 3) * 0.08}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes="(max-width: 991px) 50vw, 720px"
        alt={`${p.name} — ${p.sector.toLowerCase()} visualization`}
        loading={i < 2 ? "eager" : "lazy"}
      />
      <div className="tile__meta">
        <h2>{p.name}</h2>
        <span>{p.location}</span>
      </div>
    </Link>
  );
}

export default function Portfolio({ all = false }: { all?: boolean }) {
  const list = all ? projects : featuredProjects;
  return (
    <section className="portfolio" id="work" aria-labelledby="portfolio-title">
      {!all && (
        <div className="portfolio__head">
          <div className="slabel slabel--center" data-reveal>
            <span className="slabel__t">Our work</span>
          </div>
          <h2 className="h-64" id="portfolio-title" data-reveal="0.1">
            Featured Projects
          </h2>
        </div>
      )}
      <div className="portfolio__grid">
        {list.map((p, i) => (
          <Tile key={p.slug} p={p} i={i} />
        ))}
      </div>
      {!all && (
        <div className="portfolio__more">
          <Button label="All projects" href="/projects" variant="outline" />
        </div>
      )}
    </section>
  );
}
