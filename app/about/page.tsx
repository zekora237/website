import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Zekora's mission, vision, core values, and approach to building digital solutions that structure and grow businesses.",
};

export default function AboutPage() {
  return <AboutContent />;
}

