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
import { faqs } from "@/data/faqs";

export default function Home() {
  const jsonLd = [{ "@context": "https://schema.org", "@type": "Organization", name: "Renoqo", url: "https://renoqo.com", slogan: "Estimate. Compare. Build." }, { "@context": "https://schema.org", "@type": "WebSite", name: "Renoqo", url: "https://renoqo.com", inLanguage: "fr-MA" }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><HeroSection /><TrustBar /><HowItWorks /><PopularServices /><CalculatorSection /><PriceOverview /><CitiesSection /><ProfessionalSection /><TransparencySection /><GuidesSection /><FAQSection /><FinalCTA /></>;
}
