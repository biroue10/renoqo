"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LOCALES, LOCALE_BADGES, LOCALE_LABELS, LOCALE_STORAGE_KEY, PLANNED_LOCALES, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/locale-path";

/** Fully resolved strings: functions cannot cross the server/client boundary. */
export type LanguageLabels = { switcherLabel: string; triggerLabel: string; notAvailableYet: string };

/**
 * The URL is the source of truth for the language: every entry is a real link
 * to the counterpart page, so switching works without JavaScript and is
 * crawlable. `localStorage` only records the preference for later visits.
 */
export function LanguageSwitcher({ locale, labels }: { locale: Locale; labels: LanguageLabels }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "/";
  // The header and the mobile menu both render a switcher between 820px and
  // 1100px, so the menu id has to be unique per instance.
  const menuId = `language-menu-${useId()}`;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const remember = (next: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Private browsing or a full quota must never block navigation.
    }
    setOpen(false);
  };

  return (
    <div className="language-switcher" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={labels.triggerLabel}
        onClick={() => setOpen(!open)}
      >
        {LOCALE_BADGES[locale]}
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="language-menu" id={menuId} role="menu">
          {LOCALES.map((code) => (
            <li key={code} role="none">
              <Link
                role="menuitem"
                href={switchLocalePath(code, pathname)}
                hrefLang={code}
                lang={code}
                aria-current={code === locale ? "true" : undefined}
                onClick={() => remember(code)}
              >
                {LOCALE_LABELS[code]}
              </Link>
            </li>
          ))}
          {PLANNED_LOCALES.map(({ code, label }) => (
            <li key={code} role="none">
              <span role="menuitem" className="language-planned" aria-disabled="true" tabIndex={-1}>
                <span lang={code}>{label}</span> — {labels.notAvailableYet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
