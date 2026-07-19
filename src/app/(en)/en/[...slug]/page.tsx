import type { Metadata } from "next";
import { CatchAllPage, resolveSlug } from "@/components/pages/InnerPages";
import { RENOQO_STATIC_SLUGS } from "@/data/static-routes";
import { buildMetadata } from "@/lib/metadata";

const locale = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return RENOQO_STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const slug = (await params).slug.join("/");
  const value = resolveSlug(locale, slug);
  return value ? buildMetadata(locale, `/${slug}`, { title: value.title, description: value.text }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return <CatchAllPage locale={locale} slug={(await params).slug.join("/")} />;
}
