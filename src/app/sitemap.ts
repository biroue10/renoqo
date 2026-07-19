import type { MetadataRoute } from "next";
import { RENOQO_STATIC_SLUGS } from "@/data/static-routes";

const BASE_URL = "https://renoqo.com";
const LAST_MODIFIED = new Date("2026-07-19");

export const dynamic = "force-static";

const primaryRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/prix/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/guides/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/calculateurs/", changeFrequency: "weekly", priority: 0.9 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryEntries: MetadataRoute.Sitemap = primaryRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const generatedEntries: MetadataRoute.Sitemap = RENOQO_STATIC_SLUGS.map(
    (slug) => {
      const path = slug.join("/");
      const isService = slug[0] === "services";

      return {
        url: `${BASE_URL}/${path}/`,
        lastModified: LAST_MODIFIED,
        changeFrequency: isService ? "monthly" : "yearly",
        priority: isService ? 0.8 : 0.6,
      };
    },
  );

  return [...primaryEntries, ...generatedEntries];
}
