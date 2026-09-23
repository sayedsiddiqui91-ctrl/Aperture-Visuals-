"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { projects, type Sector } from "@/data/content";
import { Grid } from "./Portfolio";

const sectors = [...new Set(projects.map((p) => p.sector))] as Sector[];

/** Sector chips + grid. The filter lives in ?type= so filtered views can be linked and shared. */
export default function ProjectsBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get("type");
  const active = sectors.find((s) => s === raw) ?? null;
  const list = active ? projects.filter((p) => p.sector === active) : projects;

  const select = (s: Sector | null) => router.replace(s ? `/projects?type=${encodeURIComponent(s)}` : "/projects", { scroll: false });

  return (
    <>
      <div className="container">
        <div className="filters" role="group" aria-label="Filter projects by sector">
          <button type="button" className="chip" aria-pressed={!active} onClick={() => select(null)}>
            All <span>{projects.length}</span>
          </button>
          {sectors.map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={active === s} onClick={() => select(s)}>
              {s} <span>{projects.filter((p) => p.sector === s).length}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {list.length} {active ? active.toLowerCase() : ""} projects
        </p>
      </div>
      <section className="portfolio portfolio--all" aria-label="Projects">
        {/* tiles mount on filter changes, after the page-load reveal has run — so no reveal here */}
        <Grid list={list} level={2} reveal={false} />
      </section>
    </>
  );
}
