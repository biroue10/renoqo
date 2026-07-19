import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RegistrationForm } from "@/components/professional/RegistrationForm";
import { DRAFT_STORAGE_KEY } from "@/lib/professional-registration/constants";
import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import type { Dictionary } from "@/i18n/types";

const legalLinks = { terms: "/conditions-utilisation", privacy: "/politique-confidentialite", home: "/", help: "/centre-aide" };

const labelsOf = (d: Dictionary) => ({
  form: d.professionals.form, fields: d.professionals.fields, consents: d.professionals.consents,
  review: d.professionals.review, draft: d.professionals.draft, submission: d.professionals.submission,
  errors: d.professionals.errors, options: d.professionals.options,
});

const renderForm = (locale: Locale = "fr") => {
  const d = locale === "fr" ? fr : en;
  return render(<RegistrationForm locale={locale} labels={labelsOf(d)} legalLinks={legalLinks} />);
};

const dict = (locale: Locale) => (locale === "fr" ? fr : en).professionals;

const clickNext = (locale: Locale = "fr") =>
  fireEvent.click(screen.getByRole("button", { name: dict(locale).form.next }));

const setInput = (id: string, value: string) => {
  const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  fireEvent.change(element, { target: { value } });
};

const check = (id: string) => fireEvent.click(document.getElementById(id) as HTMLInputElement);

/** Fills step 1 with valid values so navigation can proceed. */
function fillContact() {
  setInput("contact.firstName", "Youssef");
  setInput("contact.lastName", "Benali");
  setInput("contact.email", "contact@atelier.ma");
  setInput("contact.phone", "0612345678");
  setInput("contact.contactLanguage", "fr");
  setInput("contact.role", "owner");
}

function fillBusiness() {
  setInput("business.professionalType", "company");
  setInput("business.tradeName", "Atelier Bâtiment");
  setInput("business.city", "casablanca");
}

describe("RegistrationForm navigation", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("starts on step 1 of 6", () => {
    renderForm();
    expect(screen.getByText("Étape 1 sur 6")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: fr.professionals.form.steps[0].title })).toBeTruthy();
  });

  it("blocks the next step and lists the errors when required fields are empty", () => {
    renderForm();
    clickNext();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText(fr.professionals.form.errorSummaryTitle)).toBeTruthy();
    // Still on step 1.
    expect(screen.getByText("Étape 1 sur 6")).toBeTruthy();
  });

  it("marks invalid controls with aria-invalid and links the message", () => {
    renderForm();
    clickNext();
    const email = document.getElementById("contact.email") as HTMLInputElement;
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(email.getAttribute("aria-describedby")).toContain("contact.email-error");
  });

  it("advances once step 1 is valid, and goes back again", () => {
    renderForm();
    fillContact();
    clickNext();
    expect(screen.getByText("Étape 2 sur 6")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: fr.professionals.form.previous }));
    expect(screen.getByText("Étape 1 sur 6")).toBeTruthy();
    // Values entered earlier survive the round trip.
    expect((document.getElementById("contact.firstName") as HTMLInputElement).value).toBe("Youssef");
  });

  it("exposes an accessible progress bar", () => {
    renderForm();
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("1");
    expect(bar.getAttribute("aria-valuemax")).toBe("6");
    expect(bar.getAttribute("aria-label")).toBe(fr.professionals.form.progressLabel);
  });

  it("reveals the conditional field when the role is 'other'", () => {
    renderForm();
    expect(document.getElementById("contact.roleOther")).toBeNull();
    setInput("contact.role", "other");
    expect(document.getElementById("contact.roleOther")).not.toBeNull();
  });

  it("shows the Moroccan business identifiers as optional", () => {
    renderForm();
    fillContact();
    clickNext();
    for (const id of ["ice", "rc", "taxId", "cnss"]) {
      expect(document.getElementById(`business.businessIds.${id}`)).not.toBeNull();
    }
    // Leaving every identifier empty must not block the step.
    fillBusiness();
    clickNext();
    expect(screen.getByText("Étape 3 sur 6")).toBeTruthy();
  });

  it("offers every trade and allows several secondary trades", () => {
    renderForm();
    fillContact(); clickNext();
    fillBusiness(); clickNext();

    const primary = document.getElementById("services.primaryTrade") as HTMLSelectElement;
    expect(primary.options.length).toBe(Object.keys(fr.professionals.options.trades).length + 1);

    setInput("services.primaryTrade", "plumbing");
    const group = screen.getByRole("group", { name: new RegExp(fr.professionals.fields.secondaryTrades) });
    fireEvent.click(within(group).getByRole("checkbox", { name: fr.professionals.options.trades.tiling }));
    fireEvent.click(within(group).getByRole("checkbox", { name: fr.professionals.options.trades.painting }));
    expect(screen.getByText("2 sélectionnés")).toBeTruthy();
    // The chosen main trade is not offered again as a secondary one.
    expect(within(group).queryByRole("checkbox", { name: fr.professionals.options.trades.plumbing })).toBeNull();
  });

  it("reveals the free-text field when the main trade is 'other'", () => {
    renderForm();
    fillContact(); clickNext();
    fillBusiness(); clickNext();
    expect(document.getElementById("services.primaryTradeOther")).toBeNull();
    setInput("services.primaryTrade", "other");
    expect(document.getElementById("services.primaryTradeOther")).not.toBeNull();
  });
});

describe("RegistrationForm consents and review", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  const goToPreferences = () => {
    fillContact(); clickNext();
    fillBusiness(); clickNext();
    setInput("services.primaryTrade", "plumbing");
    fireEvent.click(screen.getByRole("checkbox", { name: fr.professionals.options.projectTypes.apartment }));
    fireEvent.click(screen.getByRole("radio", { name: fr.professionals.options.clientTypes.both }));
    clickNext();
    setInput("coverage.mainCity", "casablanca");
    setInput("coverage.availability", "available_now");
    clickNext();
    setInput("presentation.description", "a".repeat(150));
    fireEvent.click(screen.getByRole("checkbox", { name: fr.professionals.options.spokenLanguages.french }));
    clickNext();
  };

  it("never pre-ticks a consent box", () => {
    renderForm();
    goToPreferences();
    for (const id of ["preferences.acceptProfessionalTerms", "preferences.acceptPrivacyPolicy",
                      "preferences.confirmAccuracy", "preferences.allowContactAboutApplication",
                      "preferences.acceptMarketing"]) {
      expect((document.getElementById(id) as HTMLInputElement).checked).toBe(false);
    }
  });

  it("links the legal pages in the active language", () => {
    renderForm();
    goToPreferences();
    expect(screen.getByRole("link", { name: fr.professionals.consents.termsLink }).getAttribute("href")).toBe("/conditions-utilisation");
    expect(screen.getByRole("link", { name: fr.professionals.consents.privacyLink }).getAttribute("href")).toBe("/politique-confidentialite");
  });

  it("requires the four mandatory consents but not marketing", () => {
    renderForm();
    goToPreferences();
    fireEvent.click(screen.getByRole("checkbox", { name: fr.professionals.options.channels.email }));
    setInput("preferences.notificationFrequency", "daily");
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.form.review }));
    expect(screen.getByText(fr.professionals.form.errorSummaryTitle)).toBeTruthy();

    check("preferences.acceptProfessionalTerms");
    check("preferences.acceptPrivacyPolicy");
    check("preferences.confirmAccuracy");
    check("preferences.allowContactAboutApplication");
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.form.review }));

    // Marketing left unchecked, yet the review screen is reached.
    expect(screen.getByRole("heading", { name: fr.professionals.review.title })).toBeTruthy();
  });

  it("summarises the answers and hides administrative identifiers", () => {
    renderForm();
    goToPreferences();
    fireEvent.click(screen.getByRole("checkbox", { name: fr.professionals.options.channels.email }));
    setInput("preferences.notificationFrequency", "daily");
    check("preferences.acceptProfessionalTerms");
    check("preferences.acceptPrivacyPolicy");
    check("preferences.confirmAccuracy");
    check("preferences.allowContactAboutApplication");
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.form.review }));

    expect(screen.getByText("Youssef Benali")).toBeTruthy();
    expect(screen.getByText("contact@atelier.ma")).toBeTruthy();
    expect(screen.getByText(fr.professionals.options.trades.plumbing)).toBeTruthy();
    expect(screen.getByText(fr.professionals.review.hiddenNote)).toBeTruthy();
  });

  it("returns to a chosen step from the review screen", () => {
    renderForm();
    goToPreferences();
    fireEvent.click(screen.getByRole("checkbox", { name: fr.professionals.options.channels.email }));
    setInput("preferences.notificationFrequency", "daily");
    check("preferences.acceptProfessionalTerms");
    check("preferences.acceptPrivacyPolicy");
    check("preferences.confirmAccuracy");
    check("preferences.allowContactAboutApplication");
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.form.review }));

    const editButtons = screen.getAllByRole("button", { name: new RegExp(fr.professionals.form.edit) });
    fireEvent.click(editButtons[0]);
    expect(screen.getByText("Étape 1 sur 6")).toBeTruthy();
  });
});

describe("RegistrationForm draft", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("autosaves entered answers without any file or identifier", async () => {
    vi.useFakeTimers();
    renderForm();
    fillContact();
    await vi.advanceTimersByTimeAsync(1200);
    vi.useRealTimers();

    const raw = localStorage.getItem(DRAFT_STORAGE_KEY) ?? "";
    expect(raw).toContain("Youssef");
    expect(raw).not.toContain("portfolio");
  });

  it("restores a saved draft on mount", () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
      version: 1, savedAt: new Date().toISOString(),
      data: { contact: { firstName: "Salma" } },
    }));
    renderForm();
    expect((document.getElementById("contact.firstName") as HTMLInputElement).value).toBe("Salma");
    expect(screen.getByText(fr.professionals.draft.restored)).toBeTruthy();
  });

  it("clears the draft after confirmation", async () => {
    vi.useFakeTimers();
    renderForm();
    fillContact();
    await vi.advanceTimersByTimeAsync(1200);
    vi.useRealTimers();

    vi.spyOn(window, "confirm").mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.draft.clear }));
    expect(localStorage.getItem(DRAFT_STORAGE_KEY)).toBeNull();
    expect((document.getElementById("contact.firstName") as HTMLInputElement).value).toBe("");
    vi.restoreAllMocks();
  });

  it("keeps the draft when the confirmation is declined", async () => {
    vi.useFakeTimers();
    renderForm();
    fillContact();
    await vi.advanceTimersByTimeAsync(1200);
    vi.useRealTimers();

    vi.spyOn(window, "confirm").mockReturnValue(false);
    fireEvent.click(screen.getByRole("button", { name: fr.professionals.draft.clear }));
    expect(localStorage.getItem(DRAFT_STORAGE_KEY)).not.toBeNull();
    vi.restoreAllMocks();
  });
});

describe("RegistrationForm in English", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("renders every label in English", () => {
    renderForm("en");
    expect(screen.getByText("Step 1 of 6")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: en.professionals.form.steps[0].title })).toBeTruthy();
    expect(screen.getByRole("button", { name: en.professionals.form.next })).toBeTruthy();
  });

  it("shows English validation messages", () => {
    renderForm("en");
    clickNext("en");
    expect(screen.getByText(en.professionals.form.errorSummaryTitle)).toBeTruthy();
    expect(screen.getAllByText(en.professionals.errors.required).length).toBeGreaterThan(0);
  });

  it("submits the same internal ids whatever the reading language", () => {
    // Option values are stable ids; only the visible label changes.
    renderForm("en");
    const language = document.getElementById("contact.contactLanguage") as HTMLSelectElement;
    const values = Array.from(language.options).map((option) => option.value);
    cleanup();

    renderForm("fr");
    const frenchSelect = document.getElementById("contact.contactLanguage") as HTMLSelectElement;
    expect(Array.from(frenchSelect.options).map((option) => option.value)).toEqual(values);
  });

  it("warns that the service is unavailable while no endpoint is configured", () => {
    renderForm("en");
    expect(screen.getByText(en.professionals.submission.errors.endpoint_not_configured)).toBeTruthy();
  });
});
