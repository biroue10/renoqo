export const LOCALES = ["fr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/**
 * Locales announced in the switcher but not translated yet. They render as
 * disabled entries; the "soon" wording comes from the active dictionary.
 */
export const PLANNED_LOCALES = [{ code: "ar", label: "العربية" }] as const;

/** BCP 47 tags used by `hreflang`, Open Graph and JSON-LD. */
export const LOCALE_TAGS: Record<Locale, string> = { fr: "fr-MA", en: "en-MA" };

/** Underscore variant expected by Open Graph. */
export const OG_LOCALES: Record<Locale, string> = { fr: "fr_MA", en: "en_MA" };

export const LOCALE_LABELS: Record<Locale, string> = { fr: "Français", en: "English" };

/** Two-letter badge shown in the compact switcher. */
export const LOCALE_BADGES: Record<Locale, string> = { fr: "FR", en: "EN" };

export const LOCALE_STORAGE_KEY = "renoqo_locale";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
