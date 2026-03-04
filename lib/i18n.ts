export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

/**
 * Load dictionary for a given locale.
 * Uses dynamic import so only the needed locale is bundled per page.
 */
const dictionaries = {
  en: () => import("@/lib/dictionaries/en.json").then((m) => m.default),
  fr: () => import("@/lib/dictionaries/fr.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

