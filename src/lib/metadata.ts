import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, OG_LOCALES, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/locale-path";
import { getDictionary } from "@/i18n/get-dictionary";
import type { GuideArticle } from "@/content/guides/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://renoqo.com";

/** The site is exported with `trailingSlash: true`; canonicals must match. */
export const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export const absoluteUrl = (locale: Locale, path: string) =>
  `${SITE_URL.replace(/\/$/, "")}${withTrailingSlash(localizedPath(locale, path))}`;

/**
 * Canonical plus the full hreflang cluster. Every page is declared in both
 * languages, with French as `x-default` since it is the primary market.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const code of LOCALES) languages[LOCALE_TAGS[code]] = absoluteUrl(code, path);
  languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);
  return { canonical: absoluteUrl(locale, path), languages };
}

type PageMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /**
   * Skips the `%s | Renoqo` template. Use when the title already names Renoqo,
   * so the suffix would only duplicate the brand and push the title past the
   * ~60 characters Google shows before truncating.
   */
  absoluteTitle?: boolean;
};

/** Per-page metadata: translated title/description, canonical, hreflang, OG and Twitter cards. */
export function buildMetadata(locale: Locale, path: string, { title, description, ogTitle, ogDescription, absoluteTitle }: PageMeta): Metadata {
  const d = getDictionary(locale);
  const url = absoluteUrl(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      url,
      siteName: d.meta.siteName,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [{ url: "/og-renoqo.png", width: 1200, height: 630, type: "image/png", alt: d.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: ["/og-renoqo.png"],
    },
  };
}

export const absoluteGuideUrl = (article: GuideArticle) =>
  `${SITE_URL.replace(/\/$/, "")}${article.locale === "en" ? "/en" : ""}/guides/${article.slug}/`;

export function buildGuideMetadata(article: GuideArticle): Metadata {
  const canonical = absoluteGuideUrl(article);
  const counterpart = `${SITE_URL.replace(/\/$/, "")}${article.locale === "fr" ? "/en" : ""}/guides/${article.counterpartSlug}/`;
  const french = article.locale === "fr" ? canonical : counterpart;
  const english = article.locale === "en" ? canonical : counterpart;
  return {
    title: { absolute: article.seoTitle }, description: article.description,
    alternates: { canonical, languages: { "fr-MA": french, "en-MA": english, "x-default": french } },
    robots: { index: true, follow: true },
    openGraph: { type: "article", locale: OG_LOCALES[article.locale], url: canonical, siteName: "Renoqo", title: article.seoTitle, description: article.description, publishedTime: article.publishedAt, modifiedTime: article.modifiedAt, images: [{ url: "/og-renoqo.png", width: 1200, height: 630, type: "image/png", alt: article.locale === "fr" ? "Renoqo — Estimez, comparez et réalisez vos travaux" : "Renoqo — Estimate, compare, and complete your project" }] },
    twitter: { card: "summary_large_image", title: article.seoTitle, description: article.description, images: ["/og-renoqo.png"] },
  };
}
