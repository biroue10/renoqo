import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuickEstimateForm } from "@/components/home/QuickEstimateForm";
import { fr } from "@/i18n/dictionaries/fr";

const trackEvent = vi.fn();
vi.mock("@/lib/analytics", () => ({ trackEvent: (...args: unknown[]) => trackEvent(...args) }));

describe("calculator analytics", () => {
  afterEach(() => { cleanup(); trackEvent.mockClear(); });

  it("tracks the first interaction once and completion only for valid inputs", () => {
    render(<QuickEstimateForm locale="fr" labels={fr.estimate} />);
    fireEvent.change(screen.getByLabelText(fr.estimate.projectLabel), { target: { value: "renovation" } });
    fireEvent.change(screen.getByLabelText(fr.estimate.cityLabel), { target: { value: "casablanca" } });
    expect(trackEvent.mock.calls.filter(([name]) => name === "calculator_started")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: /Calculer/ }));
    expect(trackEvent).not.toHaveBeenCalledWith("calculator_completed", expect.anything());
    fireEvent.change(screen.getByLabelText(fr.estimate.areaLabel), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText(fr.estimate.finishLabel), { target: { value: "standard" } });
    fireEvent.click(screen.getByRole("button", { name: /Calculer/ }));
    expect(trackEvent).toHaveBeenCalledWith("calculator_completed", { calculator_type: "quick_estimate", project_type: "renovation", city_id: "casablanca", finish_level: "standard" });
    const refine = screen.getByRole("link", { name: fr.estimate.refine });
    refine.addEventListener("click", event => event.preventDefault());
    fireEvent.click(refine);
    expect(trackEvent).toHaveBeenCalledWith("estimate_professional_refinement_clicked", { project_type: "renovation", city_id: "casablanca", finish_level: "standard", locale: "fr" });
  });
});
