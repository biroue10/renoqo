import { DRAFT_STORAGE_KEY, DRAFT_VERSION } from "./constants";
import type { DraftEnvelope, RegistrationDraft } from "./types";

/**
 * Draft persistence for the registration form.
 *
 * Only non-sensitive business answers are stored. Files, documents and the
 * country business identifiers (ICE, RC, tax id, CNSS) are stripped before
 * writing: localStorage is readable by any script on the origin, so regulated
 * identifiers and uploads must never land there.
 */

/** Identifiers deliberately excluded from the persisted draft. */
const SENSITIVE_BUSINESS_FIELDS = ["ice", "rc", "taxId", "cnss"];

export function stripSensitive(draft: RegistrationDraft): RegistrationDraft {
  const businessIds: Record<string, string> = {};
  for (const [key, value] of Object.entries(draft.business.businessIds)) {
    if (!SENSITIVE_BUSINESS_FIELDS.includes(key)) businessIds[key] = value;
  }
  return { ...draft, business: { ...draft.business, businessIds } };
}

export function saveDraft(draft: RegistrationDraft, now = new Date()): DraftEnvelope | null {
  const envelope: DraftEnvelope = {
    version: DRAFT_VERSION,
    savedAt: now.toISOString(),
    data: stripSensitive(draft),
  };
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(envelope));
    return envelope;
  } catch {
    // Private browsing or a full quota must never break the form.
    return null;
  }
}

export function loadDraft(): DraftEnvelope | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftEnvelope;
    // A draft from an older shape is discarded rather than merged blindly.
    if (parsed?.version !== DRAFT_VERSION || !parsed.data) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Nothing to do: the draft is a convenience, not a source of truth.
  }
}
