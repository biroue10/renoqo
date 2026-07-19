import { describe, expect, it } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Node = Record<string, unknown>;

/** Flattens a dictionary into `a.b.c` paths so two locales can be diffed. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`));
  if (typeof value === "function") return [`${prefix}()`];
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value as Node).flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key));
}

describe("dictionaries", () => {
  it("expose exactly the same keys in every locale", () => {
    const french = keyPaths(fr).sort();
    const english = keyPaths(en).sort();
    expect(english.filter((key) => !french.includes(key))).toEqual([]);
    expect(french.filter((key) => !english.includes(key))).toEqual([]);
    expect(english).toEqual(french);
  });

  it("never leaves a translated string empty", () => {
    const empty: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === "string" && value.trim() === "") empty.push(path);
      else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${path}[${index}]`));
      else if (value && typeof value === "object") for (const [key, child] of Object.entries(value as Node)) walk(child, `${path}.${key}`);
    };
    walk(en, "en");
    walk(fr, "fr");
    expect(empty).toEqual([]);
  });

  it("does not leave French copy in the English dictionary", () => {
    // Only values are inspected: keys are slugs and ids that stay French by design.
    const values: string[] = [];
    const walk = (value: unknown) => {
      if (typeof value === "string") values.push(value);
      else if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") Object.values(value as Node).forEach(walk);
    };
    walk(en);
    const joined = values.join("\n");
    for (const marker of ["Estimez", "vos travaux", "Rénovation", "Choisissez", "bientôt", "Découvrir"]) {
      expect(joined).not.toContain(marker);
    }
  });

  it("resolves a dictionary for every active locale", () => {
    for (const locale of LOCALES) expect(getDictionary(locale).meta.siteName).toBe("Renoqo");
  });

  it("translates the calculator options and validation messages", () => {
    expect(en.estimate.projects.renovation).toBe("Full renovation");
    expect(en.estimate.finishes.economique).toBe("Economy");
    expect(en.estimate.errors.area).toBe("Enter an area between 1 and 10,000 m².");
    expect(fr.estimate.errors.area).toBe("Indiquez une superficie entre 1 et 10 000 m².");
  });

  it("keeps the Arabic option announced as coming soon without inventing a translation", () => {
    expect(fr.language.notAvailableYet).toBe("bientôt");
    expect(en.language.notAvailableYet).toBe("soon");
    expect(LOCALES).not.toContain("ar");
  });
});
