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
  /** Alternate name — matches the domain, helps "zekora tech" searches */
  altName: "Zekora Tech",
  /** Primary tagline */
  tagline: "Digital Solutions That Structure & Grow Your Business",
  /** Short description used in metadata & footer */
  description:
    "Zekora builds digital solutions that structure, modernize, and grow businesses. Web development, mobile apps, business digitalization, and SaaS products.",
  /** Contact email */
  email: "zekora237@gmail.com",
  /** Website domain (no protocol) */
  domain: "zekoratech.com",
  /** Full site URL — canonical (non-www; www redirects here) */
  url: "https://zekoratech.com",
  /** Location */
  location: "Global — Remote First",
  /** Year the company was established */
  founded: "2024",
} as const;

/**
 * Replace `{brand}` and `{year}` placeholders in a translation string.
 */
export function t(str: string): string {
  return str
    .replace(/\{brand\}/g, BRAND.name)
    .replace(/\{year\}/g, new Date().getFullYear().toString());
}

