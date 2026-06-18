/**
 * Zekora — Brand & Site Configuration
 *
 * All brand-related constants are defined here.
 * If the company name changes, update this single file.
 */

export const BRAND = {
  /** Full company name (mixed case) */
  name: "Zekora",
  /** Uppercase version used in logo / navbar */
  nameUpper: "ZEKORA",
  /** Alternate name — matches the domain, helps "zekora tech" / "zekoratech" searches */
  altName: "ZekoraTech",
  /** Secondary alternates — every form a user might type into Google */
  altNames: ["Zekora Tech", "ZekoraTech", "Zekora.tech", "Zekoratech"],
  /** Primary tagline (EN). The French tagline lives in the dictionary. */
  tagline: "Digital Solutions That Structure & Grow Your Business",
  /** Short description used in metadata & footer (EN baseline) */
  description:
    "Zekora is a Cameroon-based digital agency building web platforms, mobile apps, SaaS products and business digitalization for African and global clients. Remote-first across Cameroon — serving Yaoundé, Douala, Bafoussam, Bamenda, Garoua and every other city.",
  /** Contact email */
  email: "contact@zekoratech.com",
  /** Local Cameroon phone in E.164 format. */
  phone: "+237657675194",
  /** Domain (no protocol) */
  domain: "zekoratech.com",
  /** Full site URL — canonical (non-www; www redirects here) */
  url: "https://zekoratech.com",
  /** Year the company was established */
  founded: "2026",

  /**
   * Geographic identity — country presence + service area.
   * Used by the LocalBusiness JSON-LD, ContactPoint, and the FAQ schema.
   *
   * Zekora operates **remote-first across Cameroon**, not from a specific
   * city office. The `city` / `region` / `postalCode` fields are therefore
   * left intentionally empty — consumers (schema, FAQ, llms.txt, page
   * metadata) check for non-empty values before naming a locality, so we
   * never advertise a headquarters that doesn't exist.
   *
   * If a registered physical office is opened later, fill in the city /
   * region / postalCode and the schema will pick them up automatically.
   *
   * `latitude` / `longitude` use the geographic centre of Cameroon
   * (~ 5.7°N, 12.6°E) so Google still has a valid GeoCoordinates anchor
   * for "near me" / map-pack distance calculations.
   */
  headquarters: {
    city: "",
    region: "",
    country: "Cameroon",
    countryCode: "CM",
    latitude: 5.696,
    longitude: 12.605,
    postalCode: "",
  },
  /**
   * Service area — every city / region we explicitly target for SEO.
   * These show up in the LocalBusiness `areaServed`, in the page copy,
   * and in the keyword set. Order matters: most-searched first.
   */
  cities: [
    "Yaoundé",
    "Douala",
    "Bafoussam",
    "Bamenda",
    "Garoua",
    "Maroua",
    "Ngaoundéré",
    "Bertoua",
    "Buea",
    "Limbé",
    "Kribi",
    "Edéa",
    "Foumban",
    "Dschang",
  ],
  regions: [
    "Centre",
    "Littoral",
    "Ouest",
    "Nord-Ouest",
    "Sud-Ouest",
    "Adamaoua",
    "Nord",
    "Extrême-Nord",
    "Est",
    "Sud",
  ],
  /** Display-friendly location string for footers etc. */
  location: "Cameroun · Remote-first",

  /**
   * `sameAs` profile URLs. Filling these in is the single biggest off-page
   * SEO win we can make from on-page work — it links Zekora's identity
   * across the web for Google's Knowledge Graph. Replace placeholders
   * with real URLs as profiles are created.
   */
  social: {
    linkedin: "https://www.linkedin.com/company/zekora",
    twitter: "https://x.com/zekoratech",
    github: "https://github.com/zekoratech",
    facebook: "https://www.facebook.com/zekoratech",
    instagram: "https://www.instagram.com/zekoratech",
  },
} as const;

/**
 * Replace `{brand}` and `{year}` placeholders in a translation string.
 */
export function t(str: string): string {
  return str
    .replace(/\{brand\}/g, BRAND.name)
    .replace(/\{year\}/g, new Date().getFullYear().toString());
}

