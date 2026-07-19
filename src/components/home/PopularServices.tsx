import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function PopularServices({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section section-tint">
      <Container>
        <SectionHeading eyebrow={d.services.eyebrow} title={d.services.title} description={d.services.description} />
        <div className="service-grid">
          {services.map((service) => {
            const copy = d.services.items[service.slug];
            return (
              <LocaleLink className="service-card" locale={locale} href={`/services/${service.slug}`} key={service.slug}>
                <span className="service-icon"><Icon name={service.icon} /></span>
                <h3>{copy.title}</h3>
                <p>{copy.description}</p>
                <span className="card-link">{d.services.explore} <Icon name="arrow" size={17} /></span>
              </LocaleLink>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
