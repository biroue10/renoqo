"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { format, plural } from "@/i18n/format";
import type { Dictionary } from "@/i18n/types";
import {
  AVAILABILITY_STATES, CLIENT_TYPES, CONTACT_CHANNELS, CONTACT_LANGUAGES, CONTACT_ROLES,
  COUNTRIES, COUNTRY_DIAL_CODES, COVERAGE_CITIES, DESCRIPTION_MIN_LENGTH, MAX_PORTFOLIO_FILES,
  MAX_UPLOAD_BYTES, NOTIFICATION_FREQUENCIES, PROFESSIONAL_TYPES, PROJECT_TYPES,
  SPOKEN_LANGUAGES, TRADES, WEEK_DAYS, businessFieldsFor,
} from "@/lib/professional-registration/constants";
import type { RegistrationDraft, RegistrationFiles } from "@/lib/professional-registration/types";
import {
  Checkbox, CheckboxGroup, RadioGroup, SearchableCheckboxGroup, SelectField, TextArea, TextField, type Option,
} from "./fields";

export type RegistrationLabels = Pick<
  Dictionary["professionals"],
  "form" | "fields" | "consents" | "review" | "draft" | "submission" | "errors" | "options"
>;

export type StepProps = {
  draft: RegistrationDraft;
  update: <K extends keyof RegistrationDraft>(section: K, patch: Partial<RegistrationDraft[K]>) => void;
  errors: Record<string, string>;
  labels: RegistrationLabels;
  locale: Locale;
  legalLinks: { terms: string; privacy: string };
};

/** Builds `<option>` data from stable ids plus a translated label map. */
export function toOptions(ids: readonly string[], labels: Record<string, string>): Option[] {
  return ids.map((id) => ({ value: id, label: labels[id] ?? id }));
}

const megabytes = (bytes: number) => `${Math.round(bytes / (1024 * 1024))} MB`;

export function ContactStep({ draft, update, errors, labels }: StepProps) {
  const { contact } = draft;
  const f = labels.fields;
  return (
    <>
      <div className="field-row">
        <TextField fieldId="contact.firstName" label={f.firstName} value={contact.firstName}
          onChange={(value) => update("contact", { firstName: value })} error={errors["contact.firstName"]} autoComplete="given-name" />
        <TextField fieldId="contact.lastName" label={f.lastName} value={contact.lastName}
          onChange={(value) => update("contact", { lastName: value })} error={errors["contact.lastName"]} autoComplete="family-name" />
      </div>
      <TextField fieldId="contact.email" label={f.email} type="email" inputMode="email" autoComplete="email"
        help={f.emailHelp} value={contact.email} onChange={(value) => update("contact", { email: value })}
        error={errors["contact.email"]} />
      <TextField fieldId="contact.phone" label={f.phone} type="tel" inputMode="tel" autoComplete="tel"
        help={f.phoneHelp} prefix={COUNTRY_DIAL_CODES.MA} value={contact.phone}
        onChange={(value) => update("contact", { phone: value })} error={errors["contact.phone"]} />
      <Checkbox fieldId="contact.whatsappSameAsPhone" label={f.whatsappSame} checked={contact.whatsappSameAsPhone}
        onChange={(checked) => update("contact", { whatsappSameAsPhone: checked })} />
      {!contact.whatsappSameAsPhone && (
        <TextField fieldId="contact.whatsapp" label={f.whatsapp} type="tel" inputMode="tel" optional
          optionalLabel={labels.form.optional} prefix={COUNTRY_DIAL_CODES.MA} value={contact.whatsapp}
          onChange={(value) => update("contact", { whatsapp: value })} error={errors["contact.whatsapp"]} />
      )}
      <div className="field-row">
        <SelectField fieldId="contact.contactLanguage" label={f.contactLanguage} placeholder={labels.form.selectPlaceholder}
          options={toOptions(CONTACT_LANGUAGES, labels.options.contactLanguages)} value={contact.contactLanguage}
          onChange={(value) => update("contact", { contactLanguage: value as typeof contact.contactLanguage })}
          error={errors["contact.contactLanguage"]} />
        <SelectField fieldId="contact.role" label={f.role} placeholder={labels.form.selectPlaceholder}
          options={toOptions(CONTACT_ROLES, labels.options.roles)} value={contact.role}
          onChange={(value) => update("contact", { role: value as typeof contact.role })} error={errors["contact.role"]} />
      </div>
      {contact.role === "other" && (
        <TextField fieldId="contact.roleOther" label={f.roleOther} value={contact.roleOther}
          onChange={(value) => update("contact", { roleOther: value })} error={errors["contact.roleOther"]} />
      )}
    </>
  );
}

export function BusinessStep({ draft, update, errors, labels }: StepProps) {
  const { business } = draft;
  const f = labels.fields;
  const businessFields = businessFieldsFor(business.country);
  const idLabels = labels.fields as unknown as Record<string, string>;
  return (
    <>
      <SelectField fieldId="business.professionalType" label={f.professionalType} placeholder={labels.form.selectPlaceholder}
        options={toOptions(PROFESSIONAL_TYPES, labels.options.professionalTypes)} value={business.professionalType}
        onChange={(value) => update("business", { professionalType: value as typeof business.professionalType })}
        error={errors["business.professionalType"]} />
      {business.professionalType === "other" && (
        <TextField fieldId="business.professionalTypeOther" label={f.professionalTypeOther} value={business.professionalTypeOther}
          onChange={(value) => update("business", { professionalTypeOther: value })} error={errors["business.professionalTypeOther"]} />
      )}
      <div className="field-row">
        <TextField fieldId="business.tradeName" label={f.tradeName} help={f.tradeNameHelp} value={business.tradeName}
          onChange={(value) => update("business", { tradeName: value })} error={errors["business.tradeName"]} autoComplete="organization" />
        <TextField fieldId="business.legalName" label={f.legalName} optional optionalLabel={labels.form.optional}
          value={business.legalName} onChange={(value) => update("business", { legalName: value })} />
      </div>
      <div className="field-row">
        <SelectField fieldId="business.country" label={f.country} placeholder={labels.form.selectPlaceholder}
          options={toOptions(COUNTRIES, labels.options.countries)} value={business.country}
          onChange={(value) => update("business", { country: value })} error={errors["business.country"]} />
        <SelectField fieldId="business.city" label={f.city} placeholder={labels.form.selectPlaceholder}
          options={toOptions(COVERAGE_CITIES, labels.options.cities)} value={business.city}
          onChange={(value) => update("business", { city: value as typeof business.city })} error={errors["business.city"]} />
      </div>
      <TextField fieldId="business.address" label={f.address} optional optionalLabel={labels.form.optional}
        value={business.address} onChange={(value) => update("business", { address: value })} autoComplete="street-address" />
      <div className="field-row">
        <TextField fieldId="business.foundedYear" label={f.foundedYear} type="number" inputMode="numeric" optional
          optionalLabel={labels.form.optional} value={business.foundedYear}
          onChange={(value) => update("business", { foundedYear: value })} error={errors["business.foundedYear"]} />
        <TextField fieldId="business.teamSize" label={f.teamSize} type="number" inputMode="numeric" optional
          optionalLabel={labels.form.optional} min={0} value={business.teamSize}
          onChange={(value) => update("business", { teamSize: value })} error={errors["business.teamSize"]} />
      </div>
      <div className="field-row">
        <TextField fieldId="business.website" label={f.website} type="url" inputMode="url" optional
          optionalLabel={labels.form.optional} placeholder="https://" value={business.website}
          onChange={(value) => update("business", { website: value })} error={errors["business.website"]} />
        <TextField fieldId="business.socialUrl" label={f.socialUrl} type="url" inputMode="url" optional
          optionalLabel={labels.form.optional} placeholder="https://" value={business.socialUrl}
          onChange={(value) => update("business", { socialUrl: value })} error={errors["business.socialUrl"]} />
      </div>
      {businessFields.length > 0 && (
        <fieldset className="field field-group">
          <legend>{f.businessIdsTitle} <span className="field-optional">({labels.form.optional})</span></legend>
          <p className="field-help">{f.businessIdsHelp}</p>
          <div className="field-row">
            {businessFields.map((id) => (
              <TextField key={id} fieldId={`business.businessIds.${id}`} label={idLabels[id] ?? id}
                value={business.businessIds[id] ?? ""}
                onChange={(value) => update("business", { businessIds: { ...business.businessIds, [id]: value } })} />
            ))}
          </div>
        </fieldset>
      )}
    </>
  );
}

export function ServicesStep({ draft, update, errors, labels, locale }: StepProps) {
  const { services } = draft;
  const f = labels.fields;
  return (
    <>
      <SelectField fieldId="services.primaryTrade" label={f.primaryTrade} placeholder={labels.form.selectPlaceholder}
        options={toOptions(TRADES, labels.options.trades)} value={services.primaryTrade}
        onChange={(value) => update("services", { primaryTrade: value as typeof services.primaryTrade })}
        error={errors["services.primaryTrade"]} />
      {services.primaryTrade === "other" && (
        <TextField fieldId="services.primaryTradeOther" label={f.primaryTradeOther} value={services.primaryTradeOther}
          onChange={(value) => update("services", { primaryTradeOther: value })} error={errors["services.primaryTradeOther"]} />
      )}
      <CheckboxGroup fieldId="services.secondaryTrades" label={f.secondaryTrades} help={f.secondaryTradesHelp}
        optional optionalLabel={labels.form.optional}
        options={toOptions(TRADES.filter((trade) => trade !== services.primaryTrade), labels.options.trades)}
        values={services.secondaryTrades}
        onChange={(values) => update("services", { secondaryTrades: values as typeof services.secondaryTrades })}
        selectedLabel={services.secondaryTrades.length ? plural(labels.form.selectedCount, services.secondaryTrades.length, locale) : undefined} />
      <TextField fieldId="services.specialties" label={f.specialties} help={f.specialtiesHelp} optional
        optionalLabel={labels.form.optional} value={services.specialties}
        onChange={(value) => update("services", { specialties: value })} />
      <CheckboxGroup fieldId="services.projectTypes" label={f.projectTypes}
        options={toOptions(PROJECT_TYPES, labels.options.projectTypes)} values={services.projectTypes}
        onChange={(values) => update("services", { projectTypes: values as typeof services.projectTypes })}
        error={errors["services.projectTypes"]} />
      <RadioGroup fieldId="services.clientTypes" label={f.clientTypes} placeholder=""
        options={toOptions(CLIENT_TYPES, labels.options.clientTypes)} value={services.clientTypes}
        onChange={(value) => update("services", { clientTypes: value as typeof services.clientTypes })}
        error={errors["services.clientTypes"]} />
    </>
  );
}

export function CoverageStep({ draft, update, errors, labels, locale }: StepProps) {
  const { coverage } = draft;
  const f = labels.fields;
  return (
    <>
      <SelectField fieldId="coverage.mainCity" label={f.mainCity} placeholder={labels.form.selectPlaceholder}
        options={toOptions(COVERAGE_CITIES, labels.options.cities)} value={coverage.mainCity}
        onChange={(value) => update("coverage", { mainCity: value as typeof coverage.mainCity })}
        error={errors["coverage.mainCity"]} />
      <Checkbox fieldId="coverage.coversWholeRegion" label={f.coversWholeRegion} help={f.coversWholeRegionHelp}
        checked={coverage.coversWholeRegion} onChange={(checked) => update("coverage", { coversWholeRegion: checked })} />
      {!coverage.coversWholeRegion && (
        <SearchableCheckboxGroup fieldId="coverage.secondaryCities" label={f.secondaryCities} optional
          optionalLabel={labels.form.optional} searchPlaceholder={labels.form.searchPlaceholder}
          noResults={labels.form.noResults}
          options={toOptions(COVERAGE_CITIES.filter((city) => city !== coverage.mainCity), labels.options.cities)}
          values={coverage.secondaryCities}
          onChange={(values) => update("coverage", { secondaryCities: values as typeof coverage.secondaryCities })}
          selectedLabel={coverage.secondaryCities.length ? plural(labels.form.selectedCount, coverage.secondaryCities.length, locale) : undefined} />
      )}
      <TextField fieldId="coverage.neighbourhoods" label={f.neighbourhoods} optional optionalLabel={labels.form.optional}
        value={coverage.neighbourhoods} onChange={(value) => update("coverage", { neighbourhoods: value })} />
      <div className="field-row">
        <TextField fieldId="coverage.travelRadiusKm" label={f.travelRadius} type="number" inputMode="numeric" optional
          optionalLabel={labels.form.optional} min={0} value={coverage.travelRadiusKm}
          onChange={(value) => update("coverage", { travelRadiusKm: value })} error={errors["coverage.travelRadiusKm"]} />
        <TextField fieldId="coverage.leadTime" label={f.leadTime} optional optionalLabel={labels.form.optional}
          value={coverage.leadTime} onChange={(value) => update("coverage", { leadTime: value })} />
      </div>
      <Checkbox fieldId="coverage.worksInOtherRegions" label={f.worksInOtherRegions} checked={coverage.worksInOtherRegions}
        onChange={(checked) => update("coverage", { worksInOtherRegions: checked })} />
      <SelectField fieldId="coverage.availability" label={f.availability} placeholder={labels.form.selectPlaceholder}
        options={toOptions(AVAILABILITY_STATES, labels.options.availability)} value={coverage.availability}
        onChange={(value) => update("coverage", { availability: value as typeof coverage.availability })}
        error={errors["coverage.availability"]} />
      <Checkbox fieldId="coverage.acceptsUrgent" label={f.acceptsUrgent} checked={coverage.acceptsUrgent}
        onChange={(checked) => update("coverage", { acceptsUrgent: checked })} />
      <CheckboxGroup fieldId="coverage.availableDays" label={f.availableDays} optional optionalLabel={labels.form.optional}
        options={toOptions(WEEK_DAYS, labels.options.weekDays)} values={coverage.availableDays}
        onChange={(values) => update("coverage", { availableDays: values as typeof coverage.availableDays })} />
      <div className="field-row">
        <TextField fieldId="coverage.minBudget" label={f.minBudget} type="number" inputMode="numeric" optional
          optionalLabel={labels.form.optional} min={0} value={coverage.minBudget}
          onChange={(value) => update("coverage", { minBudget: value })} error={errors["coverage.minBudget"]} />
        <TextField fieldId="coverage.maxBudget" label={f.maxBudget} type="number" inputMode="numeric" optional
          optionalLabel={labels.form.optional} min={0} value={coverage.maxBudget}
          onChange={(value) => update("coverage", { maxBudget: value })} error={errors["coverage.maxBudget"]} />
      </div>
    </>
  );
}

type PresentationStepProps = StepProps & {
  files: RegistrationFiles;
  onPortfolioChange: (files: FileList | null) => void;
  onPortfolioRemove: (index: number) => void;
  onSingleFile: (key: "logo" | "coverImage", file: File | null) => void;
  fileErrors: string[];
};

export function PresentationStep({
  draft, update, errors, labels, files, onPortfolioChange, onPortfolioRemove, onSingleFile, fileErrors,
}: PresentationStepProps) {
  const { presentation } = draft;
  const f = labels.fields;
  const length = presentation.description.trim().length;
  return (
    <>
      <TextArea fieldId="presentation.description" label={f.description} help={f.descriptionHelp}
        value={presentation.description} onChange={(value) => update("presentation", { description: value })}
        error={errors["presentation.description"]}
        counter={format(labels.form.characterCount, { current: length, min: DESCRIPTION_MIN_LENGTH })} />
      <div className="field-row">
        <TextField fieldId="presentation.yearsOfExperience" label={f.yearsOfExperience} type="number" inputMode="numeric"
          optional optionalLabel={labels.form.optional} min={0} value={presentation.yearsOfExperience}
          onChange={(value) => update("presentation", { yearsOfExperience: value })}
          error={errors["presentation.yearsOfExperience"]} />
        <TextField fieldId="presentation.certifications" label={f.certifications} optional optionalLabel={labels.form.optional}
          value={presentation.certifications} onChange={(value) => update("presentation", { certifications: value })} />
      </div>
      <CheckboxGroup fieldId="presentation.spokenLanguages" label={f.spokenLanguages}
        options={toOptions(SPOKEN_LANGUAGES, labels.options.spokenLanguages)} values={presentation.spokenLanguages}
        onChange={(values) => update("presentation", { spokenLanguages: values as typeof presentation.spokenLanguages })}
        error={errors["presentation.spokenLanguages"]} />
      <Checkbox fieldId="presentation.hasInsurance" label={f.hasInsurance} checked={presentation.hasInsurance}
        onChange={(checked) => update("presentation", { hasInsurance: checked })} />
      {presentation.hasInsurance && (
        <TextField fieldId="presentation.insuranceDetails" label={f.insuranceDetails} optional
          optionalLabel={labels.form.optional} value={presentation.insuranceDetails}
          onChange={(value) => update("presentation", { insuranceDetails: value })} />
      )}
      <Checkbox fieldId="presentation.offersWarranty" label={f.offersWarranty} checked={presentation.offersWarranty}
        onChange={(checked) => update("presentation", { offersWarranty: checked })} />
      {presentation.offersWarranty && (
        <TextField fieldId="presentation.warrantyDetails" label={f.warrantyDetails} optional
          optionalLabel={labels.form.optional} value={presentation.warrantyDetails}
          onChange={(value) => update("presentation", { warrantyDetails: value })} />
      )}
      <TextArea fieldId="presentation.references" label={f.references} optional optionalLabel={labels.form.optional}
        rows={3} value={presentation.references} onChange={(value) => update("presentation", { references: value })} />

      <fieldset className="field field-group">
        <legend>{f.portfolio} <span className="field-optional">({labels.form.optional})</span></legend>
        <p className="field-help">{format(f.portfolioHelp, { max: MAX_PORTFOLIO_FILES, size: megabytes(MAX_UPLOAD_BYTES) })}</p>
        <input type="file" id="presentation.portfolio" multiple accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={(event) => onPortfolioChange(event.target.files)} />
        {fileErrors.length > 0 && (
          <ul className="field-error-list">
            {fileErrors.map((message) => <li key={message}><span aria-hidden="true">⚠</span> {message}</li>)}
          </ul>
        )}
        {files.portfolio.length === 0
          ? <p className="field-help">{f.portfolioEmpty}</p>
          : (
            <ul className="portfolio-list">
              {files.portfolio.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <FilePreview file={file} altTemplate={f.portfolioPreviewAlt} documentLabel={f.portfolioDocument} />
                  <span className="portfolio-name">{file.name}</span>
                  <button type="button" className="text-button" onClick={() => onPortfolioRemove(index)}>
                    {f.portfolioRemove}
                  </button>
                </li>
              ))}
            </ul>
          )}
        <div className="field-row">
          <div className="field">
            <label htmlFor="presentation.logo">{f.logo} <span className="field-optional">({labels.form.optional})</span></label>
            <input type="file" id="presentation.logo" accept=".jpg,.jpeg,.png,.webp"
              onChange={(event) => onSingleFile("logo", event.target.files?.[0] ?? null)} />
          </div>
          <div className="field">
            <label htmlFor="presentation.coverImage">{f.coverImage} <span className="field-optional">({labels.form.optional})</span></label>
            <input type="file" id="presentation.coverImage" accept=".jpg,.jpeg,.png,.webp"
              onChange={(event) => onSingleFile("coverImage", event.target.files?.[0] ?? null)} />
          </div>
        </div>
        <p className="field-help">{f.filesPrivacyNote}</p>
        <p className="field-help">{f.documentsOptionalNote}</p>
      </fieldset>
    </>
  );
}

/**
 * Object URLs are created only for the images actually selected, and revoked
 * on unmount. PDFs are labelled rather than rendered, so nothing uploaded is
 * ever executed or embedded.
 */
function FilePreview({ file, altTemplate, documentLabel }: { file: File; altTemplate: string; documentLabel: string }) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  if (!file.type.startsWith("image/")) return <span className="portfolio-doc">{documentLabel}</span>;
  // eslint-disable-next-line @next/next/no-img-element -- object URL of a local file; the optimiser cannot process it
  return url ? <img className="portfolio-thumb" src={url} alt={format(altTemplate, { name: file.name })} /> : <span className="portfolio-thumb" />;
}

export function PreferencesStep({ draft, update, errors, labels, legalLinks }: StepProps) {
  const { preferences } = draft;
  const f = labels.fields;
  const c = labels.consents;
  return (
    <>
      <CheckboxGroup fieldId="preferences.channels" label={f.channels}
        options={toOptions(CONTACT_CHANNELS, labels.options.channels)} values={preferences.channels}
        onChange={(values) => update("preferences", { channels: values as typeof preferences.channels })}
        error={errors["preferences.channels"]} />
      <CheckboxGroup fieldId="preferences.interestedProjectTypes" label={f.interestedProjectTypes} optional
        optionalLabel={labels.form.optional} options={toOptions(PROJECT_TYPES, labels.options.projectTypes)}
        values={preferences.interestedProjectTypes}
        onChange={(values) => update("preferences", { interestedProjectTypes: values as typeof preferences.interestedProjectTypes })} />
      <div className="field-row">
        <TextField fieldId="preferences.minimumProjectBudget" label={f.minimumProjectBudget} type="number"
          inputMode="numeric" optional optionalLabel={labels.form.optional} min={0}
          value={preferences.minimumProjectBudget}
          onChange={(value) => update("preferences", { minimumProjectBudget: value })}
          error={errors["preferences.minimumProjectBudget"]} />
        <SelectField fieldId="preferences.notificationFrequency" label={f.notificationFrequency}
          placeholder={labels.form.selectPlaceholder}
          options={toOptions(NOTIFICATION_FREQUENCIES, labels.options.notificationFrequencies)}
          value={preferences.notificationFrequency}
          onChange={(value) => update("preferences", { notificationFrequency: value as typeof preferences.notificationFrequency })}
          error={errors["preferences.notificationFrequency"]} />
      </div>
      <SearchableCheckboxGroup fieldId="preferences.preferredAreas" label={f.preferredAreas} optional
        optionalLabel={labels.form.optional} searchPlaceholder={labels.form.searchPlaceholder}
        noResults={labels.form.noResults} options={toOptions(COVERAGE_CITIES, labels.options.cities)}
        values={preferences.preferredAreas}
        onChange={(values) => update("preferences", { preferredAreas: values as typeof preferences.preferredAreas })} />
      <Checkbox fieldId="preferences.pauseRequests" label={f.pauseRequests} checked={preferences.pauseRequests}
        onChange={(checked) => update("preferences", { pauseRequests: checked })} />

      <fieldset className="field field-group consents">
        <legend>{c.required}</legend>
        <Checkbox fieldId="preferences.acceptProfessionalTerms" checked={preferences.acceptProfessionalTerms}
          onChange={(checked) => update("preferences", { acceptProfessionalTerms: checked })}
          error={errors["preferences.acceptProfessionalTerms"]}
          label={<>{c.terms} <a href={legalLinks.terms}>{c.termsLink}</a></>} />
        <Checkbox fieldId="preferences.acceptPrivacyPolicy" checked={preferences.acceptPrivacyPolicy}
          onChange={(checked) => update("preferences", { acceptPrivacyPolicy: checked })}
          error={errors["preferences.acceptPrivacyPolicy"]}
          label={<>{c.privacy} <a href={legalLinks.privacy}>{c.privacyLink}</a></>} />
        <Checkbox fieldId="preferences.confirmAccuracy" label={c.accuracy} checked={preferences.confirmAccuracy}
          onChange={(checked) => update("preferences", { confirmAccuracy: checked })}
          error={errors["preferences.confirmAccuracy"]} />
        <Checkbox fieldId="preferences.allowContactAboutApplication" label={c.contact}
          checked={preferences.allowContactAboutApplication}
          onChange={(checked) => update("preferences", { allowContactAboutApplication: checked })}
          error={errors["preferences.allowContactAboutApplication"]} />
      </fieldset>
      <fieldset className="field field-group consents">
        <legend>{c.optional}</legend>
        <Checkbox fieldId="preferences.acceptMarketing" label={c.marketing} checked={preferences.acceptMarketing}
          onChange={(checked) => update("preferences", { acceptMarketing: checked })} />
      </fieldset>
    </>
  );
}
