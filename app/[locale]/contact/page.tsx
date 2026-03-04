import type { Metadata } from "next";
import { getDictionary, i18n, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { ContactContent } from "./ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (i18n.locales.includes(raw as Locale) ? raw : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.meta.title,
    description: t(dict.contact.meta.description),
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
