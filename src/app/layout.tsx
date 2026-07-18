import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renoqo.com";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Renoqo Maroc — Estimation du prix des travaux et demandes de devis", template: "%s | Renoqo" },
  description: "Estimez le coût de vos travaux au Maroc, comparez les prix et trouvez des professionnels pour vos projets de rénovation, construction, peinture, plomberie et plus encore.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_MA", url: "/", siteName: "Renoqo", title: "Renoqo Maroc — Estimation du prix des travaux", description: "Estimez vos travaux, comparez les prix et préparez vos demandes de devis au Maroc.", images: [{ url: "/og-renoqo.svg", width: 1200, height: 630, alt: "Renoqo — Estimez. Comparez. Réalisez." }] },
  twitter: { card: "summary_large_image", title: "Renoqo Maroc — Estimation du prix des travaux", description: "Estimez vos travaux et comparez les prix au Maroc.", images: ["/og-renoqo.svg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b3155" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body><a className="skip-link" href="#contenu">Aller au contenu principal</a><Header /><main id="contenu">{children}</main><Footer /></body></html>; }
