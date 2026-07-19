import type { Locale } from "@/i18n/config";
import { LocaleLink } from "./LocaleLink";

type Props = { locale: Locale; href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "light"; className?: string };

export function Button({ locale, href, children, variant = "primary", className = "" }: Props) {
  return <LocaleLink className={`button button-${variant} ${className}`} locale={locale} href={href}>{children}</LocaleLink>;
}
