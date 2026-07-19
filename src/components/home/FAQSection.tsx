"use client";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FAQItem = { question: string; answer: string };
type Labels = { eyebrow: string; title: string; items: FAQItem[] };

/** Questions arrive as props so only the active locale reaches the browser. */
export function FAQSection({ labels }: { labels: Labels }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq-section">
      <Container>
        <SectionHeading eyebrow={labels.eyebrow} title={labels.title} />
        <div className="faq-list">
          {labels.items.map((faq, index) => {
            const active = open === index;
            return (
              <div className="faq-item" key={faq.question}>
                <h3>
                  <button type="button" aria-expanded={active} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} onClick={() => setOpen(active ? null : index)}>
                    <span>{faq.question}</span>
                    <span aria-hidden="true">{active ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!active}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
