import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities } from "@/data/cities";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function CitiesSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section section-tint">
      <Container>
        <SectionHeading eyebrow={d.cities.eyebrow} title={d.cities.title} description={d.cities.description} />
        <div className="city-grid">
          {cities.map((city, index) => (
            <LocaleLink locale={locale} href={`/villes/${city.slug}`} className={`city-card city-${index + 1}`} key={city.slug}>
              <span className="city-art" aria-hidden="true"><i /><i /><i /></span>
              <span><strong>{city.name}</strong><small>{d.cities.notes[city.slug]}</small></span>
              <b aria-hidden="true">→</b>
            </LocaleLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
