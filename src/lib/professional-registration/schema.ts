import {
  ACCEPTED_UPLOAD_TYPES, DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH,
  EARLIEST_FOUNDING_YEAR, MAX_PORTFOLIO_FILES, MAX_UPLOAD_BYTES, UPLOAD_EXTENSIONS,
} from "./constants";
import type { RegistrationDraft } from "./types";

/**
 * Validation returns error *codes*, never sentences: the UI resolves them
 * against `professionalRegistration.errors` so both languages share one rule
 * set and the same submission is accepted or rejected identically.
 */
export type ErrorCode =
  | "required"
  | "invalid_email"
  | "invalid_phone"
  | "invalid_url"
  | "description_too_short"
  | "description_too_long"
  | "invalid_year"
  | "invalid_number"
  | "budget_range"
  | "select_at_least_one"
  | "consent_required"
  | "file_type"
  | "file_size"
  | "file_count";

/** Keyed by `section.field`, e.g. `contact.email`. */
export type FieldErrors = Record<string, ErrorCode>;

export type StepKey = "contact" | "business" | "services" | "coverage" | "presentation" | "preferences";

export const STEP_ORDER: StepKey[] = ["contact", "business", "services", "coverage", "presentation", "preferences"];

const clean = (value: string) => value.trim();
const isBlank = (value: string) => clean(value).length === 0;

// Deliberately permissive: the goal is to catch typos, not to reject valid
// addresses. The server remains the authority.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(clean(value));
}

/** Accepts international formats once separators are stripped. */
export function isValidPhone(value: string) {
  const digits = clean(value).replace(/[\s().-]/g, "");
  return /^\+?\d{6,15}$/.test(digits);
}

export function isValidUrl(value: string) {
  const candidate = clean(value);
  if (!candidate) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`);
    return Boolean(url.hostname) && url.hostname.includes(".");
  } catch {
    return false;
  }
}

const isPositiveNumber = (value: string) => {
  const parsed = Number(clean(value));
  return Number.isFinite(parsed) && parsed >= 0;
};

function validateContact(draft: RegistrationDraft, errors: FieldErrors) {
  const { contact } = draft;
  if (isBlank(contact.firstName)) errors["contact.firstName"] = "required";
  if (isBlank(contact.lastName)) errors["contact.lastName"] = "required";
  if (isBlank(contact.email)) errors["contact.email"] = "required";
  else if (!isValidEmail(contact.email)) errors["contact.email"] = "invalid_email";
  if (isBlank(contact.phone)) errors["contact.phone"] = "required";
  else if (!isValidPhone(contact.phone)) errors["contact.phone"] = "invalid_phone";
  // WhatsApp is optional, but a value that is present must still be usable.
  if (!contact.whatsappSameAsPhone && !isBlank(contact.whatsapp) && !isValidPhone(contact.whatsapp)) {
    errors["contact.whatsapp"] = "invalid_phone";
  }
  if (!contact.contactLanguage) errors["contact.contactLanguage"] = "required";
  if (!contact.role) errors["contact.role"] = "required";
  else if (contact.role === "other" && isBlank(contact.roleOther)) errors["contact.roleOther"] = "required";
}

function validateBusiness(draft: RegistrationDraft, errors: FieldErrors) {
  const { business } = draft;
  if (!business.professionalType) errors["business.professionalType"] = "required";
  else if (business.professionalType === "other" && isBlank(business.professionalTypeOther)) {
    errors["business.professionalTypeOther"] = "required";
  }
  if (isBlank(business.tradeName)) errors["business.tradeName"] = "required";
  if (isBlank(business.country)) errors["business.country"] = "required";
  if (!business.city) errors["business.city"] = "required";

  // Everything below is optional; it is only checked when the applicant filled it in.
  if (!isBlank(business.foundedYear)) {
    const year = Number(clean(business.foundedYear));
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(year) || year < EARLIEST_FOUNDING_YEAR || year > currentYear) {
      errors["business.foundedYear"] = "invalid_year";
    }
  }
  if (!isBlank(business.teamSize) && !isPositiveNumber(business.teamSize)) errors["business.teamSize"] = "invalid_number";
  if (!isBlank(business.website) && !isValidUrl(business.website)) errors["business.website"] = "invalid_url";
  if (!isBlank(business.socialUrl) && !isValidUrl(business.socialUrl)) errors["business.socialUrl"] = "invalid_url";
  // Business identifiers (ICE, RC, tax id, CNSS) stay optional during onboarding.
}

function validateServices(draft: RegistrationDraft, errors: FieldErrors) {
  const { services } = draft;
  if (!services.primaryTrade) errors["services.primaryTrade"] = "required";
  else if (services.primaryTrade === "other" && isBlank(services.primaryTradeOther)) {
    errors["services.primaryTradeOther"] = "required";
  }
  if (services.projectTypes.length === 0) errors["services.projectTypes"] = "select_at_least_one";
  if (!services.clientTypes) errors["services.clientTypes"] = "required";
}

function validateCoverage(draft: RegistrationDraft, errors: FieldErrors) {
  const { coverage } = draft;
  // The main city alone satisfies "at least one coverage area".
  if (!coverage.mainCity) errors["coverage.mainCity"] = "required";
  if (!coverage.availability) errors["coverage.availability"] = "required";
  if (!isBlank(coverage.travelRadiusKm) && !isPositiveNumber(coverage.travelRadiusKm)) {
    errors["coverage.travelRadiusKm"] = "invalid_number";
  }
  const hasMin = !isBlank(coverage.minBudget);
  const hasMax = !isBlank(coverage.maxBudget);
  if (hasMin && !isPositiveNumber(coverage.minBudget)) errors["coverage.minBudget"] = "invalid_number";
  if (hasMax && !isPositiveNumber(coverage.maxBudget)) errors["coverage.maxBudget"] = "invalid_number";
  if (hasMin && hasMax && !errors["coverage.minBudget"] && !errors["coverage.maxBudget"]
      && Number(coverage.maxBudget) < Number(coverage.minBudget)) {
    errors["coverage.maxBudget"] = "budget_range";
  }
}

function validatePresentation(draft: RegistrationDraft, errors: FieldErrors) {
  const { presentation } = draft;
  const description = clean(presentation.description);
  if (!description) errors["presentation.description"] = "required";
  else if (description.length < DESCRIPTION_MIN_LENGTH) errors["presentation.description"] = "description_too_short";
  else if (description.length > DESCRIPTION_MAX_LENGTH) errors["presentation.description"] = "description_too_long";

  if (!isBlank(presentation.yearsOfExperience)) {
    const years = Number(clean(presentation.yearsOfExperience));
    if (!Number.isFinite(years) || years < 0 || years > 80) errors["presentation.yearsOfExperience"] = "invalid_number";
  }
  if (presentation.spokenLanguages.length === 0) errors["presentation.spokenLanguages"] = "select_at_least_one";
}

function validatePreferences(draft: RegistrationDraft, errors: FieldErrors) {
  const { preferences } = draft;
  if (preferences.channels.length === 0) errors["preferences.channels"] = "select_at_least_one";
  if (!preferences.notificationFrequency) errors["preferences.notificationFrequency"] = "required";
  if (!isBlank(preferences.minimumProjectBudget) && !isPositiveNumber(preferences.minimumProjectBudget)) {
    errors["preferences.minimumProjectBudget"] = "invalid_number";
  }
  // Mandatory consents. Marketing is deliberately absent: it stays optional.
  if (!preferences.acceptProfessionalTerms) errors["preferences.acceptProfessionalTerms"] = "consent_required";
  if (!preferences.acceptPrivacyPolicy) errors["preferences.acceptPrivacyPolicy"] = "consent_required";
  if (!preferences.confirmAccuracy) errors["preferences.confirmAccuracy"] = "consent_required";
  if (!preferences.allowContactAboutApplication) errors["preferences.allowContactAboutApplication"] = "consent_required";
}

const VALIDATORS: Record<StepKey, (draft: RegistrationDraft, errors: FieldErrors) => void> = {
  contact: validateContact,
  business: validateBusiness,
  services: validateServices,
  coverage: validateCoverage,
  presentation: validatePresentation,
  preferences: validatePreferences,
};

export function validateStep(step: StepKey, draft: RegistrationDraft): FieldErrors {
  const errors: FieldErrors = {};
  VALIDATORS[step](draft, errors);
  return errors;
}

export function validateAll(draft: RegistrationDraft): FieldErrors {
  const errors: FieldErrors = {};
  for (const step of STEP_ORDER) VALIDATORS[step](draft, errors);
  return errors;
}

/** Which steps currently hold an error — used to badge the progress indicator. */
export function stepsWithErrors(draft: RegistrationDraft): StepKey[] {
  return STEP_ORDER.filter((step) => Object.keys(validateStep(step, draft)).length > 0);
}

export type FileError = { name: string; code: ErrorCode };

/**
 * Checks declared MIME type, extension and size. This is a convenience for the
 * applicant: the server must re-validate every upload, since a browser check
 * can be bypassed trivially.
 */
export function validateFiles(files: File[], { maxCount = MAX_PORTFOLIO_FILES } = {}): FileError[] {
  const problems: FileError[] = [];
  if (files.length > maxCount) problems.push({ name: "", code: "file_count" });
  for (const file of files.slice(0, maxCount)) {
    const type = file.type.toLowerCase();
    const allowedExtensions = UPLOAD_EXTENSIONS[type];
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!(ACCEPTED_UPLOAD_TYPES as readonly string[]).includes(type) || !allowedExtensions?.includes(extension)) {
      problems.push({ name: file.name, code: "file_type" });
      continue;
    }
    if (file.size > MAX_UPLOAD_BYTES) problems.push({ name: file.name, code: "file_size" });
  }
  return problems;
}

/** Trims free text so the backend never receives whitespace-only values. */
export function normalizeDraft(draft: RegistrationDraft): RegistrationDraft {
  const trimAll = <T extends Record<string, unknown>>(section: T): T => {
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(section)) {
      next[key] = typeof value === "string" ? value.trim() : value;
    }
    return next as T;
  };
  const business = trimAll(draft.business);
  const businessIds: Record<string, string> = {};
  for (const [key, value] of Object.entries(draft.business.businessIds)) {
    const trimmed = value.trim();
    if (trimmed) businessIds[key] = trimmed;
  }
  const contact = trimAll(draft.contact);
  return {
    contact: { ...contact, whatsapp: contact.whatsappSameAsPhone ? contact.phone.trim() : contact.whatsapp },
    business: { ...business, businessIds },
    services: trimAll(draft.services),
    coverage: trimAll(draft.coverage),
    presentation: trimAll(draft.presentation),
    preferences: draft.preferences,
  };
}
