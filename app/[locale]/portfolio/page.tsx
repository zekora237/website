import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { t } from "@/lib/config";
import { PortfolioContent } from "./PortfolioContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.portfolio.meta.title,
    description: t(dict.portfolio.meta.description),
  };
}

export default function PortfolioPage() {
  return <PortfolioContent />;
}

