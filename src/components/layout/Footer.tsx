import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Header";

const groups = [
  ["Renoqo", [["À propos", "/a-propos"], ["Comment ça marche", "/#fonctionnement"], ["Nos engagements", "/#engagements"], ["Contact", "/contact"]]],
  ["Projets", [["Estimer mes travaux", "/#estimation"], ["Prix des travaux", "/prix"], ["Calculateurs", "/calculateurs"], ["Demander un devis", "/devis"]]],
  ["Professionnels", [["Trouver un professionnel", "/professionnels"], ["Rejoindre Renoqo", "/professionnels/inscription"], ["Espace professionnel", "/pour-les-professionnels"], ["Centre d’aide", "/aide"]]],
  ["Informations légales", [["Mentions légales", "/mentions-legales"], ["Conditions d’utilisation", "/conditions"], ["Politique de confidentialité", "/confidentialite"], ["Politique de cookies", "/cookies"], ["Règles relatives aux avis", "/regles-avis"]]],
] as const;

export function Footer() {
  return <footer className="site-footer"><Container><div className="footer-top"><div className="footer-brand"><Logo light /><p className="footer-slogan">Estimate. Compare. Build.</p><p>Des décisions plus claires pour vos projets de travaux.</p><label htmlFor="footer-country">Pays et marché</label><select id="footer-country" defaultValue="ma"><option value="ma">🇲🇦 Maroc</option><option disabled>Autres pays — bientôt</option></select></div>{groups.map(([title, links]) => <div className="footer-group" key={title}><h2>{title}</h2>{links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</div>)}</div><div className="footer-bottom"><p>© {new Date().getFullYear()} Renoqo. Tous droits réservés.</p><div className="socials" aria-label="Réseaux sociaux"><a href="#linkedin" aria-label="Renoqo sur LinkedIn">in</a><a href="#instagram" aria-label="Renoqo sur Instagram">ig</a><a href="#facebook" aria-label="Renoqo sur Facebook">f</a></div></div></Container></footer>;
}
