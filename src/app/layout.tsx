import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { home, site } from "@/data/content";
import { siteGraph } from "@/lib/seo";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.seo.title, template: "%s" },
  description: home.seo.description,
  applicationName: "Trattorias Varkala",
  keywords: home.seo.keywords,
  authors: [{ name: "Trattorias Varkala" }],
  creator: "Trattorias Varkala",
  publisher: "Trattorias Varkala",
  category: "travel",
  verification: { google: "njmXnED0SyTcHNj_RujkvtRChAfDF8AGm6WS_Xd16n8" },
  formatDetection: { telephone: true, address: true, email: false },
  openGraph: { type: "website", siteName: "Trattorias Varkala", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "geo.region": "IN-KL", "geo.placename": "Varkala, Kerala", "geo.country": "IN" },
};

export const viewport: Viewport = { themeColor: "#3fa34d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }} />
        {children}
      </body>
    </html>
  );
}
