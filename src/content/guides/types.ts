import type { Locale } from "@/i18n/config";

export type GuideKey = "budget" | "quotes" | "costFactors";
export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip" | "warning"; title: string; text: string }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] };

export type GuideSection = { id: string; title: string; blocks: GuideBlock[]; subsections?: { id: string; title: string; blocks: GuideBlock[] }[] };
export type GuideFaq = { question: string; answer: string };

export type GuideArticle = {
  key: GuideKey;
  locale: Locale;
  slug: string;
  counterpartSlug: string;
  category: string;
  seoTitle: string;
  title: string;
  description: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  modifiedAt: string;
  readingTime: number;
  author: string;
  shortAnswer: string;
  takeaways: string[];
  sections: GuideSection[];
  checklist: string[];
  faqs: GuideFaq[];
  relatedKeys: GuideKey[];
};
