import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zekora — Digital Solutions That Structure & Grow Your Business",
    template: "%s | Zekora",
  },
  description:
    "Zekora builds digital solutions that structure, modernize, and grow businesses. Web development, mobile apps, business digitalization, and SaaS products.",
  keywords: [
    "digital solutions",
    "web development",
    "mobile applications",
    "business digitalization",
    "SaaS",
    "Zekora",
  ],
  authors: [{ name: "Zekora" }],
  openGraph: {
    title: "Zekora — Digital Solutions That Structure & Grow Your Business",
    description:
      "Zekora builds digital solutions that structure, modernize, and grow businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Zekora",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
