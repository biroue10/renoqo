import type { Locale } from "@/i18n/config";

export const projectRates = {
  renovation: 2800, peinture: 85, plomberie: 520, electricite: 480,
  carrelage: 240, construction: 4200, cuisine: 3100, bain: 3600,
  climatisation: 950, solaire: 1500,
} as const;

export const finishCoefficients = { economique: 0.82, standard: 1, premium: 1.42 } as const;
export const cityCoefficients = { casablanca: 1.08, rabat: 1.04, marrakech: 1.02, tanger: 1, agadir: 0.96, fes: 0.92 } as const;

export type EstimateInput = { project: keyof typeof projectRates; city: keyof typeof cityCoefficients; area: number; finish: keyof typeof finishCoefficients };
export type EstimateField = keyof EstimateInput;

/**
 * Validation reports *which* fields are invalid rather than a message, so the
 * engine stays language-agnostic and both locales share one code path. The UI
 * resolves each field against `dictionary.estimate.errors` to display the
 * translated message.
 */
export type ValidationErrors = Partial<Record<EstimateField, true>>;

export function validateEstimate(input: Partial<EstimateInput>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.project || !(input.project in projectRates)) errors.project = true;
  if (!input.city || !(input.city in cityCoefficients)) errors.city = true;
  if (!input.finish || !(input.finish in finishCoefficients)) errors.finish = true;
  if (!Number.isFinite(input.area) || (input.area ?? 0) < 1 || (input.area ?? 0) > 10000) errors.area = true;
  return errors;
}

const roundToHundred = (value: number) => Math.round(value / 100) * 100;

export function calculateEstimate(input: EstimateInput) {
  const baseline = projectRates[input.project] * input.area * finishCoefficients[input.finish] * cityCoefficients[input.city];
  return { low: roundToHundred(baseline * 0.88), high: roundToHundred(baseline * 1.18) };
}

/** Number grouping follows the reading locale; the currency stays MAD in both. */
const NUMBER_LOCALES: Record<Locale, string> = { fr: "fr-FR", en: "en-US" };

const formatNumber = (value: number, locale: Locale) =>
  new Intl.NumberFormat(NUMBER_LOCALES[locale], { maximumFractionDigits: 0 }).format(value);

export function formatMAD(value: number, locale: Locale = "fr") {
  return `${formatNumber(value, locale)} MAD`;
}

/** Formats an indicative range, or `null` when the price is quoted on request. */
export function formatRange(low: number | null, high: number | null, locale: Locale = "fr") {
  if (low === null || high === null) return null;
  return `${formatNumber(low, locale)} – ${formatMAD(high, locale)}`;
}
