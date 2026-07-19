import { DEFAULT_LOCALE, type Locale } from "./config";

/**
 * Minimal interpolation for dictionary strings that carry runtime values.
 *
 * Labels are plain strings with `{name}` placeholders rather than functions,
 * because functions cannot be passed from a server component to a client one.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type Plural = { one: string; other: string };

/**
 * Picks a plural form and interpolates `{count}`.
 * French treats 0 and 1 as singular; English treats only 1 as singular.
 */
export function plural(forms: Plural, count: number, locale: Locale = DEFAULT_LOCALE): string {
  const isOne = locale === "fr" ? Math.abs(count) < 2 : Math.abs(count) === 1;
  return format(isOne ? forms.one : forms.other, { count });
}
