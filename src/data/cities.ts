/**
 * City names are official Moroccan proper nouns and stay identical across
 * locales; only the descriptive note is translated (see `cities.notes`).
 */
export const cities = [
  { slug: "casablanca", name: "Casablanca" },
  { slug: "rabat", name: "Rabat" },
  { slug: "marrakech", name: "Marrakech" },
  { slug: "tanger", name: "Tanger" },
  { slug: "agadir", name: "Agadir" },
  { slug: "fes", name: "Fès" },
] as const;

export type CitySlug = (typeof cities)[number]["slug"];
