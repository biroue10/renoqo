import { Container } from "./Container";
import { LocaleLink } from "./LocaleLink";
import type { Locale } from "@/i18n/config";

type Item = { title: string; text: string; href?: string; id?: string };
type Labels = { learnMore: string; comingSoon: string; backHome: string };

export function ListingPage({ locale, labels, eyebrow, title, intro, items }: { locale: Locale; labels: Labels; eyebrow: string; title: string; intro: string; items: Item[] }) {
  return (
    <div className="inner-page">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-intro">{intro}</p>
        <div className="listing-grid">
          {items.map((item) => (
            <article id={item.id} key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              {item.href
                ? <LocaleLink className="text-link" locale={locale} href={item.href}>{labels.learnMore}</LocaleLink>
                : <span className="soon">{labels.comingSoon}</span>}
            </article>
          ))}
        </div>
        <LocaleLink locale={locale} href="/" className="button button-secondary">{labels.backHome}</LocaleLink>
      </Container>
    </div>
  );
}
