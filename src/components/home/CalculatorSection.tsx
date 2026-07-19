import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { calculators } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function CalculatorSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section calculators">
      <Container>
        <div className="section-split">
          <SectionHeading align="left" eyebrow={d.calculators.eyebrow} title={d.calculators.title} description={d.calculators.description} />
          <LocaleLink locale={locale} href="/calculateurs" className="text-link">{d.calculators.seeAll}</LocaleLink>
        </div>
        <div className="calculator-grid">
          {calculators.map((calculator, index) => {
            const copy = d.calculators.items[calculator.slug];
            return (
              <article key={calculator.slug} className={`calculator-card calculator-${index + 1}`}>
                <span className="calculator-index">0{index + 1}</span>
                <p className="mini-label">{d.calculators.inMinutes}</p>
                <h3>{copy.title}</h3>
                <p>{copy.description}</p>
                <LocaleLink className="button button-light" locale={locale} href={`/calculateurs#${calculator.slug}`}>
                  {d.calculators.start} <span aria-hidden="true">→</span>
                </LocaleLink>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
