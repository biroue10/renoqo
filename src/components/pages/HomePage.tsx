import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PopularServices } from "@/components/home/PopularServices";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { PriceOverview } from "@/components/home/PriceOverview";
import { CitiesSection } from "@/components/home/CitiesSection";
import { ProfessionalSection } from "@/components/home/ProfessionalSection";
import { TransparencySection } from "@/components/home/TransparencySection";
import { GuidesSection } from "@/components/home/GuidesSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { JsonLd } from "@/components/seo/JsonLd";

export function HomePage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: LOCALE_TAGS[locale],
      mainEntity: d.faq.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    };
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HeroSection locale={locale} d={d} />
      <TrustBar d={d} />
      <HowItWorks d={d} />
      <PopularServices locale={locale} d={d} />
      <CalculatorSection locale={locale} d={d} />
      <PriceOverview locale={locale} d={d} />
      <CitiesSection locale={locale} d={d} />
      <ProfessionalSection locale={locale} d={d} />
      <TransparencySection d={d} />
      <GuidesSection locale={locale} d={d} />
      <FAQSection labels={{ eyebrow: d.faq.eyebrow, title: d.faq.title, items: d.faq.items }} />
      <FinalCTA locale={locale} d={d} />
    </>
  );
}
