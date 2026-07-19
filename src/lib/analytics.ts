export const ANALYTICS_CONSENT_KEY = "renoqo_analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "renoqo:analytics-consent";

export type AnalyticsConsent = "granted" | "denied";
export type RenoqoEvent =
  | "calculator_started"
  | "calculator_completed"
  | "quote_form_started"
  | "quote_submitted"
  | "profile_viewed"
  | "contact_clicked"
  | "estimate_professional_refinement_clicked";

type AnalyticsValue = string | number | boolean;
export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

const ALLOWED_PARAMETERS: Record<RenoqoEvent, readonly string[]> = {
  calculator_started: ["calculator_type"],
  calculator_completed: ["calculator_type", "project_type", "city_id", "finish_level"],
  quote_form_started: [],
  quote_submitted: ["status"],
  profile_viewed: ["professional_id", "primary_trade", "city_id"],
  contact_clicked: ["contact_method", "professional_id", "page_context"],
  estimate_professional_refinement_clicked: ["project_type", "city_id", "finish_level", "locale"],
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function analyticsId() {
  return process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {}
  window.gtag?.("consent", "update", { analytics_storage: value });
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
}

export function safeAnalyticsParameters(event: RenoqoEvent, parameters: AnalyticsParameters = {}) {
  const allowed = new Set(ALLOWED_PARAMETERS[event]);
  return Object.fromEntries(
    Object.entries(parameters).filter(([key, value]) => allowed.has(key) && value !== undefined),
  ) as Record<string, AnalyticsValue>;
}

export function trackEvent(event: RenoqoEvent, parameters?: AnalyticsParameters) {
  if (typeof window === "undefined" || !analyticsId() || getAnalyticsConsent() !== "granted" || typeof window.gtag !== "function") return;
  window.gtag("event", event, safeAnalyticsParameters(event, parameters));
}

export function trackPageView(url: string) {
  if (typeof window === "undefined" || !analyticsId() || getAnalyticsConsent() !== "granted" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: url });
}

// TODO(analytics): track profile_viewed when professional profiles are implemented.
