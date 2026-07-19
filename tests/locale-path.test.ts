import { describe, expect, it } from "vitest";
import { localizedPath, localizedUrl, stripLocale, switchLocalePath } from "@/i18n/locale-path";

describe("localizedPath", () => {
  it("leaves French paths untouched so existing URLs keep their SEO value", () => {
    expect(localizedPath("fr", "/")).toBe("/");
    expect(localizedPath("fr", "/services/renovation/")).toBe("/services/renovation/");
    expect(localizedPath("fr", "/prix")).toBe("/prix");
  });

  it("prefixes English paths with /en", () => {
    expect(localizedPath("en", "/")).toBe("/en/");
    expect(localizedPath("en", "/services/renovation/")).toBe("/en/services/renovation/");
    expect(localizedPath("en", "/prix")).toBe("/en/prix");
  });

  it("is idempotent, so a path is never double-prefixed", () => {
    expect(localizedPath("en", "/en/prix")).toBe("/en/prix");
    expect(localizedPath("fr", "/en/prix")).toBe("/prix");
  });

  it("preserves anchors and query strings", () => {
    expect(localizedPath("en", "/#estimation")).toBe("/en/#estimation");
    expect(localizedPath("en", "/calculateurs#peinture")).toBe("/en/calculateurs#peinture");
    expect(localizedPath("fr", "/en/prix?source=nav")).toBe("/prix?source=nav");
  });
});

describe("stripLocale", () => {
  it("reports the locale carried by the path", () => {
    expect(stripLocale("/en/villes/casablanca/")).toEqual({ locale: "en", path: "/villes/casablanca/" });
    expect(stripLocale("/villes/casablanca/")).toEqual({ locale: "fr", path: "/villes/casablanca/" });
    expect(stripLocale("/en/")).toEqual({ locale: "en", path: "/" });
  });
});

describe("switchLocalePath", () => {
  it("keeps the reader on the same page when switching language", () => {
    expect(switchLocalePath("en", "/services/renovation/")).toBe("/en/services/renovation/");
    expect(switchLocalePath("fr", "/en/services/renovation/")).toBe("/services/renovation/");
    expect(switchLocalePath("en", "/villes/casablanca/")).toBe("/en/villes/casablanca/");
  });

  it("falls back to the home page when the path has no counterpart", () => {
    expect(switchLocalePath("en", "/page-inexistante/")).toBe("/en/");
    expect(switchLocalePath("fr", "/en/does-not-exist/")).toBe("/");
  });

  it("round-trips between locales", () => {
    const original = "/guides/comparer-plusieurs-devis/";
    expect(switchLocalePath("fr", switchLocalePath("en", original))).toBe(original);
  });
});

describe("localizedUrl", () => {
  it("builds absolute URLs for canonicals and the sitemap", () => {
    expect(localizedUrl("fr", "/prix/", "https://renoqo.com")).toBe("https://renoqo.com/prix/");
    expect(localizedUrl("en", "/prix/", "https://renoqo.com/")).toBe("https://renoqo.com/en/prix/");
  });
});
