import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${BRAND.name}'s mission, vision, core values, and approach to building digital solutions that structure and grow businesses.`,
};

export default function AboutPage() {
  return <AboutContent />;
}

