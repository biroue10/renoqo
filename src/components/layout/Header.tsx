import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MobileNavigation } from "./MobileNavigation";

export const navigation = [
  ["Estimer mes travaux", "/#estimation"], ["Prix des travaux", "/prix"],
  ["Trouver un professionnel", "/professionnels"], ["Guides", "/guides"],
  ["Pour les professionnels", "/pour-les-professionnels"],
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return <Link className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Renoqo, accueil"><span aria-hidden="true" className="logo-mark">R</span><span>renoqo</span></Link>;
}

function Selectors() {
  return <div className="selectors"><label className="sr-only" htmlFor="country">Pays</label><select id="country" defaultValue="ma"><option value="ma">🇲🇦 Maroc</option><option disabled>France — bientôt</option><option disabled>Côte d’Ivoire — bientôt</option><option disabled>Sénégal — bientôt</option><option disabled>Cameroun — bientôt</option><option disabled>Belgique — bientôt</option><option disabled>Canada — bientôt</option></select><label className="sr-only" htmlFor="language">Langue</label><select id="language" defaultValue="fr"><option value="fr">FR</option><option disabled>العربية — bientôt</option><option disabled>English — soon</option></select></div>;
}

export function Header() {
  return <header className="site-header"><Container className="header-inner"><Logo /><nav aria-label="Navigation principale" className="desktop-nav">{navigation.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav><div className="header-actions"><Selectors /><Link className="login-link" href="/connexion">Connexion</Link><Link className="button button-primary compact" href="/devis">Demander des devis</Link></div><MobileNavigation /></Container></header>;
}
