import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary, i18n, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { postsForLocale } from "@/lib/blog";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

function resolveLocale(raw: string): Locale {
  return (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = await getDictionary(locale);
  return {
    title: dict.blog.meta.title,
    description: dict.blog.meta.description,
    alternates: alternatesFor("/blog", locale),
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = await getDictionary(locale);
  const posts = postsForLocale(locale);

  return (
    <>
      <PageHeader title={dict.blog.header.title} subtitle={dict.blog.header.subtitle} />
      <SectionWrapper>
        {posts.length === 0 ? (
          <p className="text-[15px] text-slate">{dict.blog.noPosts}</p>
        ) : (
          <ul className="mx-auto max-w-3xl divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug} className="py-9 first:pt-0">
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-steel">
                    <time dateTime={post.date}>
                      {formatDate(post.date, locale)}
                    </time>
                    <span>·</span>
                    <span>
                      {dict.blog.readingTime.replace(
                        "{n}",
                        String(post.readingTime)
                      )}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-ink transition-colors sm:text-3xl group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate">
                    {post.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-paper px-2 py-0.5 font-mono text-[11px] text-slate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                    {dict.blog.readMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </SectionWrapper>
    </>
  );
}
