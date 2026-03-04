import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Zekora offers web development, mobile applications, business digitalization, and SaaS & custom systems. Discover how we can help your business grow.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}

