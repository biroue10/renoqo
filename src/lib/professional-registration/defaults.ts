import type { RegistrationDraft, RegistrationFiles } from "./types";

/** A pristine form. Consents always start unchecked — never pre-ticked. */
export function createEmptyDraft(): RegistrationDraft {
  return {
    contact: {
      firstName: "", lastName: "", email: "",
      phoneCountry: "MA", phone: "", whatsappSameAsPhone: true, whatsapp: "",
      contactLanguage: "", role: "", roleOther: "",
    },
    business: {
      professionalType: "", professionalTypeOther: "", tradeName: "", legalName: "",
      country: "MA", city: "", address: "", foundedYear: "", teamSize: "",
      website: "", socialUrl: "", businessIds: {},
    },
    services: {
      primaryTrade: "", secondaryTrades: [], primaryTradeOther: "",
      specialties: "", projectTypes: [], clientTypes: "",
    },
    coverage: {
      mainCity: "", secondaryCities: [], coversWholeRegion: false, neighbourhoods: "",
      travelRadiusKm: "", worksInOtherRegions: false, availability: "", acceptsUrgent: false,
      availableDays: [], leadTime: "", minBudget: "", maxBudget: "",
    },
    presentation: {
      description: "", yearsOfExperience: "", spokenLanguages: [], certifications: "",
      hasInsurance: false, insuranceDetails: "", offersWarranty: false, warrantyDetails: "",
      references: "",
    },
    preferences: {
      channels: [], interestedProjectTypes: [], minimumProjectBudget: "", preferredAreas: [],
      notificationFrequency: "", pauseRequests: false,
      acceptProfessionalTerms: false, acceptPrivacyPolicy: false,
      confirmAccuracy: false, allowContactAboutApplication: false, acceptMarketing: false,
    },
  };
}

export function createEmptyFiles(): RegistrationFiles {
  return { portfolio: [], logo: null, coverImage: null };
}

/** Merges a restored draft over the defaults so a partial or older draft cannot break the form. */
export function mergeDraft(stored: Partial<RegistrationDraft> | undefined): RegistrationDraft {
  const base = createEmptyDraft();
  if (!stored) return base;
  return {
    contact: { ...base.contact, ...stored.contact },
    business: { ...base.business, ...stored.business, businessIds: { ...stored.business?.businessIds } },
    services: { ...base.services, ...stored.services },
    coverage: { ...base.coverage, ...stored.coverage },
    presentation: { ...base.presentation, ...stored.presentation },
    // Consents are never restored from a draft: they must be given deliberately each time.
    preferences: {
      ...base.preferences,
      ...stored.preferences,
      acceptProfessionalTerms: false,
      acceptPrivacyPolicy: false,
      confirmAccuracy: false,
      allowContactAboutApplication: false,
      acceptMarketing: false,
    },
  };
}
