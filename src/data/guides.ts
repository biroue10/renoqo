import type { GuideArticle, GuideKey } from "@/content/guides/types";
import { budgetFr } from "@/content/guides/fr/budget-renovation-maroc";
import { quotesFr } from "@/content/guides/fr/comparer-devis-travaux-maroc";
import { factorsFr } from "@/content/guides/fr/facteurs-prix-travaux-maroc";
import { budgetEn } from "@/content/guides/en/renovation-budget-morocco";
import { quotesEn } from "@/content/guides/en/compare-contractor-quotes-morocco";
import { factorsEn } from "@/content/guides/en/factors-affecting-project-costs-morocco";
import type { Locale } from "@/i18n/config";

export const guideArticles = [budgetFr, quotesFr, factorsFr, budgetEn, quotesEn, factorsEn] satisfies GuideArticle[];
export const guides = [
  { key: "budget", tone: "blue" },
  { key: "quotes", tone: "green" },
  { key: "costFactors", tone: "sand" },
] as const;

export function getGuide(locale: Locale, slug: string) {
  return guideArticles.find((guide) => guide.locale === locale && guide.slug === slug);
}
export function getGuideByKey(locale: Locale, key: GuideKey) {
  return guideArticles.find((guide) => guide.locale === locale && guide.key === key)!;
}
export function guidePath(article: GuideArticle) { return `/guides/${article.slug}`; }
export function guideCounterpartPath(article: GuideArticle) { return `/guides/${article.counterpartSlug}`; }
