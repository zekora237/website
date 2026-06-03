import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";
import { i18n } from "@/lib/i18n";
import { blogPosts } from "@/lib/blog";

/**
 * Force the sitemap to be generated at BUILD time and served as a
 * plain static file from Cloudflare's edge.
 *
 * Why: when this route is dynamic (the default), every Googlebot fetch
 * hits the Cloudflare Worker. The Worker response includes a
 * `Vary: rsc, next-router-state-tree, …` header chain and the
 * intermittent set-cookie / content-type wobble of dynamic rendering,
 * which makes Google's strict XML parser report "Impossible de
 * récupérer le sitemap" even though a manual curl looks fine.
 *
 * Static rendering returns the same byte-for-byte XML to every client,
 * served straight from Cloudflare's CDN cache — no Worker invocation,
 * no Vary header, no surprises for crawlers. */
export const dynamic = "force-static";
export const revalidate = false;

/** Build-time anchor so `lastModified` is deterministic across rebuilds. */
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

  // Static pages — one entry per locale, with hreflang alternates
  const pageEntries = pages.flatMap((page) =>
    i18n.locales.map((locale) => ({
      url: `${BRAND.url}/${locale}${page}`,
      lastModified: BUILD_DATE,
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
