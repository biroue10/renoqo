/**
 * Registration funnel events.
 *
 * These carry structural information only — a step index, an error code, a
 * count. Names, emails, phone numbers, free text, uploads and business
 * identifiers must never be passed here.
 */

export const REGISTRATION_EVENTS = {
  started: "professional_registration_started",
  stepCompleted: "professional_registration_step_completed",
  reviewed: "professional_registration_reviewed",
  submitted: "professional_registration_submitted",
  failed: "professional_registration_failed",
  draftSaved: "professional_registration_draft_saved",
} as const;

export type RegistrationEvent = (typeof REGISTRATION_EVENTS)[keyof typeof REGISTRATION_EVENTS];

/** Only primitives that cannot identify an applicant. */
export type EventProperties = Record<string, string | number | boolean>;

type Collector = (event: RegistrationEvent, properties?: EventProperties) => void;

declare global {
  interface Window {
    renoqoAnalytics?: Collector;
  }
}

/**
 * No analytics vendor is wired up yet. Events are forwarded to
 * `window.renoqoAnalytics` when a collector is installed, and dropped
 * otherwise — deliberately, so nothing is queued or stored in the meantime.
 */
export function trackRegistration(event: RegistrationEvent, properties?: EventProperties) {
  if (typeof window === "undefined") return;
  try {
    window.renoqoAnalytics?.(event, properties);
  } catch {
    // Analytics must never interrupt the applicant.
  }
}
