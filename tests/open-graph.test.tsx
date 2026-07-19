import { access } from "node:fs/promises";
import sharp from "sharp";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { fr } from "@/i18n/dictionaries/fr";
import { en } from "@/i18n/dictionaries/en";
import { buildMetadata } from "@/lib/metadata";

describe("Open Graph social presentation", () => {
  it("ships an opaque 1200 x 630 PNG", async () => {
    await expect(access("public/og-renoqo.png")).resolves.toBeUndefined();
    const image = await sharp("public/og-renoqo.png").metadata();
    expect(image).toMatchObject({ format: "png", width: 1200, height: 630, hasAlpha: false });
  });

  it("uses the PNG and translated alt text in metadata", () => {
    for (const [locale, dictionary] of [["fr", fr], ["en", en]] as const) {
      const metadata = buildMetadata(locale, "/", { title: "Renoqo", description: "Renoqo" });
      const images = metadata.openGraph?.images;
      const image = Array.isArray(images) ? images[0] : images;
      expect(image).toMatchObject({ url: "/og-renoqo.png", width: 1200, height: 630, type: "image/png", alt: dictionary.meta.ogImageAlt });
      expect(JSON.stringify(metadata)).not.toContain("og-renoqo.svg");
    }
  });

  it("renders no dead or invented social link in the shared footer", () => {
    const html = renderToStaticMarkup(<Footer locale="fr" d={fr} />);
    expect(html).not.toMatch(/href="#(?:linkedin|instagram|facebook)"/);
    expect(html).not.toContain(">in</a>");
    expect(html).not.toContain(">ig</a>");
  });
});
