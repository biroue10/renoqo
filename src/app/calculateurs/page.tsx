import { calculators } from "@/data/services";
import { ListingPage } from "@/components/ui/ListingPage";
export const metadata = { title: "Calculateurs de travaux" };
export default function CalculatorsPage() { return <ListingPage eyebrow="Outils Renoqo" title="Calculateurs de travaux" intro="Nos calculateurs détaillés seront disponibles progressivement. L’estimation rapide de la page d’accueil est déjà fonctionnelle." items={calculators.map(x => ({ title: x.title, text: x.description, id: x.slug }))} />; }
