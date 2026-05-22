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
];

/** Organization schema — identifies the company to search engines. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: BRAND.altName,
    legalName: BRAND.name,
    url: BRAND.url,
    logo: `${BRAND.url}/zekora-mark.png`,
    image: `${BRAND.url}/og-image.png`,
    description: BRAND.description,
    email: BRAND.email,
    foundingDate: BRAND.founded,
    slogan: BRAND.tagline,
    knowsAbout: SERVICE_AREAS,
    areaServed: { "@type": "Place", name: "Worldwide" },
    keywords: SERVICE_AREAS.join(", "),
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
