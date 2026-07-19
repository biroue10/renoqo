"use client";
import { useEffect, useRef, useState } from "react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher, type LanguageLabels } from "./LanguageSwitcher";
import type { NavItem } from "./Header";

type Labels = {
  mobileLabel: string;
  openMenu: string;
  closeMenu: string;
  signIn: string;
  requestQuotes: string;
  morocco: string;
  language: LanguageLabels;
};

export function MobileNavigation({ locale, navigation, labels }: { locale: Locale; navigation: NavItem[]; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button ref={button} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">{open ? labels.closeMenu : labels.openMenu}</span>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label={labels.mobileLabel}>
          <div className="mobile-selects">
            <span>{labels.morocco}</span>
            <LanguageSwitcher locale={locale} labels={labels.language} />
          </div>
          {navigation.map(({ label, href }) => (
            <LocaleLink locale={locale} href={href} onClick={() => setOpen(false)} key={href}>{label}</LocaleLink>
          ))}
          <LocaleLink locale={locale} href="/connexion" onClick={() => setOpen(false)}>{labels.signIn}</LocaleLink>
          <LocaleLink className="button button-primary" locale={locale} href="/demander-un-devis" onClick={() => setOpen(false)}>{labels.requestQuotes}</LocaleLink>
        </nav>
      )}
    </div>
  );
}
