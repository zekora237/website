import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services",
  description: `${BRAND.name} offers web development, mobile applications, business digitalization, and SaaS & custom systems. Discover how we can help your business grow.`,
};

export default function ServicesPage() {
  return <ServicesContent />;
}

