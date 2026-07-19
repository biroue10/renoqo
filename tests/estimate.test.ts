import { describe, expect, it } from "vitest";
import { calculateEstimate, finishCoefficients, formatMAD, formatRange, validateEstimate } from "@/lib/estimate";

describe("estimate engine", () => {
  it("returns a rounded increasing range", () => {
    const result = calculateEstimate({ project: "peinture", city: "rabat", area: 100, finish: "standard" });
    expect(result.low % 100).toBe(0);
    expect(result.high).toBeGreaterThan(result.low);
  });

  it("keeps finish coefficients ordered", () => {
    expect(finishCoefficients.economique).toBeLessThan(finishCoefficients.standard);
    expect(finishCoefficients.premium).toBeGreaterThan(finishCoefficients.standard);
  });

  it("formats Moroccan dirhams per locale while keeping MAD in both", () => {
    expect(formatMAD(45000, "fr")).toMatch(/^45[\s  ]000 MAD$/);
    expect(formatMAD(45000, "en")).toBe("45,000 MAD");
  });

  it("formats indicative ranges and returns null when the price is on request", () => {
    expect(formatRange(2200, 5500, "en")).toBe("2,200 – 5,500 MAD");
    expect(formatRange(null, null, "en")).toBeNull();
  });

  it("reports which fields are invalid rather than a translated message", () => {
    expect(Object.keys(validateEstimate({ area: 0 }))).toEqual(expect.arrayContaining(["project", "city", "finish", "area"]));
    expect(validateEstimate({ project: "peinture", city: "fes", finish: "standard", area: 25 })).toEqual({});
  });

  it("produces identical figures regardless of the reading language", () => {
    const input = { project: "renovation", city: "casablanca", area: 120, finish: "premium" } as const;
    const result = calculateEstimate(input);
    const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");
    expect(digitsOnly(formatMAD(result.low, "fr"))).toBe(digitsOnly(formatMAD(result.low, "en")));
    expect(digitsOnly(formatMAD(result.high, "fr"))).toBe(digitsOnly(formatMAD(result.high, "en")));
  });
});
