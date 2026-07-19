"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import {
  ANALYTICS_CONSENT_EVENT,
  analyticsId,
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackPageView,
  type AnalyticsConsent,
} from "@/lib/analytics";

type Labels = { message: string; accept: string; decline: string; settings: string; title: string };

export function GoogleAnalytics({ locale, labels }: { locale: Locale; labels: Labels }) {
  const gaId = analyticsId();
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => setConsent(getAnalyticsConsent()), []);
  useEffect(() => {
    const update = (event: Event) => setConsent((event as CustomEvent<AnalyticsConsent>).detail);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, update);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, update);
  }, []);
  useEffect(() => {
    if (consent === "granted") trackPageView(pathname);
  }, [consent, pathname]);

  const choose = (value: AnalyticsConsent) => {
    setAnalyticsConsent(value);
    setConsent(value);
    setSettingsOpen(false);
  };
  const initialize = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer?.push(args); });
    window.gtag("js", new Date());
    window.gtag("consent", "default", { analytics_storage: "granted" });
    window.gtag("config", gaId, { send_page_view: false, allow_google_signals: false });
    trackPageView(pathname);
  };
  const showChoice = consent === null || settingsOpen;

  return (
    <>
      {gaId && consent === "granted" ? (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" onLoad={initialize} />
      ) : null}
      {showChoice ? (
        <section className="analytics-consent" aria-labelledby="analytics-consent-title" lang={locale}>
          <strong id="analytics-consent-title">{labels.title}</strong>
          <p>{labels.message}</p>
          <div>
            <button className="button button-primary" type="button" onClick={() => choose("granted")}>{labels.accept}</button>
            <button className="button button-secondary" type="button" onClick={() => choose("denied")}>{labels.decline}</button>
          </div>
        </section>
      ) : (
        <button className="analytics-settings" type="button" onClick={() => setSettingsOpen(true)}>{labels.settings}</button>
      )}
    </>
  );
}
