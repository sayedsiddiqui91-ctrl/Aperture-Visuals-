import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans, Geist_Mono, Architects_Daughter, Italiana } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"], style: ["normal", "italic"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const hand = Architects_Daughter({ subsets: ["latin"], weight: "400", variable: "--font-hand" });
const brand = Italiana({ subsets: ["latin"], weight: "400", variable: "--font-brand" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aperturevisuals.com"),
  title: "Aperture Visuals – Visualizing spaces, inspiring reality",
  description:
    "Architectural visualization studio in Dhaka, available worldwide. Photorealistic renders, cinematic animations and real-time experiences that bring architectural ideas to life.",
  openGraph: {
    title: "Aperture Visuals",
    description: "Architectural visualization — visualizing spaces, inspiring reality.",
    images: ["/renders/breeze-exterior-1920.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#eadfc9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable} ${brand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
