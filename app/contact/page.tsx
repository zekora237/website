import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${BRAND.name}. Tell us about your project and we'll help you find the right digital solution.`,
};

export default function ContactPage() {
  return <ContactContent />;
}

