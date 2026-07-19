import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITEMAP_PATHS, ROUTABLE_PATHS, isRoutablePath } from "@/data/routes";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { localizedPath, stripLocale } from "@/i18n/locale-path";

vi.mock("next/navigation", () => ({ usePathname: () => "/en/" }));

const hrefs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("a[href]"))
    .map((node) => node.getAttribute("href") ?? "")
    .filter((href) => href.startsWith("/"));

describe("internal links", () => {
  afterEach(cleanup);

  it("keeps every English header link inside the English tree", () => {
    const { container } = render(<Header locale="en" d={en} />);
    const internal = hrefs(container);
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(stripLocale(href).locale).toBe("en");
  });

  it("keeps every English footer link inside the English tree", () => {
    const { container } = render(<Footer locale="en" d={en} />);
    const internal = hrefs(container);
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(stripLocale(href).locale).toBe("en");
  });

  it("leaves French links unprefixed", () => {
    const { container } = render(<Footer locale="fr" d={fr} />);
    const internal = hrefs(container);
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(stripLocale(href).locale).toBe("fr");
  });
});

describe("route registry", () => {
  it("recognises every routable path, with or without a trailing slash", () => {
    for (const path of ROUTABLE_PATHS) {
      expect(isRoutablePath(path)).toBe(true);
      expect(isRoutablePath(`${path}/`.replace(/\/{2,}$/, "/"))).toBe(true);
    }
    expect(isRoutablePath("/pas-une-route")).toBe(false);
  });

  it("advertises both languages in the sitemap without duplicates", () => {
    const urls = SITEMAP_PATHS.flatMap((path) => [localizedPath("fr", path), localizedPath("en", path)]);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("/en/");
    expect(urls).toContain("/");
    expect(urls).toContain("/en/services/renovation");
  });

  it("excludes sign-in and placeholder guide pages from the sitemap", () => {
    expect(SITEMAP_PATHS).not.toContain("/connexion");
    expect(SITEMAP_PATHS).not.toContain("/guides/preparer-budget-renovation");
    expect(SITEMAP_PATHS).toContain("/guides");
  });
});
