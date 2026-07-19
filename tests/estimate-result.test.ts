import { describe, expect, it } from "vitest";
import { calculateEstimate } from "@/lib/estimate";
import { estimateBreakdownWeights, estimateMidpoint, quotePrefillHref } from "@/lib/estimate-result";

describe("detailed estimate presentation", () => {
  it("preserves engine bounds and calculates a deterministic ordered midpoint", () => {
    const input = { project: "renovation", city: "casablanca", area: 80, finish: "standard" } as const;
    const before = calculateEstimate(input);
    const after = calculateEstimate(input);
    const central = estimateMidpoint(after.low, after.high);
    expect(after).toEqual(before);
    expect(central).toBe(estimateMidpoint(before.low, before.high));
    expect(before.low).toBeLessThanOrEqual(central);
    expect(central).toBeLessThanOrEqual(before.high);
    expect(central % 100).toBe(0);
  });

  it("does not invent a breakdown when the engine exposes no components", () => {
    expect(estimateBreakdownWeights.renovation).toBeUndefined();
  });

  it("builds localized prefill URLs without price or personal information", () => {
    const input = { project: "renovation", city: "casablanca", area: 80, finish: "standard" } as const;
    expect(quotePrefillHref(input, "fr")).toBe("/demander-un-devis/?project=renovation&city=casablanca&area=80&finish=standard");
    const english = quotePrefillHref(input, "en");
    expect(english.startsWith("/en/demander-un-devis/?")).toBe(true);
    expect(english).not.toMatch(/price|email|phone|address/i);
  });
});
