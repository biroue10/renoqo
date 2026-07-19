import type {
  ApplicationStatus, AvailabilityState, ClientType, ContactChannel, ContactLanguage,
  ContactRole, CoverageCity, NotificationFrequency, ProfessionalType, ProjectType,
  SpokenLanguage, Trade, WeekDay,
} from "./constants";

/** Step 1 — the person responsible for the profile. */
export type ContactSection = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  whatsappSameAsPhone: boolean;
  whatsapp: string;
  contactLanguage: ContactLanguage | "";
  role: ContactRole | "";
  roleOther: string;
};

/** Step 2 — the business itself. `businessIds` is keyed by country field id (ice, rc…). */
export type BusinessSection = {
  professionalType: ProfessionalType | "";
  professionalTypeOther: string;
  tradeName: string;
  legalName: string;
  country: string;
  city: CoverageCity | "";
  address: string;
  foundedYear: string;
  teamSize: string;
  website: string;
  socialUrl: string;
  businessIds: Record<string, string>;
};

/** Step 3 — trades and services. Ids only; never translated labels. */
export type ServicesSection = {
  primaryTrade: Trade | "";
  secondaryTrades: Trade[];
  primaryTradeOther: string;
  specialties: string;
  projectTypes: ProjectType[];
  clientTypes: ClientType | "";
};

/** Step 4 — coverage and availability. */
export type CoverageSection = {
  mainCity: CoverageCity | "";
  secondaryCities: CoverageCity[];
  coversWholeRegion: boolean;
  neighbourhoods: string;
  travelRadiusKm: string;
  worksInOtherRegions: boolean;
  availability: AvailabilityState | "";
  acceptsUrgent: boolean;
  availableDays: WeekDay[];
  leadTime: string;
  minBudget: string;
  maxBudget: string;
};

/** Step 5 — presentation. Files are held in memory only, never persisted client-side. */
export type PresentationSection = {
  description: string;
  yearsOfExperience: string;
  spokenLanguages: SpokenLanguage[];
  certifications: string;
  hasInsurance: boolean;
  insuranceDetails: string;
  offersWarranty: boolean;
  warrantyDetails: string;
  references: string;
};

/** Step 6 — preferences and consents. Consents always start unchecked. */
export type PreferencesSection = {
  channels: ContactChannel[];
  interestedProjectTypes: ProjectType[];
  minimumProjectBudget: string;
  preferredAreas: CoverageCity[];
  notificationFrequency: NotificationFrequency | "";
  pauseRequests: boolean;
  acceptProfessionalTerms: boolean;
  acceptPrivacyPolicy: boolean;
  confirmAccuracy: boolean;
  allowContactAboutApplication: boolean;
  acceptMarketing: boolean;
};

/** The complete form state, minus files. This is what may be drafted to localStorage. */
export type RegistrationDraft = {
  contact: ContactSection;
  business: BusinessSection;
  services: ServicesSection;
  coverage: CoverageSection;
  presentation: PresentationSection;
  preferences: PreferencesSection;
};

export type DraftEnvelope = {
  version: number;
  savedAt: string;
  data: RegistrationDraft;
};

/** Files live only in component state and travel as multipart; never drafted. */
export type RegistrationFiles = {
  portfolio: File[];
  logo: File | null;
  coverImage: File | null;
};

/** What the client sends. `locale` is metadata only — it never changes a business value. */
export type RegistrationPayload = RegistrationDraft & {
  locale: string;
  submittedAt: string;
  /** Anti-bot honeypot; a non-empty value marks the submission as suspicious. */
  botField: string;
  turnstileToken?: string;
};

export type SubmissionSuccess = {
  ok: true;
  /** Always issued by the server. Never generated in the browser. */
  applicationId: string;
  status: ApplicationStatus;
  /** Optional, server-administered. Never invented client-side. */
  reviewEtaLabel?: string;
  /** True only for the explicitly opt-in development demo mode. */
  demo?: boolean;
};

export type SubmissionErrorCode =
  | "endpoint_not_configured"
  | "network_error"
  | "validation_error"
  | "rate_limited"
  | "duplicate"
  | "payload_too_large"
  | "server_error";

export type SubmissionFailure = {
  ok: false;
  code: SubmissionErrorCode;
  /** Field-level errors returned by the server, keyed by `section.field`. */
  fieldErrors?: Record<string, string>;
};

export type SubmissionResult = SubmissionSuccess | SubmissionFailure;
