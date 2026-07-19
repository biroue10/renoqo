import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ui/ListingPage";
import { calculators } from "@/data/services";
import { cities } from "@/data/cities";
import { guideArticles, guidePath } from "@/data/guides";
import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbStructuredData, webpageStructuredData } from "@/lib/structured-data";

const listingLabels = (d: Dictionary) => ({ learnMore: d.common.learnMore, comingSoon: d.common.comingSoon, backHome: d.common.backHome });

export function CalculatorsPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <><JsonLd data={[webpageStructuredData(locale, "/calculateurs", d.calculators.pageTitle, d.calculators.pageIntro), breadcrumbStructuredData(locale, [{ name: locale === "fr" ? "Accueil" : "Home", path: "/" }, { name: d.calculators.pageTitle, path: "/calculateurs" }])]} />
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.calculators.pageEyebrow}
      title={d.calculators.pageTitle}
      intro={d.calculators.pageIntro}
      items={calculators.map(({ slug }) => ({ id: slug, title: d.calculators.items[slug].title, text: d.calculators.items[slug].description }))}
    /></>
  );
}

export function PricesPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <><JsonLd data={[webpageStructuredData(locale, "/prix", d.prices.pageTitle, d.prices.pageIntro), breadcrumbStructuredData(locale, [{ name: locale === "fr" ? "Accueil" : "Home", path: "/" }, { name: d.prices.pageTitle, path: "/prix" }])]} />
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.prices.pageEyebrow}
      title={d.prices.pageTitle}
      intro={d.prices.pageIntro}
      items={d.prices.pageItems.map((item) => ({ title: item.title, text: item.text }))}
    /></>
  );
}

export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const copy = locale === "fr" ? { home: "Accueil", updated: "Mis à jour le", read: "Lire le guide", calc: "Calculer le coût estimatif de vos travaux", quote: "Demander plusieurs devis" } : { home: "Home", updated: "Updated", read: "Read the guide", calc: "Calculate an indicative project estimate", quote: "Request several quotes" };
  const items = guideArticles.filter((item) => item.locale === locale);
  return <><JsonLd data={[webpageStructuredData(locale, "/guides", d.guides.pageTitle, d.guides.pageIntro), breadcrumbStructuredData(locale, [{ name: copy.home, path: "/" }, { name: d.guides.pageTitle, path: "/guides" }])]} /><main className="inner-page guides-index"><Container>
    <nav className="breadcrumb" aria-label="Breadcrumb"><LocaleLink locale={locale} href="/">{copy.home}</LocaleLink><span aria-hidden="true">/</span><span aria-current="page">{d.guides.pageTitle}</span></nav>
    <p className="eyebrow">{d.guides.pageEyebrow}</p><h1>{d.guides.pageTitle}</h1><p className="inner-intro">{d.guides.pageIntro}</p>
    <div className="listing-grid">{items.map((item) => <article key={item.key}><p className="eyebrow">{item.category}</p><h2>{item.title}</h2><p>{item.excerpt}</p><p className="guide-card-meta">{item.readingTime} min · {copy.updated} <time dateTime={item.modifiedAt}>{item.modifiedAt}</time></p><LocaleLink className="text-link" locale={locale} href={guidePath(item)} aria-label={`${copy.read}: ${item.title}`}>{copy.read} →</LocaleLink></article>)}</div>
    <div className="guides-index-actions"><LocaleLink className="button button-primary" locale={locale} href="/calculateurs">{copy.calc}</LocaleLink><LocaleLink className="button button-secondary" locale={locale} href="/demander-un-devis">{copy.quote}</LocaleLink></div>
  </Container></main></>;
}

/** Resolves a catch-all slug to its translated title and intro, or `null`. */
export function resolveSlug(locale: Locale, slug: string): { title: string; text: string } | null {
  const d = getDictionary(locale);

  const service = services.find((item) => `services/${item.slug}` === slug);
  if (service) return { title: d.services.items[service.slug].title, text: d.services.items[service.slug].description };

  const city = cities.find((item) => `villes/${item.slug}` === slug);
  if (city) return { title: d.cities.pageTitle(city.name), text: d.cities.pageText(city.name) };

  const staticTitle = (d.staticPages as Record<string, string | undefined>)[slug];
  if (staticTitle) return { title: staticTitle, text: d.listing.staticText };

  return null;
}

export function CatchAllPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDictionary(locale);
  const value = resolveSlug(locale, slug);
  if (!value) notFound();
  return (
    <><JsonLd data={[webpageStructuredData(locale, `/${slug}`, value.title, value.text), breadcrumbStructuredData(locale, [{ name: locale === "fr" ? "Accueil" : "Home", path: "/" }, { name: value.title, path: `/${slug}` }])]} /><ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.common.eyebrowMorocco}
      title={value.title}
      intro={value.text}
      items={[{ title: d.listing.preparingTitle, text: d.listing.preparingText }]}
    /></>
  );
}
