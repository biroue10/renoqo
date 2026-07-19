import { isRoutablePath } from "@/data/routes";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

/**
 * French is served at the site root, every other locale under its own prefix.
 * Slugs are shared between locales so the existing French URLs keep their SEO
 * value and a page always has a direct counterpart in the other language.
 */

/** Splits `/services/renovation?a=1#top` into its pathname and its suffix. */
function split(path: string) {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const cut = withLeadingSlash.search(/[?#]/);
  const pathname = (cut === -1 ? withLeadingSlash : withLeadingSlash.slice(0, cut)).replace(/\/{2,}/g, "/");
  return { pathname: pathname || "/", suffix: cut === -1 ? "" : withLeadingSlash.slice(cut) };
}

/** Removes any locale prefix, returning the locale it carried and the bare path. */
export function stripLocale(path: string): { locale: Locale; path: string } {
  const { pathname, suffix } = split(path);
  const [, first = "", ...rest] = pathname.split("/");
  if (!isLocale(first) || first === DEFAULT_LOCALE) return { locale: DEFAULT_LOCALE, path: `${pathname}${suffix}` };
  const remainder = rest.join("/");
  return { locale: first, path: `${remainder ? `/${remainder}` : "/"}${suffix}` };
}

/** Builds the URL of `path` for `locale`. `path` may already carry a prefix. */
export function localizedPath(locale: Locale, path: string): string {
  const { path: bare } = stripLocale(path);
  const { pathname, suffix } = split(bare);
  if (locale === DEFAULT_LOCALE) return `${pathname}${suffix}`;
  return `${pathname === "/" ? `/${locale}/` : `/${locale}${pathname}`}${suffix}`;
}

/**
 * Target of the language switcher: the current page in another locale.
 * Anchors and query strings are preserved so switching keeps the reading spot.
 * A path with no counterpart (an unknown URL, a 404) falls back to the home
 * page of the requested locale rather than producing a dead link.
 */
export function switchLocalePath(locale: Locale, currentPath: string): string {
  const { path: bare } = stripLocale(currentPath);
  const { pathname } = split(bare);
  if (!isRoutablePath(pathname)) return localizedPath(locale, "/");
  return localizedPath(locale, currentPath);
}

/** Absolute URL used by canonical tags, hreflang alternates and the sitemap. */
export function localizedUrl(locale: Locale, path: string, siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}${localizedPath(locale, path)}`;
}
