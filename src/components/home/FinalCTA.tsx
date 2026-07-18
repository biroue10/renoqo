import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
export function FinalCTA() { return <section className="final-cta"><Container><div><p className="eyebrow light-eyebrow">Votre projet commence ici</p><h2>Prêt à estimer votre projet ?</h2><p>Obtenez une première estimation de votre budget et préparez votre demande de devis en quelques étapes.</p></div><div><Button href="/#estimation" variant="light">Estimer mes travaux</Button><Button href="/devis" variant="secondary">Demander des devis</Button></div></Container></section>; }
