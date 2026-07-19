"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { format, plural } from "@/i18n/format";
import { REGISTRATION_EVENTS, trackRegistration } from "@/lib/professional-registration/analytics";
import {
  DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, MAX_PORTFOLIO_FILES, TOTAL_STEPS,
} from "@/lib/professional-registration/constants";
import { createEmptyDraft, createEmptyFiles, mergeDraft } from "@/lib/professional-registration/defaults";
import { STEP_ORDER, normalizeDraft, validateAll, validateFiles, validateStep, type ErrorCode, type StepKey } from "@/lib/professional-registration/schema";
import { clearDraft, loadDraft, saveDraft } from "@/lib/professional-registration/storage";
import { DEMO_MODE, isEndpointConfigured, submitRegistration } from "@/lib/professional-registration/submit";
import type { RegistrationDraft, RegistrationFiles, SubmissionSuccess } from "@/lib/professional-registration/types";
import { ContactStep, BusinessStep, ServicesStep, CoverageStep, PresentationStep, PreferencesStep, type RegistrationLabels } from "./steps";
import { ReviewPanel } from "./ReviewPanel";

type Props = {
  locale: Locale;
  labels: RegistrationLabels;
  legalLinks: { terms: string; privacy: string; home: string; help: string };
};

/** `review` is a seventh screen after the six data-entry steps. */
type Screen = StepKey | "review";
const SCREENS: Screen[] = [...STEP_ORDER, "review"];

const AUTOSAVE_DELAY_MS = 800;

export function RegistrationForm({ locale, labels, legalLinks }: Props) {
  const [draft, setDraft] = useState<RegistrationDraft>(createEmptyDraft);
  const [files, setFiles] = useState<RegistrationFiles>(createEmptyFiles);
  const [screen, setScreen] = useState<Screen>("contact");
  const [errors, setErrors] = useState<Record<string, ErrorCode>>({});
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [savedAt, setSavedAt] = useState<string>();
  const [restored, setRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionSuccess>();
  const [failure, setFailure] = useState<string>();
  const [announcement, setAnnouncement] = useState("");
  /** Honeypot: a real applicant never sees or fills this. */
  const [botField, setBotField] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const hydratedRef = useRef(false);

  const stepIndex = SCREENS.indexOf(screen);
  const isReview = screen === "review";

  /** Resolves an error code to a translated message, filling in any placeholder. */
  const message = useCallback((code: ErrorCode) => {
    const template = labels.errors[code];
    if (code === "description_too_short") return format(template, { min: DESCRIPTION_MIN_LENGTH });
    if (code === "description_too_long") return format(template, { max: DESCRIPTION_MAX_LENGTH });
    if (code === "file_count") return format(template, { max: MAX_PORTFOLIO_FILES });
    return template;
  }, [labels.errors]);

  const messages = Object.fromEntries(
    Object.entries(errors).map(([path, code]) => [path, message(code)]),
  ) as Record<string, string>;

  // Restore a saved draft once, on mount.
  useEffect(() => {
    const stored = loadDraft();
    if (stored) {
      setDraft(mergeDraft(stored.data));
      setSavedAt(stored.savedAt);
      setRestored(true);
    }
    hydratedRef.current = true;
  }, []);

  // Debounced autosave. Files and administrative ids are stripped in `saveDraft`.
  useEffect(() => {
    if (!hydratedRef.current || result) return;
    const timer = setTimeout(() => {
      const envelope = saveDraft(draft);
      if (!envelope) return;
      setSavedAt(envelope.savedAt);
      trackRegistration(REGISTRATION_EVENTS.draftSaved, { step: stepIndex + 1 });
    }, AUTOSAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [draft, stepIndex, result]);

  const update = useCallback(<K extends keyof RegistrationDraft>(section: K, patch: Partial<RegistrationDraft[K]>) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackRegistration(REGISTRATION_EVENTS.started);
    }
    setDraft((current) => ({ ...current, [section]: { ...current[section], ...patch } }));
  }, []);

  /** Moves focus to the first invalid control so keyboard users land on the problem. */
  const focusFirstError = (found: Record<string, ErrorCode>) => {
    const first = Object.keys(found)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      // Field ids double as element ids; grouped controls fall back to their name.
      // `getElementsByName` avoids escaping the dots in paths like `contact.email`.
      const target = document.getElementById(first) ?? document.getElementsByName(first)[0];
      (target as HTMLElement | undefined)?.focus();
      summaryRef.current?.scrollIntoView({ block: "nearest" });
    });
  };

  const goTo = (next: Screen) => {
    setScreen(next);
    setErrors({});
    const index = SCREENS.indexOf(next);
    const title = next === "review" ? labels.review.title : labels.form.steps[index].title;
    setAnnouncement(format(labels.form.stepAnnouncement, { current: index + 1, total: TOTAL_STEPS, title }));
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const goNext = () => {
    if (isReview) return;
    const found = validateStep(screen, draft);
    if (Object.keys(found).length) {
      setErrors(found);
      focusFirstError(found);
      return;
    }
    trackRegistration(REGISTRATION_EVENTS.stepCompleted, { step: stepIndex + 1 });
    const next = SCREENS[stepIndex + 1];
    if (next === "review") trackRegistration(REGISTRATION_EVENTS.reviewed);
    goTo(next);
  };

  const goPrevious = () => {
    if (stepIndex > 0) goTo(SCREENS[stepIndex - 1]);
  };

  const onPortfolioChange = (incoming: FileList | null) => {
    if (!incoming) return;
    const selected = [...files.portfolio, ...Array.from(incoming)].slice(0, MAX_PORTFOLIO_FILES);
    const problems = validateFiles(selected);
    const rejected = new Set(problems.map((problem) => problem.name).filter(Boolean));
    setFileErrors(problems.map((problem) => (problem.name ? `${problem.name} — ${message(problem.code)}` : message(problem.code))));
    // Only files that passed the checks are kept.
    setFiles((current) => ({ ...current, portfolio: selected.filter((file) => !rejected.has(file.name)) }));
  };

  const onPortfolioRemove = (index: number) =>
    setFiles((current) => ({ ...current, portfolio: current.portfolio.filter((_, position) => position !== index) }));

  const onSingleFile = (key: "logo" | "coverImage", file: File | null) => {
    if (file) {
      const problems = validateFiles([file], { maxCount: 1 });
      if (problems.length) {
        setFileErrors(problems.map((problem) => `${problem.name} — ${message(problem.code)}`));
        return;
      }
    }
    setFileErrors([]);
    setFiles((current) => ({ ...current, [key]: file }));
  };

  const onClearDraft = () => {
    if (!window.confirm(labels.draft.clearConfirm)) return;
    clearDraft();
    setDraft(createEmptyDraft());
    setFiles(createEmptyFiles());
    setSavedAt(undefined);
    setRestored(false);
    setAnnouncement(labels.draft.cleared);
    goTo("contact");
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    const found = validateAll(draft);
    if (Object.keys(found).length) {
      setErrors(found);
      // Send the applicant to the first step that still has a problem.
      const firstBadStep = STEP_ORDER.find((step) => Object.keys(validateStep(step, draft)).length);
      if (firstBadStep) setScreen(firstBadStep);
      focusFirstError(found);
      return;
    }

    setSubmitting(true);
    setFailure(undefined);
    const normalized = normalizeDraft(draft);
    const outcome = await submitRegistration(
      { ...normalized, locale, submittedAt: new Date().toISOString(), botField },
      files,
    );
    setSubmitting(false);

    if (outcome.ok) {
      // The draft is only cleared once the server confirmed the application.
      clearDraft();
      setResult(outcome);
      trackRegistration(REGISTRATION_EVENTS.submitted, { demo: outcome.demo === true });
      return;
    }
    setFailure(labels.submission.errors[outcome.code]);
    trackRegistration(REGISTRATION_EVENTS.failed, { code: outcome.code });
  };

  if (result) {
    return (
      <section className="registration-outcome" aria-labelledby="registration-success">
        <h2 id="registration-success">{labels.submission.successTitle}</h2>
        <p>{labels.submission.successIntro}</p>
        {result.demo && (
          <p className="notice notice-warning">
            <strong>{labels.submission.demoTitle}</strong> {labels.submission.demoNote}
          </p>
        )}
        <p className="application-id">
          <span>{labels.submission.applicationId}</span>
          <strong>{result.applicationId}</strong>
        </p>
        <p className="field-help">{labels.submission.applicationIdHelp}</p>
        <h3>{labels.submission.nextStepsTitle}</h3>
        <ol>{labels.submission.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="field-help">{result.reviewEtaLabel ?? labels.submission.noEtaNote}</p>
        <div className="outcome-actions">
          <a className="button button-primary" href={legalLinks.home}>{labels.submission.backHome}</a>
          <a className="button button-secondary" href={legalLinks.help}>{labels.submission.helpCenter}</a>
        </div>
      </section>
    );
  }

  const errorCount = Object.keys(errors).length;
  const currentTitle = isReview ? labels.review.title : labels.form.steps[stepIndex].title;
  const stepProps = { draft, update, errors: messages, labels, locale, legalLinks };

  return (
    <form className="registration-form" noValidate onSubmit={onSubmit} aria-labelledby="registration-heading">
      <p aria-live="polite" className="sr-only">{announcement}</p>

      <div className="registration-progress">
        <p className="step-counter">{format(labels.form.stepIndicator, { current: Math.min(stepIndex + 1, TOTAL_STEPS), total: TOTAL_STEPS })}</p>
        <div
          role="progressbar"
          aria-label={labels.form.progressLabel}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={Math.min(stepIndex + 1, TOTAL_STEPS)}
          aria-valuetext={format(labels.form.stepAnnouncement, { current: Math.min(stepIndex + 1, TOTAL_STEPS), total: TOTAL_STEPS, title: currentTitle })}
        >
          <span className="progress-fill" style={{ width: `${((stepIndex + 1) / SCREENS.length) * 100}%` }} />
        </div>
        <ol className="step-list">
          {labels.form.steps.map((step, index) => (
            <li key={step.short} aria-current={index === stepIndex ? "step" : undefined}
                className={index < stepIndex ? "step-done" : index === stepIndex ? "step-current" : ""}>
              <span aria-hidden="true">{index + 1}</span> {step.short}
            </li>
          ))}
        </ol>
      </div>

      {restored && <p className="notice notice-info">{labels.draft.restored}</p>}

      {errorCount > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <h3>{labels.form.errorSummaryTitle}</h3>
          <p>{plural(labels.form.errorSummaryIntro, errorCount, locale)}</p>
          <ul>
            {Object.entries(errors).map(([path, code]) => (
              <li key={path}><a href={`#${path}`}>{message(code)}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h2 id="registration-heading" ref={headingRef} tabIndex={-1}>{currentTitle}</h2>
      {!isReview && <p className="step-description">{labels.form.steps[stepIndex].description}</p>}

      {/* Honeypot: hidden from users and assistive tech, attractive to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company-website-hp">Website</label>
        <input id="company-website-hp" name="company_website" type="text" tabIndex={-1} autoComplete="off"
          value={botField} onChange={(event) => setBotField(event.target.value)} />
      </div>

      <div className="registration-body">
        {screen === "contact" && <ContactStep {...stepProps} />}
        {screen === "business" && <BusinessStep {...stepProps} />}
        {screen === "services" && <ServicesStep {...stepProps} />}
        {screen === "coverage" && <CoverageStep {...stepProps} />}
        {screen === "presentation" && (
          <PresentationStep {...stepProps} files={files} fileErrors={fileErrors}
            onPortfolioChange={onPortfolioChange} onPortfolioRemove={onPortfolioRemove} onSingleFile={onSingleFile} />
        )}
        {screen === "preferences" && <PreferencesStep {...stepProps} />}
        {isReview && <ReviewPanel draft={draft} files={files} labels={labels} locale={locale} onEdit={goTo} />}
      </div>

      {failure && (
        <div className="notice notice-error" role="alert">
          <strong>{labels.submission.errorTitle}</strong>
          <p>{failure}</p>
          <p className="field-help">{labels.submission.draftKeptNote}</p>
        </div>
      )}

      {!isEndpointConfigured() && !DEMO_MODE && (
        <p className="notice notice-warning">{labels.submission.errors.endpoint_not_configured}</p>
      )}

      <div className="registration-actions">
        {stepIndex > 0 && (
          <button type="button" className="button button-secondary" onClick={goPrevious}>{labels.form.previous}</button>
        )}
        {isReview ? (
          <button type="submit" className="button button-primary" disabled={submitting}>
            {submitting ? labels.form.submitting : labels.form.submit}
          </button>
        ) : (
          <button type="button" className="button button-primary" onClick={goNext}>
            {stepIndex === STEP_ORDER.length - 1 ? labels.form.review : labels.form.next}
          </button>
        )}
      </div>

      <div className="draft-bar">
        <span aria-live="polite">
          {savedAt ? format(labels.draft.savedAt, { time: new Date(savedAt).toLocaleTimeString(locale) }) : labels.draft.note}
        </span>
        {savedAt && <button type="button" className="text-button" onClick={onClearDraft}>{labels.draft.clear}</button>}
      </div>
    </form>
  );
}
