import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";

export function TransparencySection({ d }: { d: Dictionary }) {
  return (
    <section className="section" id="engagements">
      <Container>
        <SectionHeading eyebrow={d.transparency.eyebrow} title={d.transparency.title} description={d.transparency.description} />
        <div className="commitments">
          {d.transparency.items.map(({ title, text }) => (
            <article key={title}>
              <span><Icon name="shield" /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
