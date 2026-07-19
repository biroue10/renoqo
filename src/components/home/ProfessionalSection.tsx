import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function ProfessionalSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section pro-section">
      <Container className="pro-inner">
        <div className="pro-visual" aria-hidden="true">
          <div className="profile-mock">
            <span className="mock-avatar">AB</span>
            <div><b>Atelier Bâtiment</b><small>{d.professional.mockSpecialty}</small></div>
            <span className="mock-status">{d.professional.mockProfile}</span>
          </div>
          <div className="opportunity-mock">
            <span>{d.professional.mockOpportunity}</span>
            <strong>{d.professional.mockProject}</strong>
            <small>{d.professional.mockDetails}</small>
          </div>
          <div className="growth-badge">↗ <span><b>{d.professional.growthTitle}</b><small>{d.professional.growthText}</small></span></div>
        </div>
        <div className="pro-copy">
          <p className="eyebrow light-eyebrow">{d.professional.eyebrow}</p>
          <h2>{d.professional.title}</h2>
          <p>{d.professional.description}</p>
          <div className="benefit-grid">
            {d.professional.benefits.map((item) => <span key={item}><Icon name="check" size={18} />{item}</span>)}
          </div>
          <div className="pro-actions">
            <Button locale={locale} href="/professionnels/inscription" variant="light">{d.professional.join}</Button>
            <Button locale={locale} href="/pour-les-professionnels" variant="secondary">{d.professional.discover}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
