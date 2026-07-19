import type { Metadata, Viewport } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor, SITE_URL } from "@/lib/metadata";
import "../../globals.css";

const locale = "en" as const;
const d = getDictionary(locale);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: d.meta.home.title, template: d.meta.titleTemplate },
  description: d.meta.home.description,
  alternates: alternatesFor(locale, "/"),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: { google: "j5fyd26SPTDhp5J60OtRFKLsgDrGQ2dWTNxVqqI0ydI" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b3155" };

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
