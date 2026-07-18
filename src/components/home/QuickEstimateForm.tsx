"use client";
import { useState } from "react";
import { calculateEstimate, formatMAD, validateEstimate, type EstimateInput, type ValidationErrors } from "@/lib/estimate";

const initial = { project: "", city: "", area: "", finish: "" };
export function QuickEstimateForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<{ low: number; high: number }>();
  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues({ ...values, [event.target.name]: event.target.value });
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = { ...values, area: Number(values.area) } as EstimateInput;
    const nextErrors = validateEstimate(input); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setResult(undefined); return; }
    setResult(calculateEstimate(input));
  };
  const field = (name: keyof ValidationErrors) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  return <div className="estimate-card"><div className="estimate-card-head"><span className="pulse-dot" aria-hidden="true" /><div><p className="eyebrow">Estimation express</p><h2>Quel est votre projet ?</h2></div><span className="free-pill">Gratuit</span></div><form noValidate onSubmit={submit}><label htmlFor="project">Type de projet</label><select id="project" name="project" value={values.project} onChange={change} aria-invalid={!!errors.project} aria-describedby={errors.project ? "project-error" : undefined}><option value="">Sélectionnez vos travaux</option><option value="renovation">Rénovation complète</option><option value="peinture">Peinture</option><option value="plomberie">Plomberie</option><option value="electricite">Électricité</option><option value="carrelage">Carrelage</option><option value="construction">Construction</option><option value="cuisine">Cuisine</option><option value="bain">Salle de bain</option><option value="climatisation">Climatisation</option><option value="solaire">Installation solaire</option></select>{field("project")}<div className="form-row"><div><label htmlFor="city">Ville</label><select id="city" name="city" value={values.city} onChange={change} aria-invalid={!!errors.city}><option value="">Choisir</option><option value="casablanca">Casablanca</option><option value="rabat">Rabat</option><option value="marrakech">Marrakech</option><option value="tanger">Tanger</option><option value="agadir">Agadir</option><option value="fes">Fès</option></select>{field("city")}</div><div><label htmlFor="area">Superficie approximative</label><div className="input-suffix"><input id="area" name="area" type="number" min="1" max="10000" inputMode="decimal" placeholder="Ex. 80" value={values.area} onChange={change} aria-invalid={!!errors.area} /><span>m²</span></div>{field("area")}</div></div><label htmlFor="finish">Niveau de finition</label><select id="finish" name="finish" value={values.finish} onChange={change} aria-invalid={!!errors.finish}><option value="">Choisir un niveau</option><option value="economique">Économique</option><option value="standard">Standard</option><option value="premium">Premium</option></select>{field("finish")}<button className="button button-primary estimate-submit" type="submit">Calculer mon estimation <span aria-hidden="true">→</span></button></form><div className="estimate-result" aria-live="polite" aria-atomic="true">{result ? <><p>Budget estimé</p><strong>{formatMAD(result.low)} – {formatMAD(result.high)}</strong><small>Cette estimation est indicative et ne constitue pas un devis contractuel. Elle dépend notamment des matériaux et de l’état du logement.</small></> : <p className="result-placeholder">Renseignez ces quatre critères pour obtenir une première fourchette en MAD.</p>}</div></div>;
}
