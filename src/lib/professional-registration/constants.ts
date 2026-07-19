/**
 * Locale-neutral domain values for the professional registration flow.
 *
 * Every list here is a set of stable internal ids. Labels live in the
 * dictionaries (`professionalRegistration.options.*`), keyed by these ids, so a
 * translated string is never used as an identifier and the payload sent to the
 * backend is identical whatever language the applicant reads.
 */

export const TRADES = [
  "general_renovation",
  "construction_structural",
  "masonry",
  "painting",
  "plumbing",
  "electrical",
  "tiling",
  "carpentry_wood",
  "aluminium_pvc",
  "plaster_ceilings",
  "flooring",
  "waterproofing_roofing",
  "hvac",
  "solar_energy",
  "kitchen_installation",
  "bathroom_renovation",
  "interior_design",
  "architecture",
  "landscaping",
  "post_construction_cleaning",
  "moving",
  "other",
] as const;
export type Trade = (typeof TRADES)[number];

export const PROJECT_TYPES = [
  "apartment", "house", "villa", "office", "retail", "restaurant",
  "hotel", "building", "new_build", "renovation", "repair", "maintenance",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CLIENT_TYPES = ["individuals", "businesses", "both"] as const;
export type ClientType = (typeof CLIENT_TYPES)[number];

export const CONTACT_ROLES = ["owner", "manager", "sales_manager", "independent_craftsman", "other"] as const;
export type ContactRole = (typeof CONTACT_ROLES)[number];

export const PROFESSIONAL_TYPES = [
  "independent_craftsman", "auto_entrepreneur", "sole_proprietorship",
  "company", "architecture_design_firm", "cooperative", "other",
] as const;
export type ProfessionalType = (typeof PROFESSIONAL_TYPES)[number];

/** Communication languages offered today; Arabic is a real spoken option even though the UI is not translated yet. */
export const CONTACT_LANGUAGES = ["fr", "en", "ar"] as const;
export type ContactLanguage = (typeof CONTACT_LANGUAGES)[number];

export const SPOKEN_LANGUAGES = ["arabic", "darija", "amazigh", "french", "english", "spanish"] as const;
export type SpokenLanguage = (typeof SPOKEN_LANGUAGES)[number];

/**
 * Seed list of covered cities. Intended to be replaced by an administrable
 * source; the ids are what the backend stores, so they must stay stable.
 */
export const COVERAGE_CITIES = [
  "casablanca", "rabat", "marrakech", "tanger", "agadir", "fes",
  "meknes", "oujda", "kenitra", "tetouan", "el-jadida", "other",
] as const;
export type CoverageCity = (typeof COVERAGE_CITIES)[number];

export const AVAILABILITY_STATES = ["available_now", "available_soon", "limited", "unavailable"] as const;
export type AvailabilityState = (typeof AVAILABILITY_STATES)[number];

export const WEEK_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
export type WeekDay = (typeof WEEK_DAYS)[number];

export const NOTIFICATION_FREQUENCIES = ["immediate", "daily", "weekly"] as const;
export type NotificationFrequency = (typeof NOTIFICATION_FREQUENCIES)[number];

export const CONTACT_CHANNELS = ["email", "whatsapp", "phone"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

export const COUNTRIES = ["MA"] as const;
export type CountryCode = (typeof COUNTRIES)[number];

export const COUNTRY_DIAL_CODES: Record<CountryCode, string> = { MA: "+212" };

/**
 * Country-specific business identifiers. Declared per country so opening a new
 * market does not require touching the form: add an entry and its labels.
 * None of these are required during the first onboarding.
 */
export const COUNTRY_BUSINESS_FIELDS = {
  MA: ["ice", "rc", "taxId", "cnss"],
} as const satisfies Record<CountryCode, readonly string[]>;

export type BusinessFieldId = (typeof COUNTRY_BUSINESS_FIELDS)[CountryCode][number];

export function businessFieldsFor(country: string): readonly string[] {
  return COUNTRY_BUSINESS_FIELDS[country as CountryCode] ?? [];
}

/** Application lifecycle, mirrored by the backend contract. */
export const APPLICATION_STATUSES = [
  "draft", "submitted", "under_review", "more_information_required",
  "approved", "rejected", "suspended",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Upload rules. Enforced again server-side — the browser check is only a convenience. */
export const PORTFOLIO_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const DOCUMENT_TYPES = ["application/pdf"] as const;
export const ACCEPTED_UPLOAD_TYPES = [...PORTFOLIO_IMAGE_TYPES, ...DOCUMENT_TYPES] as const;

export const UPLOAD_EXTENSIONS: Record<string, readonly string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/pdf": [".pdf"],
};

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const MAX_PORTFOLIO_FILES = 8;

export const DESCRIPTION_MIN_LENGTH = 120;
export const DESCRIPTION_MAX_LENGTH = 1500;

export const EARLIEST_FOUNDING_YEAR = 1900;

export const TOTAL_STEPS = 6;

/** localStorage key for the non-sensitive draft. */
export const DRAFT_STORAGE_KEY = "renoqo_professional_registration_draft";
export const DRAFT_VERSION = 1;
