import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { absoluteUrl, SITE_URL } from "@/lib/metadata";
import type { JsonValue } from "@/components/seo/JsonLd";

const root = SITE_URL.replace(/\/$/, "");
export const ORGANIZATION_ID = `${root}/#organization`;
export const WEBSITE_ID = `${root}/#website`;

export function globalStructuredData(locale: Locale): JsonValue[] {
  return [
    { "@context": "https://schema.org", "@type": "Organization", "@id": ORGANIZATION_ID, name: "Renoqo", url: root, logo: `${root}/favicon.svg`, areaServed: { "@type": "Country", name: "Morocco" }, knowsLanguage: ["fr-MA", "en-MA"] },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": WEBSITE_ID, url: root, name: "Renoqo", publisher: { "@id": ORGANIZATION_ID }, inLanguage: LOCALE_TAGS[locale] },
  ];
}

export function breadcrumbStructuredData(locale: Locale, items: { name: string; path: string }[]): JsonValue {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(locale, item.path) })) };
}

export function webpageStructuredData(locale: Locale, path: string, name: string, description: string): JsonValue {
  return { "@context": "https://schema.org", "@type": "WebPage", name, description, url: absoluteUrl(locale, path), inLanguage: LOCALE_TAGS[locale], isPartOf: { "@id": WEBSITE_ID }, publisher: { "@id": ORGANIZATION_ID } };
}
