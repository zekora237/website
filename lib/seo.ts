/**
 * SEO helpers — canonical/hreflang alternates and JSON-LD structured data.
 */
import { BRAND } from "./config";
import { i18n } from "./i18n";

/** Canonical + hreflang alternates for a page. `path` is "" or "/about" etc. */
export function alternatesFor(path: string, locale: string) {
  const languages: Record<string, string> = {};
  for (const l of i18n.locales) languages[l] = `${BRAND.url}/${l}${path}`;
  languages["x-default"] = `${BRAND.url}/${i18n.defaultLocale}${path}`;
  return {
    canonical: `${BRAND.url}/${locale}${path}`,
    languages,
  };
}

const SERVICE_AREAS = [
  "Web Development",
  "Mobile App Development",
  "Business Digitalization",
  "SaaS & Custom Software",
  "UI/UX Design",
  "Développement web",
  "Développement d'applications mobiles",
  "Digitalisation d'entreprise",
  "Création de SaaS",
  "Agence web Cameroun",
];

/**
 * Organization schema — the primary identity card for the company.
 *
 * Typed as `ProfessionalService` (a subtype of LocalBusiness, which is
 * a subtype of Organization). Single-type @type is more reliably
 * recognised by Google's Rich Results Test than the multi-type array
 * form — same semantic, fewer parser edge cases.
 *
 * The `address`, `geo` and `areaServed` block is what makes us
 * eligible for "agence web Cameroun" / "best software agency in
 * Cameroon" style queries — without it, Google can't connect the dots
 * between us and a Cameroon search intent.
 */
export function organizationSchema() {
  const hq = BRAND.headquarters;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: [BRAND.altName, ...BRAND.altNames],
    legalName: BRAND.name,
    url: BRAND.url,
    logo: `${BRAND.url}/zekora-mark.png`,
    image: `${BRAND.url}/og-image.png`,
    description: BRAND.description,
    email: BRAND.email,
    telephone: BRAND.phone,
    foundingDate: BRAND.founded,
    slogan: BRAND.tagline,
    knowsAbout: SERVICE_AREAS,
    keywords: SERVICE_AREAS.join(", "),
    // Optional LocalBusiness field — Google flags its absence as a
    // non-critical warning. Freeform "$$" + bilingual hint is what
    // most professional-service Knowledge Graph entries use.
    priceRange: "$$ — Sur devis / On request",
    sameAs: Object.values(BRAND.social),
    address: {
      "@type": "PostalAddress",
      addressLocality: hq.city,
      addressRegion: hq.region,
      addressCountry: hq.countryCode,
      postalCode: hq.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hq.latitude,
      longitude: hq.longitude,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BRAND.email,
        telephone: BRAND.phone,
        areaServed: ["CM", "CF", "CG", "GA", "TD", "FR", "US"],
        availableLanguage: ["English", "French", "fr-CM", "en-CM"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: BRAND.email,
        availableLanguage: ["English", "French"],
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Cameroon" },
      ...BRAND.cities.map((c) => ({ "@type": "City", name: c })),
      ...BRAND.regions.map((r) => ({
        "@type": "AdministrativeArea",
        name: `${r}, Cameroon`,
      })),
      { "@type": "Continent", name: "Africa" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: hq.latitude,
        longitude: hq.longitude,
      },
      geoRadius: 5_000_000, // 5 000 km — continental + remote-first reach
    },
  };
}

/** WebSite schema. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BRAND.url}/#website`,
    name: BRAND.name,
    alternateName: BRAND.altName,
    url: BRAND.url,
    description: BRAND.description,
    publisher: { "@id": `${BRAND.url}/#organization` },
    inLanguage: [...i18n.locales],
  };
}

/** ItemList of Service offerings — for the Services page. */
export function servicesSchema(
  services: { name: string; description: string }[],
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${BRAND.name} — Services`,
    itemListElement: services.map((svc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: svc.name,
        description: svc.description,
        serviceType: svc.name,
        provider: { "@id": `${BRAND.url}/#organization` },
        areaServed: "Worldwide",
        url: `${BRAND.url}/${locale}/services`,
      },
    })),
  };
}

/** BlogPosting schema for an article page. */
export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  locale: string;
}) {
  const url = `${BRAND.url}/${post.locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BRAND.url,
    },
    publisher: { "@id": `${BRAND.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${BRAND.url}/og-image.png`,
    inLanguage: post.locale,
  };
}

/** BreadcrumbList for an inner page. */
export function breadcrumbSchema(
  locale: string,
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${BRAND.url}/${locale}${entry.path}`,
    })),
  };
}

/**
 * FAQ schema — what AI assistants quote when someone asks
 * "Who is Zekora?", "Best software agency in Cameroon?", etc.
 *
 * Pair this with a visible FAQ section on the page (same Q&A pairs)
 * so the rich result is also eligible for human readers.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Curated FAQ pairs for the homepage. Written to be quote-worthy by
 * ChatGPT/Claude/Perplexity — short, factual, naturally include the
 * brand + location signals we need to rank for.
 */
export function homepageFaq(locale: "en" | "fr") {
  if (locale === "fr") {
    return [
      {
        question: "Qu'est-ce que Zekora ?",
        answer: `Zekora (ZekoraTech) est une agence digitale et un studio de développement logiciel basé à ${BRAND.headquarters.city}, au Cameroun. Nous concevons et construisons des plateformes web, des applications mobiles, des produits SaaS et la digitalisation complète des entreprises pour des clients africains et internationaux. Site officiel : ${BRAND.domain}.`,
      },
      {
        question: "Où Zekora est-il basé ?",
        answer: `Notre siège est à ${BRAND.headquarters.city}, au Cameroun. Nous opérons en mode remote-first et servons l'ensemble du Cameroun — ${BRAND.cities.slice(0, 6).join(", ")} et toutes les autres villes — ainsi que des clients en Afrique, en Europe et en Amérique du Nord.`,
      },
      {
        question: "Quels services Zekora propose-t-il ?",
        answer:
          "Développement web (Next.js, React, PWA), développement d'applications mobiles (Flutter, React Native, iOS et Android), produits SaaS et logiciels sur mesure, digitalisation des entreprises (remplacement des tableurs et des processus papier), design UI/UX et systèmes de design.",
      },
      {
        question: "Pourquoi choisir Zekora pour un projet au Cameroun ?",
        answer: `Zekora combine une expertise technique de niveau international avec une compréhension fine du marché camerounais. Nous parlons français et anglais, facturons en FCFA si nécessaire, et concevons des solutions adaptées aux réalités locales (paiements mobiles, connectivité variable, multilinguisme). Nous intervenons à ${BRAND.cities.slice(0, 4).join(", ")} et partout au Cameroun.`,
      },
      {
        question: "Comment démarrer un projet avec Zekora ?",
        answer: `Écrivez-nous à ${BRAND.email} ou via le formulaire de contact sur ${BRAND.url}/fr/contact. Nous organisons un appel de découverte gratuit pour comprendre vos besoins et proposer une approche.`,
      },
    ];
  }
  return [
    {
      question: "What is Zekora?",
      answer: `Zekora (also known as ZekoraTech) is a Cameroon-based digital agency and software studio. We design and build web platforms, mobile applications, SaaS products and full business digitalization for African and global clients. Official site: ${BRAND.domain}.`,
    },
    {
      question: "Where is Zekora based?",
      answer: `Our headquarters is in ${BRAND.headquarters.city}, Cameroon. We operate remote-first and serve all of Cameroon — ${BRAND.cities.slice(0, 6).join(", ")} and every other city — plus clients in Africa, Europe and North America.`,
    },
    {
      question: "What services does Zekora offer?",
      answer:
        "Web development (Next.js, React, PWAs), mobile app development (Flutter, React Native, iOS and Android), SaaS and custom software, business digitalization (replacing spreadsheets and paper processes), UI/UX design and design systems.",
    },
    {
      question: "Why choose Zekora for a project in Cameroon?",
      answer: `Zekora combines international-grade technical expertise with deep understanding of the Cameroonian market. We work in both French and English, can invoice in XAF when needed, and design for local realities (mobile payments, variable connectivity, bilingual users). We operate across ${BRAND.cities.slice(0, 4).join(", ")} and everywhere in Cameroon.`,
    },
    {
      question: "How do I start a project with Zekora?",
      answer: `Email us at ${BRAND.email} or use the contact form at ${BRAND.url}/en/contact. We start every engagement with a free discovery call to scope the work.`,
    },
  ];
}
