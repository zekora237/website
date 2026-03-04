import type { Metadata } from "next";
import { PortfolioContent } from "./PortfolioContent";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Explore ${BRAND.name}'s portfolio of digital projects — websites, mobile apps, business systems, and SaaS platforms built with quality and purpose.`,
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}

