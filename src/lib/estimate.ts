export const projectRates = {
  renovation: 2800, peinture: 85, plomberie: 520, electricite: 480,
  carrelage: 240, construction: 4200, cuisine: 3100, bain: 3600,
  climatisation: 950, solaire: 1500,
} as const;

export const finishCoefficients = { economique: 0.82, standard: 1, premium: 1.42 } as const;
export const cityCoefficients = { casablanca: 1.08, rabat: 1.04, marrakech: 1.02, tanger: 1, agadir: 0.96, fes: 0.92 } as const;

export type EstimateInput = { project: keyof typeof projectRates; city: keyof typeof cityCoefficients; area: number; finish: keyof typeof finishCoefficients };
export type ValidationErrors = Partial<Record<keyof EstimateInput, string>>;

export function validateEstimate(input: Partial<EstimateInput>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.project || !(input.project in projectRates)) errors.project = "Choisissez un type de projet.";
  if (!input.city || !(input.city in cityCoefficients)) errors.city = "Choisissez une ville.";
  if (!input.finish || !(input.finish in finishCoefficients)) errors.finish = "Choisissez un niveau de finition.";
  if (!Number.isFinite(input.area) || (input.area ?? 0) < 1 || (input.area ?? 0) > 10000) errors.area = "Indiquez une superficie entre 1 et 10 000 m².";
  return errors;
}

const roundToHundred = (value: number) => Math.round(value / 100) * 100;

export function calculateEstimate(input: EstimateInput) {
  const baseline = projectRates[input.project] * input.area * finishCoefficients[input.finish] * cityCoefficients[input.city];
  return { low: roundToHundred(baseline * 0.88), high: roundToHundred(baseline * 1.18) };
}

export function formatMAD(value: number) {
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value)} MAD`;
}
