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
    "Zekora is a Cameroon-based digital agency building web platforms, mobile apps, SaaS products and business digitalization for African and global clients. Serving Yaoundé, Douala and all of Cameroon — remote-first, worldwide.",
  /** Contact email */
  email: "zekora237@gmail.com",
  /** Local Cameroon phone in E.164. Update with the real line. */
  phone: "+237657000000",
  /** Domain (no protocol) */
  domain: "zekoratech.com",
  /** Full site URL — canonical (non-www; www redirects here) */
  url: "https://zekoratech.com",
  /** Year the company was established */
  founded: "2024",

  /**
   * Geographic identity — primary headquarters + service area.
   * Used by the LocalBusiness JSON-LD, ContactPoint, and the FAQ schema.
   *
   * Why this matters for SEO: Google's local algorithm needs a verifiable
   * physical anchor (address + geo + country=CM) to surface us for
   * "agence web Cameroun", "best software agency Cameroon", etc.
   *
   * Yaoundé is set as the primary because it is the political capital and
   * most central. If the actual head office moves to Douala (or you open
   * a second one), update `headquarters` and add to `cities`.
   */
  headquarters: {
    city: "Yaoundé",
    region: "Centre",
    country: "Cameroon",
    countryCode: "CM",
    /** Approximate Yaoundé centre. Replace with the real coordinates. */
    latitude: 3.848,
    longitude: 11.5021,
    /** Postal code is optional but boosts LocalBusiness completeness. */
    postalCode: "999",
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
  location: "Yaoundé, Cameroun · Remote-first",

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

