import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function FinalCTA({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="final-cta">
      <Container>
        <div>
          <p className="eyebrow light-eyebrow">{d.finalCta.eyebrow}</p>
          <h2>{d.finalCta.title}</h2>
          <p>{d.finalCta.description}</p>
        </div>
        <div>
          <Button locale={locale} href="/#estimation" variant="light">{d.finalCta.primary}</Button>
          <Button locale={locale} href="/demander-un-devis" variant="secondary">{d.finalCta.secondary}</Button>
        </div>
      </Container>
    </section>
  );
}
