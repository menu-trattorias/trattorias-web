import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { home, site } from "@/data/content";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.seo.title, template: "%s" },
  description: home.seo.description,
  keywords: ["Varkala", "Kerala", "Trattorias", "Varkala restaurant", "Varkala cliff", "Varkala homestay", "Odayam Beach", "North Cliff Varkala", "Varkala bed and breakfast"],
  openGraph: { type: "website", siteName: "Trattorias Varkala", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#3fa34d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
