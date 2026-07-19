import Link from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/locale-path";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { locale: Locale; href: string };

/**
 * Link that keeps the reader inside their language. Always prefer this over a
 * bare `next/link` so no component has to concatenate `/en` by hand.
 */
export function LocaleLink({ locale, href, ...props }: Props) {
  return <Link href={localizedPath(locale, href)} {...props} />;
}
