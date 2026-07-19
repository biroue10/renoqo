import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { QuickEstimateForm } from "@/components/home/QuickEstimateForm";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";

const fill = (values: { project: string; city: string; area: string; finish: string }) => {
  fireEvent.change(screen.getByLabelText(/project type|type de projet/i), { target: { name: "project", value: values.project } });
  fireEvent.change(screen.getByLabelText(/^city$|^ville$/i), { target: { name: "city", value: values.city } });
  fireEvent.change(screen.getByLabelText(/approximate area|superficie/i), { target: { name: "area", value: values.area } });
  fireEvent.change(screen.getByLabelText(/finish level|niveau de finition/i), { target: { name: "finish", value: values.finish } });
};

const submit = (labels: typeof fr.estimate) => fireEvent.click(screen.getByRole("button", { name: new RegExp(labels.submit, "i") }));

describe("QuickEstimateForm", () => {
  afterEach(cleanup);

  it("renders English labels, options and placeholders", () => {
    render(<QuickEstimateForm locale="en" labels={en.estimate} />);
    expect(screen.getByText("What is your project?")).toBeTruthy();
    expect(screen.getByRole("option", { name: "Full renovation" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Economy" })).toBeTruthy();
    expect(screen.getByText(/Enter these four criteria/i)).toBeTruthy();
  });

  it("shows translated validation messages when the form is incomplete", () => {
    render(<QuickEstimateForm locale="en" labels={en.estimate} />);
    submit(en.estimate);
    expect(screen.getByText("Select a project type.")).toBeTruthy();
    expect(screen.getByText("Select a city.")).toBeTruthy();
    expect(screen.getByText("Enter an area between 1 and 10,000 m².")).toBeTruthy();
    expect(screen.getByText("Select a finish level.")).toBeTruthy();
  });

  it("shows French validation messages for the French locale", () => {
    render(<QuickEstimateForm locale="fr" labels={fr.estimate} />);
    submit(fr.estimate);
    expect(screen.getByText("Choisissez un type de projet.")).toBeTruthy();
    expect(screen.getByText("Indiquez une superficie entre 1 et 10 000 m².")).toBeTruthy();
  });

  it("computes the same figures in both languages, formatted per locale", () => {
    const values = { project: "renovation", city: "casablanca", area: "100", finish: "standard" };

    const french = render(<QuickEstimateForm locale="fr" labels={fr.estimate} />);
    fill(values);
    submit(fr.estimate);
    const frenchResult = french.container.querySelector(".estimate-result strong")?.textContent ?? "";
    french.unmount();

    const english = render(<QuickEstimateForm locale="en" labels={en.estimate} />);
    fill(values);
    submit(en.estimate);
    const englishResult = english.container.querySelector(".estimate-result strong")?.textContent ?? "";

    const digits = (value: string) => value.replace(/[^0-9]/g, "");
    expect(digits(frenchResult)).toBe(digits(englishResult));
    expect(frenchResult).toContain("MAD");
    expect(englishResult).toContain("MAD");
    expect(englishResult).not.toBe("");
  });

  it("links each error to its field for assistive technology", () => {
    render(<QuickEstimateForm locale="en" labels={en.estimate} />);
    submit(en.estimate);
    const project = screen.getByLabelText(/project type/i);
    expect(project.getAttribute("aria-invalid")).toBe("true");
    expect(project.getAttribute("aria-describedby")).toBe("project-error");
  });
});
