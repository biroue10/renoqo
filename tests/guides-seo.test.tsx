import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GuideArticlePage } from "@/components/guides/GuideArticlePage";
import { guideArticles, getGuideByKey } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/metadata";
import { switchLocalePath } from "@/i18n/locale-path";
import sitemap from "@/app/sitemap";

describe("SEO renovation guides", () => {
  it("defines the six localized, dated articles with unique primary keywords", () => {
    expect(guideArticles).toHaveLength(6);
    expect(new Set(guideArticles.map((article) => `${article.locale}:${article.slug}`)).size).toBe(6);
    expect(new Set(guideArticles.map((article) => article.primaryKeyword.toLowerCase())).size).toBe(6);
    for (const article of guideArticles) {
      expect(article.seoTitle).toBeTruthy();
      expect(article.description.length).toBeGreaterThan(100);
      expect(Number.isNaN(Date.parse(article.publishedAt))).toBe(false);
      expect(Number.isNaN(Date.parse(article.modifiedAt))).toBe(false);
      expect(article.sections.length).toBeGreaterThanOrEqual(9);
      expect(article.sections.some((section) => section.blocks.some((block) => block.type === "table"))).toBe(true);
      expect(article.checklist.length).toBeGreaterThanOrEqual(10);
      expect(article.faqs.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("renders one H1, ordered headings, breadcrumb, tables, checklist, CTAs and JSON-LD", () => {
    for (const article of guideArticles) {
      const html = renderToStaticMarkup(<GuideArticlePage article={article} />);
      expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
      expect(html.indexOf("<h1")).toBeLessThan(html.indexOf("<h2"));
      expect(html).toContain('class="breadcrumb"');
      expect(html).toContain("<table>");
      expect(html).toContain('id="checklist"');
      const prefix = article.locale === "en" ? "/en" : "";
      expect(html).toContain(`href="${prefix}/calculateurs"`);
      expect(html).toContain(`href="${prefix}/demander-un-devis"`);
      expect(html).toContain(`href="${prefix}/prix"`);
      expect(html).toContain(`href="${prefix}/services/renovation"`);
      expect(html).toContain('type="application/ld+json"');
      expect(html).toContain('"@type":"Article"');
      expect(html).toContain('"@type":"BreadcrumbList"');
    }
  });

  it("builds exact canonicals and localized hreflang clusters", () => {
    for (const article of guideArticles) {
      const metadata = buildGuideMetadata(article);
      const expected = `https://renoqo.com${article.locale === "en" ? "/en" : ""}/guides/${article.slug}/`;
      expect(metadata.alternates?.canonical).toBe(expected);
      const languages = metadata.alternates?.languages as Record<string, string>;
      expect(languages["fr-MA"]).toContain("/guides/");
      expect(languages["en-MA"]).toContain("/en/guides/");
      expect(languages["x-default"]).toBe(languages["fr-MA"]);
      expect(metadata.description).toBe(article.description);
    }
  });

  it("switches between translated slugs", () => {
    for (const article of guideArticles.filter((item) => item.locale === "fr")) {
      const en = getGuideByKey("en", article.key);
      expect(switchLocalePath("en", `/guides/${article.slug}/`)).toBe(`/en/guides/${en.slug}/`);
      expect(switchLocalePath("fr", `/en/guides/${en.slug}/`)).toBe(`/guides/${article.slug}/`);
    }
  });

  it("keeps substantial French copy out of English articles", () => {
    const english = guideArticles.filter((article) => article.locale === "en").map((article) => JSON.stringify({ title: article.title, excerpt: article.excerpt, shortAnswer: article.shortAnswer, takeaways: article.takeaways, sections: article.sections, checklist: article.checklist, faqs: article.faqs })).join("\n");
    for (const marker of ["À retenir", "devis travaux", "Mis à jour", "rénovation au Maroc"]) expect(english).not.toContain(marker);
  });

  it("adds every guide exactly once to the sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const article of guideArticles) expect(urls).toContain(`https://renoqo.com${article.locale === "en" ? "/en" : ""}/guides/${article.slug}/`);
  });
});
