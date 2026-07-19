"use client";
import { useState } from "react";
import { cities } from "@/data/cities";
import type { Locale } from "@/i18n/config";
import { calculateEstimate, formatMAD, validateEstimate, type EstimateField, type EstimateInput, type ValidationErrors } from "@/lib/estimate";

/** Option order is fixed here; the labels come from the active dictionary. */
const PROJECT_ORDER = ["renovation", "peinture", "plomberie", "electricite", "carrelage", "construction", "cuisine", "bain", "climatisation", "solaire"] as const;
const FINISH_ORDER = ["economique", "standard", "premium"] as const;

type Labels = {
  eyebrow: string; title: string; freeBadge: string;
  projectLabel: string; projectPlaceholder: string;
  cityLabel: string; cityPlaceholder: string;
  areaLabel: string; areaPlaceholder: string; areaUnit: string;
  finishLabel: string; finishPlaceholder: string;
  submit: string; reset: string;
  resultLabel: string; resultDisclaimer: string; placeholder: string; errorSummary: string;
  projects: Record<(typeof PROJECT_ORDER)[number], string>;
  finishes: Record<(typeof FINISH_ORDER)[number], string>;
  errors: Record<EstimateField, string>;
};

const initial = { project: "", city: "", area: "", finish: "" };

export function QuickEstimateForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<{ low: number; high: number }>();

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = { ...values, area: Number(values.area) } as EstimateInput;
    const nextErrors = validateEstimate(input);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setResult(undefined);
      return;
    }
    setResult(calculateEstimate(input));
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setResult(undefined);
  };

  const describedBy = (name: EstimateField) => (errors[name] ? `${name}-error` : undefined);
  const error = (name: EstimateField) =>
    errors[name] ? <span className="field-error" id={`${name}-error`}>{labels.errors[name]}</span> : null;

  const touched = result !== undefined || Object.values(values).some(Boolean);

  return (
    <div className="estimate-card">
      <div className="estimate-card-head">
        <span className="pulse-dot" aria-hidden="true" />
        <div><p className="eyebrow">{labels.eyebrow}</p><h2>{labels.title}</h2></div>
        <span className="free-pill">{labels.freeBadge}</span>
      </div>
      <form noValidate onSubmit={submit}>
        <label htmlFor="project">{labels.projectLabel}</label>
        <select id="project" name="project" value={values.project} onChange={change} aria-invalid={!!errors.project} aria-describedby={describedBy("project")}>
          <option value="">{labels.projectPlaceholder}</option>
          {PROJECT_ORDER.map((key) => <option value={key} key={key}>{labels.projects[key]}</option>)}
        </select>
        {error("project")}
        <div className="form-row">
          <div>
            <label htmlFor="city">{labels.cityLabel}</label>
            <select id="city" name="city" value={values.city} onChange={change} aria-invalid={!!errors.city} aria-describedby={describedBy("city")}>
              <option value="">{labels.cityPlaceholder}</option>
              {cities.map((city) => <option value={city.slug} key={city.slug}>{city.name}</option>)}
            </select>
            {error("city")}
          </div>
          <div>
            <label htmlFor="area">{labels.areaLabel}</label>
            <div className="input-suffix">
              <input id="area" name="area" type="number" min="1" max="10000" inputMode="decimal" placeholder={labels.areaPlaceholder} value={values.area} onChange={change} aria-invalid={!!errors.area} aria-describedby={describedBy("area")} />
              <span>{labels.areaUnit}</span>
            </div>
            {error("area")}
          </div>
        </div>
        <label htmlFor="finish">{labels.finishLabel}</label>
        <select id="finish" name="finish" value={values.finish} onChange={change} aria-invalid={!!errors.finish} aria-describedby={describedBy("finish")}>
          <option value="">{labels.finishPlaceholder}</option>
          {FINISH_ORDER.map((key) => <option value={key} key={key}>{labels.finishes[key]}</option>)}
        </select>
        {error("finish")}
        <button className="button button-primary estimate-submit" type="submit">{labels.submit} <span aria-hidden="true">→</span></button>
        {touched && <button className="estimate-reset" type="button" onClick={reset}>{labels.reset}</button>}
      </form>
      <div className="estimate-result" aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <p>{labels.resultLabel}</p>
            <strong>{formatMAD(result.low, locale)} – {formatMAD(result.high, locale)}</strong>
            <small>{labels.resultDisclaimer}</small>
          </>
        ) : (
          <p className="result-placeholder">{Object.keys(errors).length ? labels.errorSummary : labels.placeholder}</p>
        )}
      </div>
    </div>
  );
}
