import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { QuickEstimateForm } from "./QuickEstimateForm";

export function HeroSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="hero" id="estimation">
      <div className="hero-grid-bg" aria-hidden="true" />
      <Container className="hero-inner">
        <div className="hero-copy">
          <div className="market-pill"><span aria-hidden="true">🇲🇦</span> {d.hero.pill}</div>
          <h1>{d.hero.titleLead}<em>{d.hero.titleEmphasis}</em></h1>
          <p className="hero-lead">{d.hero.lead}</p>
          <div className="hero-actions">
            <Button locale={locale} href="#estimation-form">{d.hero.primaryCta}</Button>
            <Button locale={locale} href="/demander-un-devis" variant="secondary">{d.hero.secondaryCta}</Button>
          </div>
          <ul className="trust-list" aria-label={d.hero.benefitsLabel}>
            {d.hero.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </div>
        <div id="estimation-form">
          <QuickEstimateForm locale={locale} labels={d.estimate} />
        </div>
      </Container>
    </section>
  );
}
