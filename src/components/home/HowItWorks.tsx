import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";

export function HowItWorks({ d }: { d: Dictionary }) {
  return (
    <section className="section how" id="fonctionnement">
      <Container>
        <SectionHeading eyebrow={d.howItWorks.eyebrow} title={d.howItWorks.title} description={d.howItWorks.description} />
        <div className="steps">
          {d.howItWorks.steps.map(({ title, text }, index) => (
            <article key={title}>
              <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
              {index < d.howItWorks.steps.length - 1 && <span className="step-line" aria-hidden="true" />}
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
