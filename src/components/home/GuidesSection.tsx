import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guides } from "@/data/guides";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function GuidesSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section section-tint">
      <Container>
        <div className="section-split">
          <SectionHeading align="left" eyebrow={d.guides.eyebrow} title={d.guides.title} description={d.guides.description} />
          <LocaleLink locale={locale} href="/guides" className="text-link">{d.guides.seeAll}</LocaleLink>
        </div>
        <div className="guide-grid">
          {guides.map((guide, index) => {
            const copy = d.guides.items[guide.slug];
            return (
              <article className="guide-card" key={guide.slug}>
                <div className={`guide-image ${guide.tone}`} role="img" aria-label={d.guides.illustrationAlt(copy.title)}>
                  <span>{String(index + 1).padStart(2, "0")}</span><i /><i />
                </div>
                <div className="guide-content">
                  <div className="guide-meta"><span>{copy.category}</span><span>{copy.readTime}</span></div>
                  <h3><LocaleLink locale={locale} href={`/guides/${guide.slug}`}>{copy.title}</LocaleLink></h3>
                  <p>{copy.summary}</p>
                  <LocaleLink locale={locale} href={`/guides/${guide.slug}`} className="card-link">{d.guides.read}</LocaleLink>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
