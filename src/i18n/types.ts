import type { fr } from "./dictionaries/fr";

/**
 * The French dictionary is the reference shape. Every other locale is typed
 * against it, so a missing or misspelt key is a compile error rather than a
 * silently untranslated string.
 */
export type Dictionary = typeof fr;
