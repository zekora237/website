import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";
import { i18n } from "@/lib/i18n";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

  // Static pages — one entry per locale, with hreflang alternates
  const pageEntries = pages.flatMap((page) =>
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

  // Blog posts — one entry per post, with alternates for the same slug in other locales
  const postEntries = blogPosts.map((post) => ({
    url: `${BRAND.url}/${post.locale}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: Object.fromEntries(
        blogPosts
          .filter((other) => other.slug === post.slug)
          .map((other) => [
            other.locale,
            `${BRAND.url}/${other.locale}/blog/${other.slug}`,
          ])
      ),
    },
  }));

  return [...pageEntries, ...postEntries];
}
