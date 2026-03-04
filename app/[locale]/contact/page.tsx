import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { ContactContent } from "./ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.meta.title,
    description: t(dict.contact.meta.description),
  };
}

export default function ContactPage() {
  return <ContactContent />;
}

