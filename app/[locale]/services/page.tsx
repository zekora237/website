import type { Metadata } from "next";
import { getDictionary, i18n, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { alternatesFor, servicesSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesContent } from "./ServicesContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.services.meta.title,
    description: t(dict.services.meta.description),
    alternates: alternatesFor("/services", locale),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const d = dict.services.detail;
  const services = [d.webDev, d.mobile, d.digital, d.saas].map((s) => ({
    name: s.title,
    description: s.solution,
  }));

  return (
    <>
      <JsonLd data={servicesSchema(services, locale)} />
      <ServicesContent />
    </>
  );
}
