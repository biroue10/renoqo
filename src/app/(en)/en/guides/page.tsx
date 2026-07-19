import { GuidesIndexPage } from "@/components/pages/InnerPages";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

const locale = "en" as const;
const d = getDictionary(locale);

export const metadata = buildMetadata(locale, "/guides", { title: d.guides.pageTitle, description: d.guides.pageIntro });

export default function Page() {
  return <GuidesIndexPage locale={locale} />;
}
