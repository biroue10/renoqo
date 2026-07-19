import { CalculatorsPage } from "@/components/pages/InnerPages";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

const locale = "en" as const;
const d = getDictionary(locale);

export const metadata = buildMetadata(locale, "/calculateurs", { title: d.calculators.pageTitle, description: d.calculators.pageIntro });

export default function Page() {
  return <CalculatorsPage locale={locale} />;
}
