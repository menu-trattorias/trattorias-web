import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/tranquil/", "/restaurant/", "/holiday-home/", "/contact/"].map((p) => ({
    url: site.url + p,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
