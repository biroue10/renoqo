/**
 * Structural data only. Slugs are shared across locales (they are part of the
 * URL) and icon names are language-neutral; every label lives in `src/i18n`.
 */
export const services = [
  { slug: "renovation", icon: "renovation" },
  { slug: "construction", icon: "construction" },
  { slug: "peinture", icon: "peinture" },
  { slug: "plomberie", icon: "plomberie" },
  { slug: "electricite", icon: "electricite" },
  { slug: "carrelage", icon: "carrelage" },
  { slug: "cuisine", icon: "cuisine" },
  { slug: "salle-de-bain", icon: "bain" },
  { slug: "climatisation", icon: "climatisation" },
  { slug: "energie-solaire", icon: "solaire" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const calculators = [
  { slug: "renovation" },
  { slug: "peinture" },
  { slug: "carrelage" },
  { slug: "construction" },
  { slug: "solaire" },
] as const;

export type CalculatorSlug = (typeof calculators)[number]["slug"];
