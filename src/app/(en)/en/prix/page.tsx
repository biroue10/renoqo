import { PricesPage } from "@/components/pages/InnerPages";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

const locale = "en" as const;
const d = getDictionary(locale);

export const metadata = buildMetadata(locale, "/prix", { title: d.prices.pageTitle, description: d.prices.pageIntro });

export default function Page() {
  return <PricesPage locale={locale} />;
}
