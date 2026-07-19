"use client";
import type { Locale } from "@/i18n/config";
import { plural } from "@/i18n/format";
import type { RegistrationDraft, RegistrationFiles } from "@/lib/professional-registration/types";
import type { StepKey } from "@/lib/professional-registration/schema";
import type { RegistrationLabels } from "./steps";

type Row = { label: string; value: string };

type Props = {
  draft: RegistrationDraft;
  files: RegistrationFiles;
  labels: RegistrationLabels;
  locale: Locale;
  onEdit: (step: StepKey) => void;
};

/**
 * Read-only summary shown before submission.
 *
 * Administrative identifiers and uploaded files are deliberately reduced to a
 * "provided" marker: they are never rendered back, here or on a public profile.
 */
export function ReviewPanel({ draft, files, labels, locale, onEdit }: Props) {
  const r = labels.review;
  const f = labels.fields;
  const o = labels.options;
  const empty = r.empty;

  const text = (value: string) => value.trim() || empty;
  const bool = (value: boolean) => (value ? r.yes : r.no);
  const list = (ids: string[], map: Record<string, string>) =>
    ids.length ? ids.map((id) => map[id] ?? id).join(", ") : empty;
  const one = (id: string, map: Record<string, string>) => (id ? map[id] ?? id : empty);

  const providedIds = Object.values(draft.business.businessIds).filter((value) => value.trim()).length;
  const fileCount = files.portfolio.length + (files.logo ? 1 : 0) + (files.coverImage ? 1 : 0);

  const sections: { key: StepKey | "consents"; title: string; step: StepKey; rows: Row[] }[] = [
    {
      key: "contact", step: "contact", title: r.sections.contact,
      rows: [
        { label: f.firstName, value: text(`${draft.contact.firstName} ${draft.contact.lastName}`) },
        { label: f.email, value: text(draft.contact.email) },
        { label: f.phone, value: text(draft.contact.phone) },
        { label: f.whatsapp, value: draft.contact.whatsappSameAsPhone ? text(draft.contact.phone) : text(draft.contact.whatsapp) },
        { label: f.contactLanguage, value: one(draft.contact.contactLanguage, o.contactLanguages) },
        { label: f.role, value: draft.contact.role === "other" ? text(draft.contact.roleOther) : one(draft.contact.role, o.roles) },
      ],
    },
    {
      key: "business", step: "business", title: r.sections.business,
      rows: [
        { label: f.professionalType, value: draft.business.professionalType === "other" ? text(draft.business.professionalTypeOther) : one(draft.business.professionalType, o.professionalTypes) },
        { label: f.tradeName, value: text(draft.business.tradeName) },
        { label: f.legalName, value: text(draft.business.legalName) },
        { label: f.country, value: one(draft.business.country, o.countries) },
        { label: f.city, value: one(draft.business.city, o.cities) },
        { label: f.address, value: text(draft.business.address) },
        { label: f.foundedYear, value: text(draft.business.foundedYear) },
        { label: f.teamSize, value: text(draft.business.teamSize) },
        { label: f.website, value: text(draft.business.website) },
        // Never echoed back: only whether something was supplied.
        { label: f.businessIdsTitle, value: providedIds > 0 ? r.hiddenValue : empty },
      ],
    },
    {
      key: "services", step: "services", title: r.sections.services,
      rows: [
        { label: f.primaryTrade, value: draft.services.primaryTrade === "other" ? text(draft.services.primaryTradeOther) : one(draft.services.primaryTrade, o.trades) },
        { label: f.secondaryTrades, value: list(draft.services.secondaryTrades, o.trades) },
        { label: f.specialties, value: text(draft.services.specialties) },
        { label: f.projectTypes, value: list(draft.services.projectTypes, o.projectTypes) },
        { label: f.clientTypes, value: one(draft.services.clientTypes, o.clientTypes) },
      ],
    },
    {
      key: "coverage", step: "coverage", title: r.sections.coverage,
      rows: [
        { label: f.mainCity, value: one(draft.coverage.mainCity, o.cities) },
        { label: f.coversWholeRegion, value: bool(draft.coverage.coversWholeRegion) },
        { label: f.secondaryCities, value: list(draft.coverage.secondaryCities, o.cities) },
        { label: f.neighbourhoods, value: text(draft.coverage.neighbourhoods) },
        { label: f.travelRadius, value: text(draft.coverage.travelRadiusKm) },
        { label: f.availability, value: one(draft.coverage.availability, o.availability) },
        { label: f.acceptsUrgent, value: bool(draft.coverage.acceptsUrgent) },
        { label: f.availableDays, value: list(draft.coverage.availableDays, o.weekDays) },
        { label: f.minBudget, value: text(draft.coverage.minBudget) },
        { label: f.maxBudget, value: text(draft.coverage.maxBudget) },
      ],
    },
    {
      key: "presentation", step: "presentation", title: r.sections.presentation,
      rows: [
        { label: f.description, value: text(draft.presentation.description) },
        { label: f.yearsOfExperience, value: text(draft.presentation.yearsOfExperience) },
        { label: f.spokenLanguages, value: list(draft.presentation.spokenLanguages, o.spokenLanguages) },
        { label: f.certifications, value: text(draft.presentation.certifications) },
        { label: f.hasInsurance, value: bool(draft.presentation.hasInsurance) },
        { label: f.offersWarranty, value: bool(draft.presentation.offersWarranty) },
        { label: f.portfolio, value: fileCount ? plural(r.filesCount, fileCount, locale) : empty },
      ],
    },
    {
      key: "preferences", step: "preferences", title: r.sections.preferences,
      rows: [
        { label: f.channels, value: list(draft.preferences.channels, o.channels) },
        { label: f.interestedProjectTypes, value: list(draft.preferences.interestedProjectTypes, o.projectTypes) },
        { label: f.minimumProjectBudget, value: text(draft.preferences.minimumProjectBudget) },
        { label: f.preferredAreas, value: list(draft.preferences.preferredAreas, o.cities) },
        { label: f.notificationFrequency, value: one(draft.preferences.notificationFrequency, o.notificationFrequencies) },
        { label: f.pauseRequests, value: bool(draft.preferences.pauseRequests) },
      ],
    },
    {
      key: "consents", step: "preferences", title: r.sections.consents,
      rows: [
        { label: labels.consents.termsLink, value: bool(draft.preferences.acceptProfessionalTerms) },
        { label: labels.consents.privacyLink, value: bool(draft.preferences.acceptPrivacyPolicy) },
        { label: r.sections.consents, value: bool(draft.preferences.confirmAccuracy) },
        { label: labels.consents.marketing, value: bool(draft.preferences.acceptMarketing) },
      ],
    },
  ];

  // The step heading already announces the review title, so it is not repeated here.
  return (
    <div className="review-panel">
      <p className="field-help">{r.intro}</p>
      {sections.map((section) => (
        <section className="review-section" key={section.key}>
          <div className="review-section-head">
            <h3>{section.title}</h3>
            <button type="button" className="text-button" onClick={() => onEdit(section.step)}>
              {labels.form.edit}<span className="sr-only"> — {section.title}</span>
            </button>
          </div>
          <dl>
            {section.rows.map((row) => (
              <div className="review-row" key={`${section.key}-${row.label}`}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p className="field-help">{r.hiddenNote}</p>
    </div>
  );
}
