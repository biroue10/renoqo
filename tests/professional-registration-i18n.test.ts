import { describe, expect, it } from "vitest";
import {
  APPLICATION_STATUSES, AVAILABILITY_STATES, CLIENT_TYPES, CONTACT_CHANNELS, CONTACT_LANGUAGES,
  CONTACT_ROLES, COUNTRIES, COUNTRY_BUSINESS_FIELDS, COVERAGE_CITIES, NOTIFICATION_FREQUENCIES,
  PROFESSIONAL_TYPES, PROJECT_TYPES, SPOKEN_LANGUAGES, TRADES, TOTAL_STEPS, WEEK_DAYS,
} from "@/lib/professional-registration/constants";
import { STEP_ORDER } from "@/lib/professional-registration/schema";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import type { Dictionary } from "@/i18n/types";

const OPTION_SETS: [string, readonly string[], (d: Dictionary) => Record<string, string>][] = [
  ["trades", TRADES, (d) => d.professionals.options.trades],
  ["projectTypes", PROJECT_TYPES, (d) => d.professionals.options.projectTypes],
  ["clientTypes", CLIENT_TYPES, (d) => d.professionals.options.clientTypes],
  ["roles", CONTACT_ROLES, (d) => d.professionals.options.roles],
  ["professionalTypes", PROFESSIONAL_TYPES, (d) => d.professionals.options.professionalTypes],
  ["contactLanguages", CONTACT_LANGUAGES, (d) => d.professionals.options.contactLanguages],
  ["spokenLanguages", SPOKEN_LANGUAGES, (d) => d.professionals.options.spokenLanguages],
  ["cities", COVERAGE_CITIES, (d) => d.professionals.options.cities],
  ["availability", AVAILABILITY_STATES, (d) => d.professionals.options.availability],
  ["weekDays", WEEK_DAYS, (d) => d.professionals.options.weekDays],
  ["channels", CONTACT_CHANNELS, (d) => d.professionals.options.channels],
  ["notificationFrequencies", NOTIFICATION_FREQUENCIES, (d) => d.professionals.options.notificationFrequencies],
  ["countries", COUNTRIES, (d) => d.professionals.options.countries],
];

describe("registration option labels", () => {
  it.each(OPTION_SETS)("translates every %s id in both languages", (_name, ids, pick) => {
    for (const id of ids) {
      expect(pick(fr)[id], `fr label missing for ${id}`).toBeTruthy();
      expect(pick(en)[id], `en label missing for ${id}`).toBeTruthy();
    }
  });

  it.each(OPTION_SETS)("declares no label for a %s id that does not exist", (_name, ids, pick) => {
    // Catches an id renamed in code but left behind in the dictionaries.
    expect(Object.keys(pick(fr)).sort()).toEqual([...ids].sort());
    expect(Object.keys(pick(en)).sort()).toEqual([...ids].sort());
  });

  it("labels every Moroccan business identifier", () => {
    const frFields = fr.professionals.fields as unknown as Record<string, string>;
    const enFields = en.professionals.fields as unknown as Record<string, string>;
    for (const id of COUNTRY_BUSINESS_FIELDS.MA) {
      expect(frFields[id], `fr label missing for ${id}`).toBeTruthy();
      expect(enFields[id], `en label missing for ${id}`).toBeTruthy();
    }
  });

  it("describes exactly as many steps as the form has", () => {
    expect(STEP_ORDER).toHaveLength(TOTAL_STEPS);
    expect(fr.professionals.form.steps).toHaveLength(TOTAL_STEPS);
    expect(en.professionals.form.steps).toHaveLength(TOTAL_STEPS);
  });

  it("translates every submission error code", () => {
    const codes = ["endpoint_not_configured", "network_error", "validation_error", "rate_limited",
                   "duplicate", "payload_too_large", "server_error"] as const;
    for (const code of codes) {
      expect(fr.professionals.submission.errors[code]).toBeTruthy();
      expect(en.professionals.submission.errors[code]).toBeTruthy();
    }
  });

  it("keeps ids in English-style snake_case, independent of any translation", () => {
    // Guards against a translated string being used as an identifier.
    for (const id of [...TRADES, ...PROJECT_TYPES, ...PROFESSIONAL_TYPES]) {
      expect(id).toMatch(/^[a-z0-9_]+$/);
    }
    expect(TRADES).toContain("plumbing");
    expect(TRADES).not.toContain("Plomberie");
  });

  it("exposes the documented application statuses", () => {
    expect(APPLICATION_STATUSES).toEqual([
      "draft", "submitted", "under_review", "more_information_required",
      "approved", "rejected", "suspended",
    ]);
  });

  it("does not leave French copy in the English registration content", () => {
    const values: string[] = [];
    const walk = (value: unknown) => {
      if (typeof value === "string") values.push(value);
      else if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") Object.values(value).forEach(walk);
    };
    walk(en.professionals);
    const joined = values.join("\n");
    for (const marker of ["Votre", "vos travaux", "Choisissez", "Sélectionner", "métier", "entreprise "]) {
      expect(joined).not.toContain(marker);
    }
  });
});
