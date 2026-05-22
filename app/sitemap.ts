import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";
import { i18n } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/portfolio", "/contact"];

  return pages.flatMap((page) =>
    i18n.locales.map((locale) => ({
      url: `${BRAND.url}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${BRAND.url}/${l}${page}`])
        ),
      },
    }))
  );
}
