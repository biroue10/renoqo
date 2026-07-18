import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuickEstimateForm } from "./QuickEstimateForm";

export function HeroSection() {
  return <section className="hero" id="estimation"><div className="hero-grid-bg" aria-hidden="true" /><Container className="hero-inner"><div className="hero-copy"><div className="market-pill"><span>🇲🇦</span> La rénovation, plus claire au Maroc</div><h1>Estimez le coût de vos travaux et trouvez les <em>bons professionnels</em></h1><p className="hero-lead">Calculez votre budget, comparez les prix et recevez gratuitement plusieurs devis de professionnels près de chez vous.</p><div className="hero-actions"><Button href="#estimation-form">Estimer mon projet</Button><Button href="/devis" variant="secondary">Demander des devis</Button></div><ul className="trust-list" aria-label="Avantages"><li>Estimation gratuite</li><li>Sans engagement</li><li>Professionnels locaux</li></ul></div><div id="estimation-form"><QuickEstimateForm /></div></Container></section>;
}
