import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

/**
 * Resolves a dictionary for server rendering. Client components never call
 * this: they receive the strings they need as props, so a single locale ends
 * up in the browser bundle.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
