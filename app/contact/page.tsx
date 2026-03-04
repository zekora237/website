import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Zekora. Tell us about your project and we'll help you find the right digital solution.",
};

export default function ContactPage() {
  return <ContactContent />;
}

