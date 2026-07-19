import type { QuoteDraft } from "./types";
export const createQuoteDraft = (): QuoteDraft => ({
  project: { title: "", type: "", description: "", stage: "", objective: "", requesterType: "", urgent: false },
  property: { type: "", use: "", occupancy: "", authorized: false, area: "", areaUnit: "m2", rooms: "", floors: "", targetFloor: "", constructionYear: "", condition: "", occupiedDuringWork: false, constraints: [] },
  trades: { primary: "", secondary: [], services: "", other: "", details: {} },
  finishes: { level: "", durability: "", pricePriority: "", style: "", materialPreferences: "", alreadyPurchased: false, supplyMode: "", brands: "", equivalentsAccepted: false, ecological: false, reuseExisting: false },
  budget: { defined: false, range: "", min: "", max: "", currency: "MAD", flexible: false, fundingAvailable: false, needsFinancing: false, startDate: "", deadline: "", datesFlexible: false, maxDuration: "", urgent: false, phased: false, wantsAdvice: false },
  location: { country: "MA", region: "", city: "", district: "", postalCode: "", address: "", landmark: "", coordinates: "", radiusKm: "", visitPossible: false, visitAvailability: "", onsitePerson: "", constraints: [], accessOther: "" },
  documents: { notes: "" },
  contact: { salutation: "", firstName: "", lastName: "", email: "", phone: "", whatsappSame: false, whatsapp: "", organization: "", language: "", preferredContact: "", preferredTimes: "", mayCall: false, preferredProfessionalCount: "", acceptTerms: false, acceptPrivacy: false, confirmAccuracy: false, allowSharing: false, allowContact: false, marketing: false },
});
