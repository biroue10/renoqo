import { beforeEach, describe, expect, it } from "vitest";
import { DRAFT_STORAGE_KEY } from "@/lib/professional-registration/constants";
import { createEmptyDraft, mergeDraft } from "@/lib/professional-registration/defaults";
import { clearDraft, loadDraft, saveDraft, stripSensitive } from "@/lib/professional-registration/storage";

describe("draft storage", () => {
  beforeEach(() => localStorage.clear());

  it("saves and restores the non-sensitive answers", () => {
    const draft = createEmptyDraft();
    draft.contact.firstName = "Youssef";
    draft.services.primaryTrade = "plumbing";
    const envelope = saveDraft(draft);
    expect(envelope).not.toBeNull();

    const restored = loadDraft();
    expect(restored?.data.contact.firstName).toBe("Youssef");
    expect(restored?.data.services.primaryTrade).toBe("plumbing");
    expect(restored?.savedAt).toBeTruthy();
  });

  it("never writes administrative identifiers to localStorage", () => {
    const draft = createEmptyDraft();
    draft.business.businessIds = { ice: "001234567000089", rc: "45231", taxId: "IF-778", cnss: "9988776" };
    saveDraft(draft);

    const raw = localStorage.getItem(DRAFT_STORAGE_KEY) ?? "";
    for (const secret of ["001234567000089", "45231", "IF-778", "9988776"]) {
      expect(raw).not.toContain(secret);
    }
    expect(loadDraft()?.data.business.businessIds).toEqual({});
  });

  it("strips the regulated identifiers but keeps the rest of the business section", () => {
    const draft = createEmptyDraft();
    draft.business.tradeName = "Atelier Bâtiment";
    draft.business.businessIds = { ice: "001", cnss: "002" };
    const stripped = stripSensitive(draft);
    expect(stripped.business.tradeName).toBe("Atelier Bâtiment");
    expect(stripped.business.businessIds).toEqual({});
  });

  it("stores no file data at all", () => {
    const draft = createEmptyDraft();
    saveDraft(draft);
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY) ?? "";
    // Files live only in component state; the persisted shape has no place for them.
    expect(raw).not.toContain("portfolio");
    expect(raw).not.toContain("logo");
    expect(raw).not.toContain("coverImage");
    expect(raw).not.toContain("data:");
  });

  it("clears the draft on request", () => {
    saveDraft(createEmptyDraft());
    expect(localStorage.getItem(DRAFT_STORAGE_KEY)).not.toBeNull();
    clearDraft();
    expect(localStorage.getItem(DRAFT_STORAGE_KEY)).toBeNull();
    expect(loadDraft()).toBeNull();
  });

  it("discards a draft written by an older version", () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ version: 0, savedAt: "x", data: {} }));
    expect(loadDraft()).toBeNull();
  });

  it("ignores corrupted JSON instead of throwing", () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, "{not json");
    expect(loadDraft()).toBeNull();
  });
});

describe("mergeDraft", () => {
  it("fills missing sections from the defaults", () => {
    const merged = mergeDraft({ contact: { firstName: "Salma" } } as never);
    expect(merged.contact.firstName).toBe("Salma");
    expect(merged.coverage.mainCity).toBe("");
    expect(merged.services.secondaryTrades).toEqual([]);
  });

  it("never restores consents from a draft", () => {
    const merged = mergeDraft({
      preferences: {
        acceptProfessionalTerms: true, acceptPrivacyPolicy: true, confirmAccuracy: true,
        allowContactAboutApplication: true, acceptMarketing: true,
      },
    } as never);
    expect(merged.preferences.acceptProfessionalTerms).toBe(false);
    expect(merged.preferences.acceptPrivacyPolicy).toBe(false);
    expect(merged.preferences.confirmAccuracy).toBe(false);
    expect(merged.preferences.allowContactAboutApplication).toBe(false);
    expect(merged.preferences.acceptMarketing).toBe(false);
  });
});
