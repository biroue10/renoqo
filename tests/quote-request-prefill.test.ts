import { describe, expect, it } from "vitest";
import { createQuoteDraft } from "@/lib/quote-request/defaults";
import { draftWithPrefill, parseQuotePrefill } from "@/lib/quote-request/prefill";

describe("quote request prefill", () => {
  it("accepts only known internal identifiers and bounded area", () => {
    expect(parseQuotePrefill("?project=renovation&city=casablanca&area=80&finish=standard&description=ignored")).toEqual({ projectType: "full_renovation", primaryTrade: "renovation", city: "casablanca", area: "80", finishLevel: "standard" });
    expect(parseQuotePrefill("?project=<script>&city=unknown&area=999999&finish=gold&email=x@example.com")).toEqual({});
  });

  it("fills only empty fields and preserves an existing draft", () => {
    const draft = createQuoteDraft();
    draft.project.type = "repair"; draft.property.area = "120"; draft.location.city = "rabat";
    const merged = draftWithPrefill(parseQuotePrefill("?project=construction&city=casablanca&area=80&finish=premium"), draft);
    expect(merged.project.type).toBe("repair"); expect(merged.property.area).toBe("120"); expect(merged.location.city).toBe("rabat");
    expect(merged.trades.primary).toBe("construction"); expect(merged.finishes.level).toBe("premium");
  });
});
