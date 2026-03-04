import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { AboutContent } from "./AboutContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.about.meta.title,
    description: t(dict.about.meta.description),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}

