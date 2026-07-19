import type { GuideArticle, GuideBlock } from "@/content/guides/types";
import { getGuideByKey, guidePath } from "@/data/guides";
import { LOCALE_TAGS } from "@/i18n/config";
import { absoluteGuideUrl, SITE_URL } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";

const copy = {
  fr: { guides: "Guides", answer: "Réponse courte", takeaways: "À retenir", toc: "Sommaire", checklist: "Checklist avant de commencer", faq: "Questions fréquentes", method: "Méthodologie éditoriale", methodText: "Ce guide ne publie aucun prix de marché non vérifié. Les exemples sont pédagogiques, fictifs et non contractuels. Les données et règles éventuelles doivent être vérifiées selon le projet auprès de professionnels et de sources officielles actuelles. L’équipe Renoqo révise le périmètre, les liens, les dates et les sources lors de chaque mise à jour.", published: "Publié le", updated: "Mis à jour le", reading: "min de lecture", related: "Guides associés", calculator: "Calculer le coût estimatif de vos travaux", quote: "Comparer plusieurs devis de professionnels", prices: "Consulter les prix indicatifs des travaux", services: "Services utiles", disclaimer: "Les résultats restent indicatifs et varient selon le projet, les matériaux, l’accès et les professionnels consultés." },
  en: { guides: "Guides", answer: "Short answer", takeaways: "Key points", toc: "Contents", checklist: "Pre-project checklist", faq: "Frequently asked questions", method: "Editorial methodology", methodText: "This guide publishes no unverified market prices. Examples are educational, fictional and non-contractual. Any applicable data or rules should be checked for the specific project with professionals and current official sources. The Renoqo team reviews scope, links, dates and sources whenever the article is updated.", published: "Published", updated: "Updated", reading: "min read", related: "Related guides", calculator: "Calculate an indicative project estimate", quote: "Request and compare several professional quotes", prices: "Review indicative project prices", services: "Useful services", disclaimer: "Results remain indicative and vary with scope, materials, access and the professionals consulted." },
} as const;

function Block({ block }: { block: GuideBlock }) {
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return <Tag>{block.items.map((item) => <li key={item}>{item}</li>)}</Tag>;
  }
  if (block.type === "table") return <div className="guide-table-wrap"><table><caption>{block.caption}</caption><thead><tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
  return <aside className={`guide-callout ${block.type}`}><strong>{block.title}</strong><p>{block.text}</p></aside>;
}

export function GuideArticlePage({ article }: { article: GuideArticle }) {
  const t = copy[article.locale];
  const date = (value: string) => new Intl.DateTimeFormat(article.locale === "fr" ? "fr-MA" : "en-MA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
  const canonical = absoluteGuideUrl(article);
  const organizationId = `${SITE_URL.replace(/\/$/, "")}#organization`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: `${SITE_URL.replace(/\/$/, "")}/og-renoqo.png`, datePublished: article.publishedAt, dateModified: article.modifiedAt, author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", "@id": organizationId, name: "Renoqo", url: SITE_URL }, mainEntityOfPage: canonical, inLanguage: LOCALE_TAGS[article.locale] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.guides, item: `${SITE_URL.replace(/\/$/, "")}${article.locale === "en" ? "/en/guides/" : "/guides/"}` }, { "@type": "ListItem", position: 2, name: article.title, item: canonical }] },
  ];
  return <main className="guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <Container>
      <nav className="breadcrumb" aria-label="Breadcrumb"><LocaleLink locale={article.locale} href="/guides">{t.guides}</LocaleLink><span aria-hidden="true">/</span><span aria-current="page">{article.category}</span></nav>
      <header className="guide-header">
        <p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="guide-lead">{article.excerpt}</p>
        <div className="guide-meta"><span>{article.author}</span><span>{t.published} <time dateTime={article.publishedAt}>{date(article.publishedAt)}</time></span><span>{t.updated} <time dateTime={article.modifiedAt}>{date(article.modifiedAt)}</time></span><span>{article.readingTime} {t.reading}</span></div>
      </header>
      <div className="guide-layout"><article className="guide-content">
        <section className="guide-answer" aria-labelledby="short-answer"><h2 id="short-answer">{t.answer}</h2><p>{article.shortAnswer}</p></section>
        <section className="guide-takeaways" aria-labelledby="takeaways"><h2 id="takeaways">{t.takeaways}</h2><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <nav className="guide-toc" aria-labelledby="toc-title"><h2 id="toc-title">{t.toc}</h2><ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#checklist">{t.checklist}</a></li><li><a href="#faq">{t.faq}</a></li></ol></nav>
        {article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.blocks.map((block, index) => <Block block={block} key={index} />)}{section.subsections?.map((subsection) => <div id={subsection.id} key={subsection.id}><h3>{subsection.title}</h3>{subsection.blocks.map((block, index) => <Block block={block} key={index} />)}</div>)}</section>)}
        <section id="checklist" className="guide-checklist"><h2>{t.checklist}</h2><ul>{article.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section id="faq"><h2>{t.faq}</h2>{article.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
        <aside className="guide-method"><h2>{t.method}</h2><p>{t.methodText}</p><p><strong>{t.updated} :</strong> {date(article.modifiedAt)}. {t.disclaimer}</p></aside>
      </article><aside className="guide-sidebar"><strong>{t.calculator}</strong><p>{t.disclaimer}</p><LocaleLink className="button button-primary" locale={article.locale} href="/calculateurs">{t.calculator}</LocaleLink><LocaleLink className="button button-secondary" locale={article.locale} href="/demander-un-devis">{t.quote}</LocaleLink></aside></div>
      <section className="guide-links"><h2>{t.services}</h2><div><LocaleLink locale={article.locale} href="/prix">{t.prices}</LocaleLink><LocaleLink locale={article.locale} href="/services/renovation">{article.locale === "fr" ? "Services de rénovation" : "Renovation services"}</LocaleLink><LocaleLink locale={article.locale} href="/services/construction">{article.locale === "fr" ? "Services de construction" : "Construction services"}</LocaleLink><LocaleLink locale={article.locale} href="/services/peinture">{article.locale === "fr" ? "Travaux de peinture" : "Painting services"}</LocaleLink><LocaleLink locale={article.locale} href="/services/plomberie">{article.locale === "fr" ? "Travaux de plomberie" : "Plumbing services"}</LocaleLink><LocaleLink locale={article.locale} href="/services/electricite">{article.locale === "fr" ? "Travaux d’électricité" : "Electrical services"}</LocaleLink><LocaleLink locale={article.locale} href="/pour-les-professionnels">{article.locale === "fr" ? "Rejoindre Renoqo comme professionnel" : "Join Renoqo as a professional"}</LocaleLink></div></section>
      <section className="guide-related"><h2>{t.related}</h2><div>{article.relatedKeys.map((key) => { const related = getGuideByKey(article.locale, key); return <article key={key}><p className="eyebrow">{related.category}</p><h3>{related.title}</h3><p>{related.excerpt}</p><LocaleLink locale={article.locale} href={guidePath(related)}>{related.title}</LocaleLink></article>; })}</div></section>
      <section className="guide-final-cta"><h2>{article.locale === "fr" ? "Passez de la préparation à une estimation concrète" : "Turn your plan into a practical estimate"}</h2><LocaleLink className="button button-primary" locale={article.locale} href="/demander-un-devis">{t.quote}</LocaleLink><LocaleLink className="button button-secondary" locale={article.locale} href="/calculateurs">{t.calculator}</LocaleLink></section>
    </Container>
  </main>;
}
