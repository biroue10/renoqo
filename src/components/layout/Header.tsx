import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { LOCALE_LABELS, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { LanguageSwitcher, type LanguageLabels } from "./LanguageSwitcher";
import { MobileNavigation } from "./MobileNavigation";

/** Navigation targets are locale-agnostic; `LocaleLink` adds the prefix. */
export const NAVIGATION = [
  { key: "estimate", href: "/#estimation" },
  { key: "prices", href: "/prix" },
  { key: "findPro", href: "/professionnels" },
  { key: "guides", href: "/guides" },
  { key: "forPros", href: "/pour-les-professionnels" },
] as const;

export type NavItem = { label: string; href: string };

export function buildNavigation(d: Dictionary): NavItem[] {
  return NAVIGATION.map(({ key, href }) => ({ label: d.nav[key], href }));
}

export function Logo({ locale, label, light = false }: { locale: Locale; label: string; light?: boolean }) {
  return (
    <LocaleLink className={`logo ${light ? "logo-light" : ""}`} locale={locale} href="/" aria-label={label}>
      <span aria-hidden="true" className="logo-mark">R</span>
      <span>renoqo</span>
    </LocaleLink>
  );
}

/** Resolves the dictionary's label functions before they reach a client component. */
function languageLabels(locale: Locale, d: Dictionary): LanguageLabels {
  return {
    switcherLabel: d.language.switcherLabel,
    triggerLabel: d.language.triggerLabel(LOCALE_LABELS[locale]),
    notAvailableYet: d.language.notAvailableYet,
  };
}

function Selectors({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <div className="selectors">
      <label className="sr-only" htmlFor="country">{d.common.country}</label>
      <select id="country" defaultValue="ma">
        <option value="ma">{d.common.morocco}</option>
        {d.common.countriesSoon.map((label) => <option disabled key={label}>{label}</option>)}
      </select>
      <LanguageSwitcher locale={locale} labels={languageLabels(locale, d)} />
    </div>
  );
}

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const navigation = buildNavigation(d);
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Logo locale={locale} label={d.common.logoLabel} />
        <nav aria-label={d.nav.primaryLabel} className="desktop-nav">
          {navigation.map(({ label, href }) => <LocaleLink locale={locale} href={href} key={href}>{label}</LocaleLink>)}
        </nav>
        <div className="header-actions">
          <Selectors locale={locale} d={d} />
          <LocaleLink className="login-link" locale={locale} href="/connexion">{d.nav.signIn}</LocaleLink>
          <LocaleLink className="button button-primary compact" locale={locale} href="/demander-un-devis">{d.nav.requestQuotes}</LocaleLink>
        </div>
        <MobileNavigation
          locale={locale}
          navigation={navigation}
          labels={{
            mobileLabel: d.nav.mobileLabel,
            openMenu: d.nav.openMenu,
            closeMenu: d.nav.closeMenu,
            signIn: d.nav.signIn,
            requestQuotes: d.nav.requestQuotes,
            morocco: d.common.morocco,
            language: languageLabels(locale, d),
          }}
        />
      </Container>
    </header>
  );
}
