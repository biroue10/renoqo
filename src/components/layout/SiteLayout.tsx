import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { globalStructuredData } from "@/lib/structured-data";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

/**
 * Shared chrome for every locale. Each locale has its own root layout so the
 * `lang` attribute is part of the exported HTML rather than patched by script.
 */
export function SiteLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const d = getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <JsonLd data={globalStructuredData(locale)} />
        <a className="skip-link" href="#contenu">{d.common.skipToContent}</a>
        <Header locale={locale} d={d} />
        <main id="contenu">{children}</main>
        <Footer locale={locale} d={d} />
        <GoogleAnalytics locale={locale} labels={d.analyticsConsent} />
      </body>
    </html>
  );
}
