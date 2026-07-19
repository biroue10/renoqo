import { cities } from "./cities";
import { guides } from "./guides";
import { services } from "./services";

/**
 * Single source of truth for the site map, expressed as locale-agnostic paths.
 * French serves these paths at the root, English under `/en`. Keeping one list
 * guarantees that every page has a counterpart in the other language, which is
 * what the language switcher and the hreflang alternates rely on.
 */

/** Pages that own a dedicated route file rather than the `[...slug]` catch-all. */
export const DEDICATED_PATHS = ["/", "/calculateurs", "/prix", "/guides", "/pour-les-professionnels"] as const;

/** Pages rendered by the `[...slug]` catch-all. */
export const CATCH_ALL_PATHS = [
  ...services.map((service) => `/services/${service.slug}`),
  ...cities.map((city) => `/villes/${city.slug}`),
  ...guides.map((guide) => `/guides/${guide.slug}`),

  "/professionnels",
  "/professionnels/inscription",
  "/connexion",
  "/demander-un-devis",

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
 * indexable content; individual guide pages are excluded until their editorial
 * content is written, so we never advertise placeholder pages.
 */
const SITEMAP_EXCLUDED = new Set(["/connexion", ...guides.map((guide) => `/guides/${guide.slug}`)]);

export const SITEMAP_PATHS = ROUTABLE_PATHS.filter((path) => !SITEMAP_EXCLUDED.has(path));

export function isRoutablePath(path: string): boolean {
  const withoutTrailingSlash = path.length > 1 ? path.replace(/\/$/, "") : path;
  return ROUTABLE_PATHS.includes(withoutTrailingSlash);
}
