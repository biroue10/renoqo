import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/get-dictionary";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";
import { localizedPath } from "@/i18n/locale-path";
import "./globals.css";

/**
 * With multiple root layouts the global not-found owns its own document.
 * A static export serves a single `404.html` for every unknown URL, in both
 * language trees, so this page addresses the reader in each language rather
 * than guessing one.
 */
export default function NotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <main className="inner-page" id="contenu">
          <Container>
            {LOCALES.map((locale) => {
              const d = getDictionary(locale);
              return (
                <section lang={locale} key={locale} className="not-found-block">
                  <p className="eyebrow">{d.notFound.eyebrow}</p>
                  <h1>{d.notFound.title}</h1>
                  <p className="inner-intro">{d.notFound.intro}</p>
                  <Link href={localizedPath(locale, "/")} className="button button-secondary">{d.common.backHome}</Link>
                </section>
              );
            })}
          </Container>
        </main>
      </body>
    </html>
  );
}
