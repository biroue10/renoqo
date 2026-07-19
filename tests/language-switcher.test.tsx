import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LOCALE_LABELS, LOCALE_STORAGE_KEY } from "@/i18n/config";
import { fr } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";

/** Mirrors what the server resolves before handing labels to the client component. */
const labelsFor = (locale: Locale) => ({
  switcherLabel: fr.language.switcherLabel,
  triggerLabel: fr.language.triggerLabel(LOCALE_LABELS[locale]),
  notAvailableYet: fr.language.notAvailableYet,
});

const pathname = vi.fn(() => "/services/renovation/");
vi.mock("next/navigation", () => ({ usePathname: () => pathname() }));

const open = () => fireEvent.click(screen.getByRole("button"));

/** `next/link` normalises the trailing slash in jsdom; the real value is covered by locale-path tests. */
const hrefOf = (name: string | RegExp) =>
  screen.getByRole("menuitem", { name }).getAttribute("href")?.replace(/(.)\/$/, "$1") ?? null;

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    pathname.mockReturnValue("/services/renovation/");
    localStorage.clear();
  });

  afterEach(cleanup);

  it("links each language to the counterpart of the current page", () => {
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    open();
    expect(hrefOf("Français")).toBe("/services/renovation");
    expect(hrefOf("English")).toBe("/en/services/renovation");
  });

  it("links back to the French page from an English page", () => {
    pathname.mockReturnValue("/en/villes/casablanca/");
    render(<LanguageSwitcher locale="en" labels={labelsFor("en")} />);
    open();
    expect(hrefOf("Français")).toBe("/villes/casablanca");
  });

  it("marks the active language with aria-current", () => {
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    open();
    expect(screen.getByRole("menuitem", { name: "Français" }).getAttribute("aria-current")).toBe("true");
    expect(screen.getByRole("menuitem", { name: "English" }).getAttribute("aria-current")).toBeNull();
  });

  it("shows Arabic as disabled and not clickable", () => {
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    open();
    const arabic = screen.getByRole("menuitem", { name: /العربية/ });
    expect(arabic.getAttribute("aria-disabled")).toBe("true");
    expect(arabic.tagName).toBe("SPAN");
    expect(arabic.getAttribute("href")).toBeNull();
    expect(arabic.textContent).toContain("bientôt");
  });

  it("records the preference and closes the menu on selection", () => {
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    open();
    fireEvent.click(screen.getByRole("menuitem", { name: "English" }));
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en");
    expect(screen.queryByRole("menuitem", { name: "English" })).toBeNull();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    const trigger = screen.getByRole("button");
    open();
    expect(screen.getByRole("menuitem", { name: "English" })).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menuitem", { name: "English" })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("falls back to the home page when the current URL has no counterpart", () => {
    pathname.mockReturnValue("/une-page-supprimee/");
    render(<LanguageSwitcher locale="fr" labels={labelsFor("fr")} />);
    open();
    expect(hrefOf("English")).toBe("/en");
  });
});
