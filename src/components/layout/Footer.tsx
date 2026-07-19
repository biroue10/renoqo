import { Container } from "@/components/ui/Container";
import { LocaleLink } from "@/components/ui/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { Logo } from "./Header";

/** Group and link keys resolve against `footer.groups` / `footer.links`. */
const GROUPS = [
  { group: "brand", links: [["about", "/a-propos"], ["howItWorks", "/#fonctionnement"], ["commitments", "/#engagements"], ["contact", "/contact"]] },
  { group: "projects", links: [["estimate", "/#estimation"], ["prices", "/prix"], ["calculators", "/calculateurs"], ["requestQuote", "/demander-un-devis"]] },
  { group: "pros", links: [["findPro", "/professionnels"], ["joinRenoqo", "/professionnels/inscription"], ["proSpace", "/pour-les-professionnels"], ["helpCenter", "/centre-aide"]] },
  { group: "legal", links: [["legalNotice", "/mentions-legales"], ["terms", "/conditions-utilisation"], ["privacy", "/politique-confidentialite"], ["cookies", "/politique-cookies"], ["reviewRules", "/regles-avis"]] },
] as const;

export function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <Logo locale={locale} label={d.common.logoLabel} light />
            <p className="footer-slogan">{d.footer.slogan}</p>
            <p>{d.footer.tagline}</p>
            <label htmlFor="footer-country">{d.common.countryAndMarket}</label>
            <select id="footer-country" defaultValue="ma">
              <option value="ma">{d.common.morocco}</option>
              <option disabled>{d.common.otherCountriesSoon}</option>
            </select>
          </div>
          {GROUPS.map(({ group, links }) => (
            <div className="footer-group" key={group}>
              <h2>{d.footer.groups[group]}</h2>
              {links.map(([key, href]) => (
                <LocaleLink locale={locale} href={href} key={href}>{d.footer.links[key]}</LocaleLink>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>{d.footer.rights(new Date().getFullYear())}</p>
          <div className="socials" aria-label={d.footer.socialsLabel}>
            <a href="#linkedin" aria-label={d.footer.linkedin}>in</a>
            <a href="#instagram" aria-label={d.footer.instagram}>ig</a>
            <a href="#facebook" aria-label={d.footer.facebook}>f</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
