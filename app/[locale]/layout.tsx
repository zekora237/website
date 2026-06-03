import type { Metadata } from "next";
import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { BRAND } from "@/lib/config";
import {
  alternatesFor,
  organizationSchema,
  websiteSchema,
  faqSchema,
  homepageFaq,
} from "@/lib/seo";
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

/**
 * Locale-tuned title + description.
 *
 * Two goals at once:
 *  1. Win brand queries — both "zekora" and "zekoratech" point here.
 *     The title includes the bare brand and the domain-matched variant.
 *  2. Win local queries — both versions name Cameroon and a city in
 *     the description so Google has unambiguous geo signal even before
 *     it reads the JSON-LD address.
 */
function localeMetadataCopy(locale: Locale) {
  if (locale === "fr") {
    return {
      title: `${BRAND.name} (${BRAND.altName}) — Agence digitale & développement logiciel au Cameroun`,
      description: `${BRAND.name} est une agence digitale basée à ${BRAND.headquarters.city}, au Cameroun. Création de sites web, applications mobiles, SaaS et digitalisation d'entreprise — pour Yaoundé, Douala et toute l'Afrique. Travail à distance, qualité premium.`,
    };
  }
  return {
    title: `${BRAND.name} (${BRAND.altName}) — Software Agency & Digital Studio in Cameroon`,
    description: `${BRAND.name} is a Cameroon-based digital agency building web platforms, mobile apps, SaaS products and end-to-end business digitalization. Serving Yaoundé, Douala and all of Cameroon — remote-first, premium quality.`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const copy = localeMetadataCopy(locale);
  return {
    title: {
      default: copy.title,
      template: `%s | ${BRAND.name}`,
    },
    description: copy.description,
    alternates: alternatesFor("", locale),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${BRAND.url}/${locale}`,
      type: "website",
      // Use the regional locale (fr_CM / en_CM) when supported so OG
      // platforms surface us as a Cameroon-region site. fr_FR / en_US
      // are kept as the canonical fallback OG locales.
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["fr_CM", "en_US"] : ["en_GB", "fr_FR"],
      siteName: BRAND.name,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
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
        {/* Three structured-data blocks site-wide:
         *   1. Organization / ProfessionalService — identity + LocalBusiness signals
         *   2. WebSite — sitelinks + brand-name discovery
         *   3. FAQPage — quote-worthy answers for AI assistants. Without
         *      a visible FAQ section yet, the schema alone still gives
         *      ChatGPT/Claude factual passages to cite when summarising us. */}
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            faqSchema(homepageFaq(locale)),
          ]}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </DictionaryProvider>
    </LocaleProvider>
  );
}
