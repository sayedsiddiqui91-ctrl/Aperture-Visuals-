import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import WhatsAppChooser from "@/components/WhatsAppChooser";
import { site } from "@/data/content";
import { qrSvg } from "@/lib/qr";

// One family for everything; hierarchy comes from size, weight and tracking.
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aperturevisuals.com"),
  title: "Aperture Visuals — Architectural visualization studio",
  description:
    "Photorealistic 3D renders, cinematic animations and real-time experiences for architects, developers and designers. Dhaka, available worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aperture Visuals",
    description: "Bring your architecture to life with cinematic 3D visualization.",
    images: ["/video/poster-1920.webp"],
    type: "website",
    siteName: "Aperture Visuals",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#082c2e", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const waQr = await qrSvg(site.whatsapp); // encodes the wa.me link, which a phone camera opens in the app
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        {/* reveal animations only hide content when JS is actually running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add(\"js\")" }} />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        <WhatsAppChooser qr={waQr} />
      </body>
    </html>
  );
}
