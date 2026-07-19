import type { MetadataRoute } from "next";
import { SITEMAP_PATHS } from "@/data/routes";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from "@/i18n/config";
import { absoluteUrl } from "@/lib/metadata";

/** Required so `output: "export"` renders the sitemap at build time. */
export const dynamic = "force-static";

/**
 * Generated from the route registry so French and English can never drift.
 * Each entry carries the full hreflang cluster, which is what tells search
 * engines the two URLs are translations rather than duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (path: string) =>
    Object.fromEntries([
      ...LOCALES.map((locale) => [LOCALE_TAGS[locale], absoluteUrl(locale, path)] as const),
      ["x-default", absoluteUrl(DEFAULT_LOCALE, path)] as const,
    ]);

  return SITEMAP_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: languages(path) },
    })),
  );
}
