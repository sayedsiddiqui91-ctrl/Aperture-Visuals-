import type { Metadata, Viewport } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

const sans = Poppins({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600"] });
const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aperturevisuals.com"),
  title: "Aperture Visuals — Architectural visualization studio",
  description:
    "Photorealistic 3D renders, cinematic animations and real-time experiences for architects, developers and designers. Dhaka, available worldwide.",
  openGraph: {
    title: "Aperture Visuals",
    description: "Bring your architecture to life with cinematic 3D visualization.",
    images: ["/video/poster.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#082c2e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
