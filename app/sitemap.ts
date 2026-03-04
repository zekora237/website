import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";
import { i18n } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const pages = ["", "/about", "/services", "/portfolio", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
