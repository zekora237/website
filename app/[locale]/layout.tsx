import type { Metadata } from "next";
import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { BRAND } from "@/lib/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DictionaryProvider } from "@/lib/dictionary-context";
import { LocaleProvider } from "@/lib/locale-context";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: {
      default: `${BRAND.name} — ${dict.home.cta.title}`,
      template: `%s | ${BRAND.name}`,
    },
    description: BRAND.description,
    keywords: [
      "digital solutions",
      "web development",
      "mobile applications",
      "business digitalization",
      "SaaS",
      BRAND.name,
    ],
    authors: [{ name: BRAND.name }],
    openGraph: {
      title: `${BRAND.name} — ${BRAND.tagline}`,
      description: BRAND.description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: BRAND.name,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale}>
      <DictionaryProvider dictionary={dictionary}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </DictionaryProvider>
    </LocaleProvider>
  );
}

