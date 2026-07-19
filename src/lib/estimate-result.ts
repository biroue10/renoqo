import type { Locale } from "@/i18n/config";
import type { EstimateInput } from "@/lib/estimate";

const roundToHundred = (value: number) => Math.round(value / 100) * 100;

/** Presentation-only midpoint. It does not alter either bound from the pricing engine. */
export function estimateMidpoint(low: number, high: number) {
  return roundToHundred((low + high) / 2);
}

/** Keep empty until the engine exposes honest, reconcilable cost components. */
export type EstimateBreakdownWeight = { key: string; weight: number };
export const estimateBreakdownWeights: Partial<Record<EstimateInput["project"], readonly EstimateBreakdownWeight[]>> = {};

export function quotePrefillHref(input: EstimateInput, locale: Locale) {
  const params = new URLSearchParams({ project: input.project, city: input.city, area: String(input.area), finish: input.finish });
  return `${locale === "en" ? "/en" : ""}/demander-un-devis/?${params.toString()}`;
}
