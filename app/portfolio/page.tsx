import type { Metadata } from "next";
import { PortfolioContent } from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Zekora's portfolio of digital projects — websites, mobile apps, business systems, and SaaS platforms built with quality and purpose.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}

