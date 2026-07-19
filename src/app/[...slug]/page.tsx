import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ui/ListingPage";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { RENOQO_STATIC_SLUGS } from "@/data/static-routes";

const staticTitles: Record<string, string> = { "professionnels": "Trouver un professionnel", "professionnels/inscription": "Rejoindre Renoqo", "pour-les-professionnels": "L’espace professionnel Renoqo", "connexion": "Connexion", "demander-un-devis": "Demander des devis", "a-propos": "À propos de Renoqo", "contact": "Contacter Renoqo", "nos-engagements": "Nos engagements", "centre-aide": "Centre d’aide", "mentions-legales": "Mentions légales", "conditions-utilisation": "Conditions d’utilisation", "politique-confidentialite": "Politique de confidentialité", "politique-cookies": "Politique de cookies", "regles-avis": "Règles relatives aux avis" };
function resolve(slug: string) { const service = slug.startsWith("services/") && services.find(x => `services/${x.slug}` === slug); if (service) return { title: service.title, text: service.description }; const city = slug.startsWith("villes/") && cities.find(x => `villes/${x.slug}` === slug); if (city) return { title: `Travaux à ${city.name}`, text: `Les services Renoqo à ${city.name} seront enrichis progressivement, sans dupliquer de contenus génériques.` }; const guide = slug.startsWith("guides/") && guides.find(x => `guides/${x.slug}` === slug); if (guide) return { title: guide.title, text: `${guide.summary} Le contenu éditorial détaillé est en préparation.` }; if (staticTitles[slug]) return { title: staticTitles[slug], text: "Cette rubrique est prête à accueillir son contenu et ses futurs services. Elle sera complétée au fil du déploiement de Renoqo." }; return null; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> { const value = resolve((await params).slug.join("/")); return value ? { title: value.title, description: value.text } : {}; }
export const dynamicParams = false;

export function generateStaticParams() {
  return RENOQO_STATIC_SLUGS.map((slug) => ({
    slug,
  }));
}


export default async function PreparedPage({ params }: { params: Promise<{ slug: string[] }> }) { const value = resolve((await params).slug.join("/")); if (!value) notFound(); return <ListingPage eyebrow="Renoqo Maroc" title={value.title} intro={value.text} items={[{ title: "Une expérience en préparation", text: "Notre priorité est de proposer une information claire, locale et fiable. Revenez bientôt pour découvrir cette fonctionnalité." }]} />; }
