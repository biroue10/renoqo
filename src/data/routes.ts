import { cities } from "./cities";
import { services } from "./services";

/**
 * Single source of truth for the site map, expressed as locale-agnostic paths.
 * French serves these paths at the root, English under `/en`. Keeping one list
 * guarantees that every page has a counterpart in the other language, which is
 * what the language switcher and the hreflang alternates rely on.
 */

/** Pages that own a dedicated route file rather than the `[...slug]` catch-all. */
export const DEDICATED_PATHS = ["/", "/calculateurs", "/prix", "/guides", "/pour-les-professionnels", "/demander-un-devis"] as const;

/** Pages rendered by the `[...slug]` catch-all. */
export const CATCH_ALL_PATHS = [
  ...services.map((service) => `/services/${service.slug}`),
  ...cities.map((city) => `/villes/${city.slug}`),

  "/professionnels",
  "/professionnels/inscription",
  "/connexion",

  "/a-propos",
  "/nos-engagements",
  "/contact",
  "/centre-aide",

  "/mentions-legales",
  "/conditions-utilisation",
  "/politique-confidentialite",
  "/politique-cookies",
  "/regles-avis",
];

/** Every public path, in both languages. */
export const ROUTABLE_PATHS = [...DEDICATED_PATHS, ...CATCH_ALL_PATHS];

/**
 * Paths advertised in `sitemap.xml`. Sign-in is excluded because it carries no
 * indexable content. Full guide articles own localized dynamic routes and are
 * added separately by `sitemap.ts`, because their French and English slugs differ.
 */
const SITEMAP_EXCLUDED = new Set(["/connexion"]);

export const SITEMAP_PATHS = ROUTABLE_PATHS.filter((path) => !SITEMAP_EXCLUDED.has(path));

export function isRoutablePath(path: string): boolean {
  const withoutTrailingSlash = path.length > 1 ? path.replace(/\/$/, "") : path;
  return ROUTABLE_PATHS.includes(withoutTrailingSlash);
}
