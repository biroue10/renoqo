import { notFound } from "next/navigation";
import { GuideArticlePage } from "@/components/guides/GuideArticlePage";
import { guideArticles, getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/metadata";

const locale = "en" as const;
export const dynamicParams = false;
export function generateStaticParams() { return guideArticles.filter((item) => item.locale === locale).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getGuide(locale, (await params).slug); return article ? buildGuideMetadata(article) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const article = getGuide(locale, (await params).slug); if (!article) notFound(); return <GuideArticlePage article={article} />; }
