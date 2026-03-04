import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { ServicesContent } from "./ServicesContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.services.meta.title,
    description: t(dict.services.meta.description),
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}

