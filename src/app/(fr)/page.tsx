import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

const locale = "fr" as const;
const d = getDictionary(locale);

export const metadata = buildMetadata(locale, "/", {
  title: d.meta.home.title,
  description: d.meta.home.description,
  ogTitle: d.meta.home.ogTitle,
  ogDescription: d.meta.home.ogDescription,
});

export default function Page() {
  return <HomePage locale={locale} />;
}
