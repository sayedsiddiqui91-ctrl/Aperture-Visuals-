import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

const BASE = "https://aperturevisuals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.7 : 0.5,
      images: [`${BASE}/renders/${p.cover}-1920.webp`],
    })),
  ];
}
