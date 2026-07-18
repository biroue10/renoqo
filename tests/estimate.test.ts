import { describe, expect, it } from "vitest";
import { calculateEstimate, finishCoefficients, formatMAD, validateEstimate } from "@/lib/estimate";

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
  it("formats Moroccan dirhams", () => expect(formatMAD(45000)).toMatch(/^45[\s\u202f]000 MAD$/));
  it("validates all required values and area bounds", () => {
    expect(Object.keys(validateEstimate({ area: 0 }))).toEqual(expect.arrayContaining(["project", "city", "finish", "area"]));
    expect(validateEstimate({ project: "peinture", city: "fes", finish: "standard", area: 25 })).toEqual({});
  });
});
