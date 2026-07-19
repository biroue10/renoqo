import { ProfessionalsPage } from "@/components/pages/ProfessionalsPage";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

const locale = "fr" as const;
const d = getDictionary(locale);

export const metadata = buildMetadata(locale, "/pour-les-professionnels", {
  title: d.professionals.meta.title,
  description: d.professionals.meta.description,
  ogTitle: d.professionals.hero.title,
  ogDescription: d.professionals.hero.subtitle,
  // The title already contains "Renoqo"; the template suffix would only duplicate it.
  absoluteTitle: true,
});

export default function Page() {
  return <ProfessionalsPage locale={locale} />;
}
