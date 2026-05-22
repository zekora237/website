import type { Metadata } from "next";
import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { BRAND } from "@/lib/config";
import { alternatesFor, organizationSchema, websiteSchema } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { DictionaryProvider } from "@/lib/dictionary-context";
import { LocaleProvider } from "@/lib/locale-context";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

function resolveLocale(raw: string): Locale {
  return (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  return {
    title: {
      default: `${BRAND.name} — ${BRAND.tagline}`,
      template: `%s | ${BRAND.name}`,
    },
    description: BRAND.description,
    alternates: alternatesFor("", locale),
    openGraph: {
      title: `${BRAND.name} — ${BRAND.tagline}`,
      description: BRAND.description,
      url: `${BRAND.url}/${locale}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: BRAND.name,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dictionary = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale}>
      <DictionaryProvider dictionary={dictionary}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </DictionaryProvider>
    </LocaleProvider>
  );
}
