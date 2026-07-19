import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegistrationForm } from "@/components/professional/RegistrationForm";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/locale-path";
import { LOCALE_TAGS } from "@/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { FAQSection } from "@/components/home/FAQSection";

/**
 * "For professionals" landing page: what Renoqo offers, how the review works,
 * and the registration request form. Only the form is a client component.
 */
export function ProfessionalsPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = d.professionals;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.meta.title,
    description: p.meta.description,
    url: absoluteUrl(locale, "/pour-les-professionnels"),
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@type": "WebSite", name: d.meta.siteName, url: absoluteUrl(locale, "/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="pro-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <Container>
          <p className="eyebrow light-eyebrow">{p.hero.eyebrow}</p>
          <h1>{p.hero.title}</h1>
          <p className="pro-hero-lead">{p.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="button button-light" href="#inscription">{p.hero.primaryCta}</a>
            <a className="button button-secondary" href="#fonctionnement-pro">{p.hero.secondaryCta}</a>
          </div>
          <p className="pro-hero-trust">{p.hero.trust}</p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow={p.benefits.eyebrow} title={p.benefits.title} description={p.benefits.description} />
          <div className="pro-benefit-grid">
            {p.benefits.items.map((item) => (
              <article key={item.title}>
                <span><Icon name="check" size={18} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-tint" id="fonctionnement-pro">
        <Container>
          <SectionHeading eyebrow={p.howItWorks.eyebrow} title={p.howItWorks.title} description={p.howItWorks.description} />
          <div className="steps">
            {p.howItWorks.steps.map((step, index) => (
              <article key={step.title}>
                <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
                {index < p.howItWorks.steps.length - 1 && <span className="step-line" aria-hidden="true" />}
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <p className="notice notice-info">{p.howItWorks.disclaimer}</p>
        </Container>
      </section>

      <section className="section" id="inscription">
        <Container className="registration-layout">
          <div className="registration-intro">
            <p className="eyebrow">{p.form.eyebrow}</p>
            <h2>{p.form.title}</h2>
            <p>{p.form.intro}</p>
            <p className="field-help">{p.draft.note}</p>
          </div>
          <RegistrationForm
            locale={locale}
            labels={{
              form: p.form, fields: p.fields, consents: p.consents, review: p.review,
              draft: p.draft, submission: p.submission, errors: p.errors, options: p.options,
            }}
            legalLinks={{
              terms: localizedPath(locale, "/conditions-utilisation"),
              privacy: localizedPath(locale, "/politique-confidentialite"),
              home: localizedPath(locale, "/"),
              help: localizedPath(locale, "/centre-aide"),
            }}
          />
        </Container>
      </section>

      <section className="section section-tint">
        <Container>
          <SectionHeading eyebrow={p.quality.eyebrow} title={p.quality.title} description={p.quality.description} />
          <ul className="quality-list">
            {p.quality.items.map((item) => (
              <li key={item}><Icon name="check" size={18} />{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow={p.verification.eyebrow} title={p.verification.title} />
          <div className="commitments">
            {p.verification.items.map((item) => (
              <article key={item.title}>
                <span><Icon name="shield" /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
          <div className="notice">
            <strong>{p.verification.levelsTitle}</strong>
            <ul className="level-list">
              {p.verification.levels.map((level) => <li key={level}>{level}</li>)}
            </ul>
            <p>{p.verification.levelsNote}</p>
          </div>
        </Container>
      </section>

      <FAQSection labels={{ eyebrow: p.faq.eyebrow, title: p.faq.title, items: p.faq.items }} />
    </>
  );
}
