/** Slug and illustration tone are language-neutral; text lives in `src/i18n`. */
export const guides = [
  { slug: "preparer-budget-renovation", tone: "blue" },
  { slug: "comparer-plusieurs-devis", tone: "green" },
  { slug: "facteurs-prix-travaux", tone: "sand" },
] as const;

export type GuideSlug = (typeof guides)[number]["slug"];
