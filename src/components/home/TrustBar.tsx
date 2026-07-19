import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n/types";

export function TrustBar({ d }: { d: Dictionary }) {
  return (
    <section className="trust-bar" aria-label={d.trustBar.label}>
      <Container>
        <div className="trust-grid">
          {d.trustBar.items.map(({ title, text }) => (
            <div key={title}>
              <span className="trust-icon"><Icon name="check" size={19} /></span>
              <p><strong>{title}</strong><small>{text}</small></p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
