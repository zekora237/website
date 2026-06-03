import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND } from "@/lib/config";

/** Body & interface text */
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
});

/** Display, headings & the Zekora wordmark */
const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "./fonts/Outfit-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Outfit-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Outfit-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Outfit-Bold.ttf", weight: "700", style: "normal" },
  ],
});

/** Code & technical detail */
const jetbrainsMono = localFont({
  variable: "--font-jbmono",
  display: "swap",
  src: [
    { path: "./fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/JetBrainsMono-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: BRAND.url }],
  creator: BRAND.name,
  publisher: BRAND.name,
  // Keyword strategy: the brand variants come first (so "zekora" alone
  // ranks, not just "zekoratech"), then the geo-anchored phrases that
  // we want to win in both languages, then the categorical terms. We
  // include each major Cameroonian city by name so they have a chance
  // to surface for hyper-local queries like "agence web Douala".
  keywords: [
    // Brand variants — ensure plain "zekora" also matches.
    "Zekora",
    "ZekoraTech",
    "Zekora Tech",
    "zekoratech.com",
    // Local Cameroon SEO — English
    "best software agency in Cameroon",
    "software development Cameroon",
    "web development Cameroon",
    "mobile app developer Cameroon",
    "digital agency Cameroon",
    "Yaoundé software company",
    "Douala web agency",
    "Cameroon SaaS development",
    "best tech company in Cameroon",
    // Local Cameroon SEO — Français
    "agence web Cameroun",
    "création site web Cameroun",
    "développement web Cameroun",
    "développeur application mobile Cameroun",
    "agence digitale Cameroun",
    "agence web Yaoundé",
    "création site web Douala",
    "développement logiciel Cameroun",
    "digitalisation entreprise Cameroun",
    "transformation digitale Afrique",
    // Categorical
    "web development",
    "mobile app development",
    "business digitalization",
    "SaaS development",
    "custom software",
    "digital agency",
    "Next.js agency",
    "Flutter agency",
    "PWA development",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    images: [
      {
        url: "/og-image.png",
        width: 1600,
        height: 900,
        alt: `${BRAND.name} — ${BRAND.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('zekora-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
