import type { MetadataRoute } from "next";
import { SITEMAP_PATHS } from "@/data/routes";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from "@/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { guideArticles } from "@/data/guides";

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

  const standard = SITEMAP_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: languages(path) },
    })),
  );
  const articles = guideArticles.map((article) => {
    const counterpart = guideArticles.find((candidate) => candidate.locale !== article.locale && candidate.key === article.key)!;
    const fr = article.locale === "fr" ? article : counterpart;
    const en = article.locale === "en" ? article : counterpart;
    return { url: absoluteUrl(article.locale, `/guides/${article.slug}`), lastModified: article.modifiedAt, priority: 0.8, alternates: { languages: { "fr-MA": absoluteUrl("fr", `/guides/${fr.slug}`), "en-MA": absoluteUrl("en", `/guides/${en.slug}`), "x-default": absoluteUrl("fr", `/guides/${fr.slug}`) } } };
  });
  return [...standard, ...articles];
}
