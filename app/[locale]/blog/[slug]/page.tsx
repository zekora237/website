import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, i18n, type Locale } from "@/lib/i18n";
import { alternatesFor, articleSchema } from "@/lib/seo";
import { postBySlug, allBlogSlugs } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";

function resolveLocale(raw: string): Locale {
  return (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export async function generateStaticParams() {
  return allBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const post = postBySlug(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesFor(`/blog/${slug}`, locale),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const dict = await getDictionary(locale);
  const post = postBySlug(slug, locale);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleSchema({ ...post, locale })} />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-border bg-background pb-12 pt-32 lg:pb-16 lg:pt-40">
        <div
          className="pointer-events-none absolute inset-0 bg-grid"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 0%, #000 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 0%, #000 45%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-steel transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.blog.back}
          </Link>
          <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-steel">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span>·</span>
            <span>
              {dict.blog.readingTime.replace("{n}", String(post.readingTime))}
            </span>
            <span>·</span>
            <span>
              {dict.blog.by} {post.author}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.6rem] lg:text-[3rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-paper px-2 py-0.5 font-mono text-[11px] text-slate"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="bg-background py-12 lg:py-16">
        <div
          className="prose-zekora mx-auto max-w-prose px-5 sm:px-6 lg:px-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mx-auto mt-12 max-w-prose px-5 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 border-t border-border pt-8 text-[13px] font-semibold text-brand"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {dict.blog.back}
          </Link>
        </div>
      </article>
    </>
  );
}
