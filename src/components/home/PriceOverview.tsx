import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceRows } from "@/data/prices";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatRange } from "@/lib/estimate";

export function PriceOverview({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="section price-section">
      <Container className="price-layout">
        <div>
          <SectionHeading align="left" eyebrow={d.prices.eyebrow} title={d.prices.title} description={d.prices.description} />
          <div className="notice">
            <strong>{d.prices.noticeTitle}</strong>
            <p>{d.prices.noticeText}</p>
          </div>
          <LocaleLink locale={locale} href="/prix" className="button button-primary">{d.prices.seeAll}</LocaleLink>
        </div>
        <div className="price-table" role="table" aria-label={d.prices.tableLabel}>
          <div className="price-row price-head" role="row">
            <span role="columnheader">{d.prices.columnType}</span>
            <span role="columnheader">{d.prices.columnRange}</span>
          </div>
          {priceRows.map((row) => {
            const copy = d.prices.rows[row.id];
            return (
              <div className="price-row" role="row" key={row.id}>
                <span role="cell"><strong>{copy.name}</strong><small>{copy.unit}</small></span>
                <strong role="cell">{formatRange(row.low, row.high, locale) ?? d.prices.onEstimate}</strong>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
