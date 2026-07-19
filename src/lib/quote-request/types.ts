import type { QuoteStatus, Trade } from "./constants";

export type QuoteDraft = {
  project: { title: string; type: string; description: string; stage: string; objective: string; requesterType: "individual" | "organization" | ""; urgent: boolean };
  property: { type: string; use: string; occupancy: string; authorized: boolean; area: string; areaUnit: "m2"; rooms: string; floors: string; targetFloor: string; constructionYear: string; condition: string; occupiedDuringWork: boolean; constraints: string[] };
  trades: { primary: Trade | ""; secondary: Trade[]; services: string; other: string; details: Record<string, Record<string, string | boolean>> };
  finishes: { level: string; durability: string; pricePriority: string; style: string; materialPreferences: string; alreadyPurchased: boolean; supplyMode: string; brands: string; equivalentsAccepted: boolean; ecological: boolean; reuseExisting: boolean };
  budget: { defined: boolean; range: string; min: string; max: string; currency: "MAD"; flexible: boolean; fundingAvailable: boolean; needsFinancing: boolean; startDate: string; deadline: string; datesFlexible: boolean; maxDuration: string; urgent: boolean; phased: boolean; wantsAdvice: boolean };
  location: { country: "MA"; region: string; city: string; district: string; postalCode: string; address: string; landmark: string; coordinates: string; radiusKm: string; visitPossible: boolean; visitAvailability: string; onsitePerson: string; constraints: string[]; accessOther: string };
  documents: { notes: string };
  contact: { salutation: string; firstName: string; lastName: string; email: string; phone: string; whatsappSame: boolean; whatsapp: string; organization: string; language: "fr" | "en" | ""; preferredContact: "email" | "phone" | "whatsapp" | ""; preferredTimes: string; mayCall: boolean; preferredProfessionalCount: string; acceptTerms: boolean; acceptPrivacy: boolean; confirmAccuracy: boolean; allowSharing: boolean; allowContact: boolean; marketing: boolean };
};
export type QuoteFiles = File[];
export type QuoteDraftEnvelope = { version: number; country: string; savedAt: string; expiresAt: string; data: QuoteDraft };
export type QuotePayload = QuoteDraft & { locale: string; submittedAt: string; botField: string; turnstileToken?: string };
export type QuoteSuccess = { ok: true; requestId: string; status: QuoteStatus };
export type QuoteFailureCode = "endpoint_not_configured" | "network_error" | "validation_error" | "rate_limited" | "duplicate" | "payload_too_large" | "server_error";
export type QuoteResult = QuoteSuccess | { ok: false; code: QuoteFailureCode; fieldErrors?: Record<string, string> };
