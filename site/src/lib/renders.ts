import manifest from "@/data/renders.json";

export type RenderKey = keyof typeof manifest;

export const ratio = (key: string) => (manifest as Record<string, number>)[key] ?? 1.5;

export const photo = (key: string) => ({
  src: `/renders/${key}-1920.webp`,
  srcSet: `/renders/${key}-960.webp 960w, /renders/${key}-1920.webp 1920w`,
});

