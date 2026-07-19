import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd, serializeJsonLd } from "@/components/seo/JsonLd";
import { HomePage } from "@/components/pages/HomePage";
import { CatchAllPage, GuidesIndexPage, PricesPage } from "@/components/pages/InnerPages";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { breadcrumbStructuredData, globalStructuredData } from "@/lib/structured-data";

const scripts = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));

describe("reusable structured data", () => {
  it("defines Organization and localized WebSite without invented sameAs", () => {
    for (const [locale, language] of [["fr", "fr-MA"], ["en", "en-MA"]] as const) {
      const [organization, website] = globalStructuredData(locale) as Record<string, unknown>[];
      expect(organization).toMatchObject({ "@type": "Organization", "@id": "https://renoqo.com/#organization", name: "Renoqo", areaServed: { name: "Morocco" } });
      expect(organization).not.toHaveProperty("sameAs");
      expect(website).toMatchObject({ "@type": "WebSite", "@id": "https://renoqo.com/#website", inLanguage: language, publisher: { "@id": "https://renoqo.com/#organization" } });
    }
  });

  it("escapes less-than characters and always emits parseable JSON", () => {
    expect(serializeJsonLd({ text: "</script><script>" })).not.toContain("<");
    const html = renderToStaticMarkup(<JsonLd data={{ "@context": "https://schema.org", text: "safe" }} />);
    expect(scripts(html)[0]).toMatchObject({ text: "safe" });
  });

  it("builds FAQPage from exactly the eight visible home questions", () => {
    for (const [locale, dictionary] of [["fr", fr], ["en", en]] as const) {
      const html = renderToStaticMarkup(<HomePage locale={locale} />);
      const faq = scripts(html).flat().find((item) => item["@type"] === "FAQPage");
      expect(faq.mainEntity).toHaveLength(8);
      expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(dictionary.faq.items.map((item) => item.question));
      for (const item of dictionary.faq.items) { expect(html).toContain(item.question); expect(html).toContain(item.answer); }
    }
  });

  it("uses absolute localized breadcrumb URLs on hierarchical pages", () => {
    const data = breadcrumbStructuredData("en", [{ name: "Home", path: "/" }, { name: "Renovation", path: "/services/renovation" }]) as Record<string, unknown>;
    expect(JSON.stringify(data)).toContain("https://renoqo.com/en/services/renovation/");
    for (const html of [renderToStaticMarkup(<PricesPage locale="fr" />), renderToStaticMarkup(<GuidesIndexPage locale="en" />), renderToStaticMarkup(<CatchAllPage locale="en" slug="services/renovation" />)]) {
      expect(scripts(html).flat().some((item) => item["@type"] === "BreadcrumbList")).toBe(true);
      expect(html).not.toMatch(/"@type":"(?:LocalBusiness|Review|AggregateRating|Product|Offer|HowTo)"/);
    }
  });
});
