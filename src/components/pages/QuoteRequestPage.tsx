import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { QuoteRequestForm } from "@/components/quote-request/QuoteRequestForm";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LOCALE_TAGS } from "@/i18n/config";
import { absoluteUrl, SITE_URL } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export function QuoteRequestPage({locale}:{locale:Locale}){const d=getDictionary(locale);const q=d.quoteRequest;const url=absoluteUrl(locale,"/demander-un-devis");const jsonLd=[{"@context":"https://schema.org","@type":"WebPage",name:q.meta.title,description:q.meta.description,url,inLanguage:LOCALE_TAGS[locale],isPartOf:{"@type":"WebSite",name:"Renoqo",url:SITE_URL}},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:locale==="fr"?"Accueil":"Home",item:absoluteUrl(locale,"/")},{"@type":"ListItem",position:2,name:q.hero.title,item:url}]},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:q.faq.items.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))}];return <>
 <JsonLd data={jsonLd}/>
 <section className="quote-hero"><Container><nav className="breadcrumb" aria-label="Breadcrumb"><LocaleLink locale={locale} href="/">{locale==="fr"?"Accueil":"Home"}</LocaleLink><span>/</span><span aria-current="page">{q.hero.eyebrow}</span></nav><p className="eyebrow">{q.hero.eyebrow}</p><h1>{q.hero.title}</h1><h2>{q.hero.displayTitle}</h2><p>{q.hero.description}</p><a className="button button-primary" href="#quote-form">{q.hero.button}</a><p className="quote-trust">{q.hero.trust}</p></Container></section>
 <section className="section"><Container><h2 className="quote-section-title">{q.benefits.title}</h2><div className="quote-benefits">{q.benefits.items.map(item=><div key={item}><Icon name="check"/><span>{item}</span></div>)}</div></Container></section>
 <section className="section section-tint"><Container><h2 className="quote-section-title">{q.how.title}</h2><div className="steps">{q.how.steps.map((s,i)=><article key={s}><div className="step-number">{i+1}</div><h3>{s}</h3></article>)}</div><p className="notice notice-info">{q.how.notice}</p></Container></section>
 <section className="section" id="quote-form"><Container className="quote-layout"><aside className="quote-form-intro"><p className="eyebrow">{q.hero.eyebrow}</p><h2>{q.form.title}</h2><p>{q.form.intro}</p><ul>{q.quality.items.map(item=><li key={item}>{item}</li>)}</ul></aside><QuoteRequestForm locale={locale} labels={q}/></Container></section>
 <section className="section section-tint"><Container><div className="quote-info-grid"><article><h2>{q.quality.title}</h2><ul>{q.quality.items.map(item=><li key={item}><Icon name="check"/>{item}</li>)}</ul></article><article><h2>{q.after.title}</h2><ol>{q.after.items.map(item=><li key={item}>{item}</li>)}</ol></article></div></Container></section>
 <section className="section"><Container><h2 className="quote-section-title">{q.faq.title}</h2><div className="quote-faq">{q.faq.items.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></Container></section>
 </>}
