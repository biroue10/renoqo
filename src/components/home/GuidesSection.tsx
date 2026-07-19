import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guides, getGuideByKey, guidePath } from "@/data/guides";
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
            const article = getGuideByKey(locale, guide.key);
            const copy = { title: article.title, summary: article.excerpt, category: article.category, readTime: `${article.readingTime} min` };
            return (
              <article className="guide-card" key={guide.key}>
                <div className={`guide-image ${guide.tone}`} role="img" aria-label={d.guides.illustrationAlt(copy.title)}>
                  <span>{String(index + 1).padStart(2, "0")}</span><i /><i />
                </div>
                <div className="guide-content">
                  <div className="guide-meta"><span>{copy.category}</span><span>{copy.readTime}</span></div>
                  <h3><LocaleLink locale={locale} href={guidePath(article)}>{copy.title}</LocaleLink></h3>
                  <p>{copy.summary}</p>
                  <LocaleLink locale={locale} href={guidePath(article)} className="card-link" aria-label={`${d.guides.read}: ${article.title}`}>{d.guides.read}</LocaleLink>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
