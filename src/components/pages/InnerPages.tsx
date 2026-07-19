import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ui/ListingPage";
import { calculators } from "@/data/services";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";

const listingLabels = (d: Dictionary) => ({ learnMore: d.common.learnMore, comingSoon: d.common.comingSoon, backHome: d.common.backHome });

export function CalculatorsPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.calculators.pageEyebrow}
      title={d.calculators.pageTitle}
      intro={d.calculators.pageIntro}
      items={calculators.map(({ slug }) => ({ id: slug, title: d.calculators.items[slug].title, text: d.calculators.items[slug].description }))}
    />
  );
}

export function PricesPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.prices.pageEyebrow}
      title={d.prices.pageTitle}
      intro={d.prices.pageIntro}
      items={d.prices.pageItems.map((item) => ({ title: item.title, text: item.text }))}
    />
  );
}

export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.guides.pageEyebrow}
      title={d.guides.pageTitle}
      intro={d.guides.pageIntro}
      items={guides.map(({ slug }) => ({ title: d.guides.items[slug].title, text: d.guides.items[slug].summary, href: `/guides/${slug}` }))}
    />
  );
}

/** Resolves a catch-all slug to its translated title and intro, or `null`. */
export function resolveSlug(locale: Locale, slug: string): { title: string; text: string } | null {
  const d = getDictionary(locale);

  const service = services.find((item) => `services/${item.slug}` === slug);
  if (service) return { title: d.services.items[service.slug].title, text: d.services.items[service.slug].description };

  const city = cities.find((item) => `villes/${item.slug}` === slug);
  if (city) return { title: d.cities.pageTitle(city.name), text: d.cities.pageText(city.name) };

  const guide = guides.find((item) => `guides/${item.slug}` === slug);
  if (guide) return { title: d.guides.items[guide.slug].title, text: `${d.guides.items[guide.slug].summary} ${d.guides.detailSuffix}` };

  const staticTitle = (d.staticPages as Record<string, string | undefined>)[slug];
  if (staticTitle) return { title: staticTitle, text: d.listing.staticText };

  return null;
}

export function CatchAllPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDictionary(locale);
  const value = resolveSlug(locale, slug);
  if (!value) notFound();
  return (
    <ListingPage
      locale={locale}
      labels={listingLabels(d)}
      eyebrow={d.common.eyebrowMorocco}
      title={value.title}
      intro={value.text}
      items={[{ title: d.listing.preparingTitle, text: d.listing.preparingText }]}
    />
  );
}
