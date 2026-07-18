import { guides } from "@/data/guides";
import { ListingPage } from "@/components/ui/ListingPage";
export const metadata = { title: "Guides rénovation et construction" };
export default function GuidesPage() { return <ListingPage eyebrow="Conseils Renoqo" title="Guides pour vos travaux" intro="Des repères pratiques et transparents pour préparer vos décisions." items={guides.map(x => ({ title: x.title, text: x.summary, href: `/guides/${x.slug}` }))} />; }
