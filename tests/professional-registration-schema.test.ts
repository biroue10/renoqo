import { describe, expect, it } from "vitest";
import { createEmptyDraft } from "@/lib/professional-registration/defaults";
import {
  isValidEmail, isValidPhone, isValidUrl, normalizeDraft, validateAll, validateFiles, validateStep,
} from "@/lib/professional-registration/schema";
import { DESCRIPTION_MIN_LENGTH, MAX_UPLOAD_BYTES, businessFieldsFor } from "@/lib/professional-registration/constants";
import type { RegistrationDraft } from "@/lib/professional-registration/types";

const withContact = (draft: RegistrationDraft): RegistrationDraft => ({
  ...draft,
  contact: {
    ...draft.contact,
    firstName: "Youssef", lastName: "Benali", email: "contact@atelier.ma",
    phone: "0612345678", contactLanguage: "fr", role: "owner",
  },
});

const longDescription = "a".repeat(DESCRIPTION_MIN_LENGTH + 10);

/** A draft that passes every rule, used as the baseline for negative tests. */
function completeDraft(): RegistrationDraft {
  const draft = withContact(createEmptyDraft());
  return {
    ...draft,
    business: { ...draft.business, professionalType: "company", tradeName: "Atelier Bâtiment", country: "MA", city: "casablanca" },
    services: { ...draft.services, primaryTrade: "plumbing", projectTypes: ["apartment"], clientTypes: "both" },
    coverage: { ...draft.coverage, mainCity: "casablanca", availability: "available_now" },
    presentation: { ...draft.presentation, description: longDescription, spokenLanguages: ["french"] },
    preferences: {
      ...draft.preferences, channels: ["email"], notificationFrequency: "daily",
      acceptProfessionalTerms: true, acceptPrivacyPolicy: true,
      confirmAccuracy: true, allowContactAboutApplication: true,
    },
  };
}

describe("field validators", () => {
  it("accepts realistic emails and rejects malformed ones", () => {
    expect(isValidEmail("contact@atelier.ma")).toBe(true);
    expect(isValidEmail("a.b+tag@sub.domain.co")).toBe(true);
    expect(isValidEmail("contact@atelier")).toBe(false);
    expect(isValidEmail("contact atelier.ma")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
  });

  it("accepts Moroccan and international phone formats", () => {
    expect(isValidPhone("0612345678")).toBe(true);
    expect(isValidPhone("+212 612 34 56 78")).toBe(true);
    expect(isValidPhone("+212-612-345-678")).toBe(true);
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("not a phone")).toBe(false);
  });

  it("accepts URLs with or without a scheme", () => {
    expect(isValidUrl("https://atelier.ma")).toBe(true);
    expect(isValidUrl("atelier.ma")).toBe(true);
    expect(isValidUrl("not a url")).toBe(false);
  });
});

describe("step validation", () => {
  it("requires the profile owner identity and a valid email and phone", () => {
    const errors = validateStep("contact", createEmptyDraft());
    expect(errors["contact.firstName"]).toBe("required");
    expect(errors["contact.lastName"]).toBe("required");
    expect(errors["contact.email"]).toBe("required");
    expect(errors["contact.phone"]).toBe("required");
  });

  it("rejects whitespace-only names", () => {
    const draft = createEmptyDraft();
    draft.contact.firstName = "   ";
    expect(validateStep("contact", draft)["contact.firstName"]).toBe("required");
  });

  it("flags a malformed email and phone with specific codes", () => {
    const draft = withContact(createEmptyDraft());
    draft.contact.email = "nope";
    draft.contact.phone = "12";
    const errors = validateStep("contact", draft);
    expect(errors["contact.email"]).toBe("invalid_email");
    expect(errors["contact.phone"]).toBe("invalid_phone");
  });

  it("only requires the WhatsApp number when it differs from the phone", () => {
    const draft = withContact(createEmptyDraft());
    draft.contact.whatsappSameAsPhone = true;
    expect(validateStep("contact", draft)["contact.whatsapp"]).toBeUndefined();
    draft.contact.whatsappSameAsPhone = false;
    // Still optional when left empty.
    expect(validateStep("contact", draft)["contact.whatsapp"]).toBeUndefined();
    draft.contact.whatsapp = "123";
    expect(validateStep("contact", draft)["contact.whatsapp"]).toBe("invalid_phone");
  });

  it("asks for detail when the role is 'other'", () => {
    const draft = withContact(createEmptyDraft());
    draft.contact.role = "other";
    expect(validateStep("contact", draft)["contact.roleOther"]).toBe("required");
    draft.contact.roleOther = "Chef de chantier";
    expect(validateStep("contact", draft)["contact.roleOther"]).toBeUndefined();
  });

  it("asks for detail when the professional type is 'other'", () => {
    const draft = completeDraft();
    draft.business.professionalType = "other";
    expect(validateStep("business", draft)["business.professionalTypeOther"]).toBe("required");
    draft.business.professionalTypeOther = "Groupement d’artisans";
    expect(validateStep("business", draft)["business.professionalTypeOther"]).toBeUndefined();
  });

  it("never blocks submission on optional administrative identifiers", () => {
    const draft = completeDraft();
    expect(draft.business.businessIds).toEqual({});
    // ICE, RC, tax id and CNSS are all absent, yet the step is valid.
    expect(validateStep("business", draft)).toEqual({});
  });

  it("checks optional business fields only when they are filled in", () => {
    const draft = completeDraft();
    expect(validateStep("business", draft)).toEqual({});
    draft.business.foundedYear = "1789";
    draft.business.website = "not a url";
    draft.business.teamSize = "abc";
    const errors = validateStep("business", draft);
    expect(errors["business.foundedYear"]).toBe("invalid_year");
    expect(errors["business.website"]).toBe("invalid_url");
    expect(errors["business.teamSize"]).toBe("invalid_number");
  });

  it("requires a main trade, project types and a client type", () => {
    const errors = validateStep("services", createEmptyDraft());
    expect(errors["services.primaryTrade"]).toBe("required");
    expect(errors["services.projectTypes"]).toBe("select_at_least_one");
    expect(errors["services.clientTypes"]).toBe("required");
  });

  it("accepts several secondary trades", () => {
    const draft = completeDraft();
    draft.services.secondaryTrades = ["tiling", "painting", "masonry"];
    expect(validateStep("services", draft)).toEqual({});
    expect(draft.services.secondaryTrades).toHaveLength(3);
  });

  it("asks for detail when the main trade is 'other'", () => {
    const draft = completeDraft();
    draft.services.primaryTrade = "other";
    expect(validateStep("services", draft)["services.primaryTradeOther"]).toBe("required");
    draft.services.primaryTradeOther = "Ferronnerie d’art";
    expect(validateStep("services", draft)["services.primaryTradeOther"]).toBeUndefined();
  });

  it("requires at least one coverage area and an availability", () => {
    const errors = validateStep("coverage", createEmptyDraft());
    expect(errors["coverage.mainCity"]).toBe("required");
    expect(errors["coverage.availability"]).toBe("required");
  });

  it("treats the main city alone as sufficient coverage", () => {
    const draft = completeDraft();
    expect(draft.coverage.secondaryCities).toEqual([]);
    expect(validateStep("coverage", draft)).toEqual({});
  });

  it("rejects a maximum budget below the minimum", () => {
    const draft = completeDraft();
    draft.coverage.minBudget = "50000";
    draft.coverage.maxBudget = "1000";
    expect(validateStep("coverage", draft)["coverage.maxBudget"]).toBe("budget_range");
    draft.coverage.maxBudget = "90000";
    expect(validateStep("coverage", draft)["coverage.maxBudget"]).toBeUndefined();
  });

  it("enforces a minimum description length", () => {
    const draft = completeDraft();
    draft.presentation.description = "Trop court";
    expect(validateStep("presentation", draft)["presentation.description"]).toBe("description_too_short");
    draft.presentation.description = longDescription;
    expect(validateStep("presentation", draft)["presentation.description"]).toBeUndefined();
  });

  it("requires all four consents but never the marketing one", () => {
    const draft = completeDraft();
    draft.preferences.acceptProfessionalTerms = false;
    draft.preferences.acceptPrivacyPolicy = false;
    draft.preferences.confirmAccuracy = false;
    draft.preferences.allowContactAboutApplication = false;
    const errors = validateStep("preferences", draft);
    expect(errors["preferences.acceptProfessionalTerms"]).toBe("consent_required");
    expect(errors["preferences.acceptPrivacyPolicy"]).toBe("consent_required");
    expect(errors["preferences.confirmAccuracy"]).toBe("consent_required");
    expect(errors["preferences.allowContactAboutApplication"]).toBe("consent_required");
    // Marketing stays optional.
    expect(draft.preferences.acceptMarketing).toBe(false);
    expect(errors["preferences.acceptMarketing"]).toBeUndefined();
  });

  it("accepts a fully completed application", () => {
    expect(validateAll(completeDraft())).toEqual({});
  });
});

describe("country configuration", () => {
  it("exposes the Moroccan business identifiers", () => {
    expect(businessFieldsFor("MA")).toEqual(["ice", "rc", "taxId", "cnss"]);
  });

  it("returns no identifiers for a country that is not configured yet", () => {
    expect(businessFieldsFor("FR")).toEqual([]);
  });
});

describe("file validation", () => {
  const file = (name: string, type: string, size: number) => {
    const value = new File(["x"], name, { type });
    Object.defineProperty(value, "size", { value: size });
    return value;
  };

  it("accepts images and PDFs with a matching extension", () => {
    expect(validateFiles([file("chantier.jpg", "image/jpeg", 1000)])).toEqual([]);
    expect(validateFiles([file("devis.pdf", "application/pdf", 1000)])).toEqual([]);
    expect(validateFiles([file("photo.webp", "image/webp", 1000)])).toEqual([]);
  });

  it("rejects executables and mismatched extensions", () => {
    expect(validateFiles([file("script.exe", "application/x-msdownload", 10)])[0].code).toBe("file_type");
    // A .jpg extension with a script MIME type must not slip through.
    expect(validateFiles([file("payload.jpg", "text/html", 10)])[0].code).toBe("file_type");
  });

  it("rejects oversized files and too many files", () => {
    expect(validateFiles([file("big.png", "image/png", MAX_UPLOAD_BYTES + 1)])[0].code).toBe("file_size");
    const many = Array.from({ length: 20 }, (_, index) => file(`p${index}.png`, "image/png", 10));
    expect(validateFiles(many).some((problem) => problem.code === "file_count")).toBe(true);
  });
});

describe("normalizeDraft", () => {
  it("trims free text and copies the phone into WhatsApp when they are the same", () => {
    const draft = completeDraft();
    draft.contact.firstName = "  Youssef  ";
    draft.contact.phone = " 0612345678 ";
    draft.contact.whatsappSameAsPhone = true;
    const normalized = normalizeDraft(draft);
    expect(normalized.contact.firstName).toBe("Youssef");
    expect(normalized.contact.whatsapp).toBe("0612345678");
  });

  it("drops blank business identifiers rather than sending empty strings", () => {
    const draft = completeDraft();
    draft.business.businessIds = { ice: "  ", rc: " 12345 " };
    expect(normalizeDraft(draft).business.businessIds).toEqual({ rc: "12345" });
  });
});
