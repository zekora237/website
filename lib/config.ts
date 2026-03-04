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
  /** Primary tagline */
  tagline: "Digital Solutions That Structure & Grow Your Business",
  /** Short description used in metadata & footer */
  description:
    "Zekora builds digital solutions that structure, modernize, and grow businesses. Web development, mobile apps, business digitalization, and SaaS products.",
  /** Contact email */
  email: "contact@zekora.com",
  /** Website domain (no protocol) */
  domain: "zekora.com",
  /** Full site URL */
  url: "https://zekora.com",
  /** Location */
  location: "Global — Remote First",
} as const;

/**
 * Replace `{brand}` and `{year}` placeholders in a translation string.
 */
export function t(str: string): string {
  return str
    .replace(/\{brand\}/g, BRAND.name)
    .replace(/\{year\}/g, new Date().getFullYear().toString());
}

