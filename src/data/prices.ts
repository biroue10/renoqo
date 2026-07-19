/**
 * Indicative price ranges in MAD. Bounds are numbers so each locale can format
 * them with its own grouping separator while showing the same figures.
 * A `null` bound means the range is quoted on request.
 */
export const priceRows = [
  { id: "peinture-interieure", low: 70, high: 140 },
  { id: "carrelage", low: 120, high: 280 },
  { id: "renovation-appartement", low: 2200, high: 5500 },
  { id: "installation-electrique", low: null, high: null },
  { id: "salle-de-bain", low: 18000, high: 55000 },
] as const;

export type PriceRowId = (typeof priceRows)[number]["id"];
