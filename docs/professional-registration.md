# Professional registration

The "For professionals" page (`/pour-les-professionnels/` and
`/en/pour-les-professionnels/`) presents the Renoqo offer to tradespeople and
companies, and collects a **registration request**.

It is a request, not an account: no password is asked for, because no
authentication system exists yet, and no profile becomes visible without review.

## Page structure

| Section | Rendering |
| --- | --- |
| Hero — title, subtitle, two CTAs, trust line | server |
| Benefits — 8 cards | server |
| How it works — 4 steps + a disclaimer that approval is not guaranteed | server |
| Registration form — 6 steps + review | **client** |
| Quality standards — 6 expectations | server |
| Verification — how review works, planned levels | server |
| FAQ — 9 questions (reuses `FAQSection`) | client (shared) |

Only the form and the FAQ accordion are client components.

## Form steps

| # | Step | Required |
| --- | --- | --- |
| 1 | Profile owner | first name, last name, email, phone, contact language, role |
| 2 | Business | professional type, trading name, country, city |
| 3 | Trades and services | main trade, ≥1 project type, client type |
| 4 | Areas and availability | main city, availability |
| 5 | Presentation and portfolio | description (≥120 chars), ≥1 spoken language |
| 6 | Preferences and consents | ≥1 channel, notification frequency, 4 consents |
| — | Review | every section, each with an **Edit** button |

Conditional fields appear only when relevant: `roleOther`, `professionalTypeOther`
and `primaryTradeOther` when "other" is selected; the WhatsApp number when it
differs from the phone; insurance and warranty details when the boxes are ticked;
secondary cities when "whole region" is not selected.

Country-conditional fields come from `COUNTRY_BUSINESS_FIELDS`. Morocco declares
`ice`, `rc`, `taxId`, `cnss` — **all optional**, so an administrative gap never
blocks a legitimate applicant. Adding a market means adding one entry plus its
labels, not editing the form.

## Trades

22 trades, each with a stable id independent of any translation:

`general_renovation`, `construction_structural`, `masonry`, `painting`,
`plumbing`, `electrical`, `tiling`, `carpentry_wood`, `aluminium_pvc`,
`plaster_ceilings`, `flooring`, `waterproofing_roofing`, `hvac`, `solar_energy`,
`kitchen_installation`, `bathroom_renovation`, `interior_design`, `architecture`,
`landscaping`, `post_construction_cleaning`, `moving`, `other`.

One main trade is required; any number of secondary trades may be added. The main
trade is removed from the secondary list to avoid selecting it twice.

## Validation

`src/lib/professional-registration/schema.ts` returns **error codes**, never
sentences, so both languages share one rule set and a submission is accepted or
rejected identically whatever the applicant is reading. The UI resolves codes
against `professionals.errors`.

Codes: `required`, `invalid_email`, `invalid_phone`, `invalid_url`,
`description_too_short`, `description_too_long`, `invalid_year`,
`invalid_number`, `budget_range`, `select_at_least_one`, `consent_required`,
`file_type`, `file_size`, `file_count`.

`normalizeDraft` trims free text, drops blank business identifiers, and copies
the phone into WhatsApp when the applicant said they are the same.

## Draft saving

Key: `renoqo_professional_registration_draft`, autosaved ~800 ms after a change.

Stored: the non-sensitive business answers.

**Never stored:** files, administrative identifiers (ICE, RC, tax id, CNSS),
tokens, or credentials. `localStorage` is readable by any script on the origin,
so regulated identifiers and uploads are stripped before writing — see
`stripSensitive`.

Consents are never restored from a draft: they must be given deliberately each
time. The draft is cleared only after the server confirms the application, or
when the applicant explicitly clears it (with a confirmation prompt).

## Files

Accepted: JPEG, PNG, WebP for images; PDF for documents. Max 5 MB per file, 8
portfolio files, plus an optional logo and cover image.

The browser checks the declared MIME type, the extension and the size. This is a
convenience only — **the server must re-validate by sniffing content**. Object
URLs are created only for images actually selected and revoked on unmount; PDFs
are labelled rather than embedded, so nothing uploaded is ever executed.

No identity document is requested: that will only change once private, secure
storage genuinely exists.

## Internationalisation

Everything lives under `professionals` in `src/i18n/dictionaries/{fr,en}.ts`:
copy, field labels, options, errors, review, draft and submission messages.

Labels that carry runtime values are **placeholder strings**, not functions
(`"Étape {current} sur {total}"`), because functions cannot cross the
server/client boundary. `src/i18n/format.ts` provides `format()` and a
locale-aware `plural()`.

`tests/professional-registration-i18n.test.ts` asserts every domain id has a
label in both languages, and that no id was left behind after a rename.

## Privacy

- Administrative identifiers and files are shown in the review as
  "provided — not shown", never echoed back.
- Nothing submitted appears in page metadata or JSON-LD.
- Analytics events (`src/lib/professional-registration/analytics.ts`) carry only
  a step number, an error code or a boolean. No vendor is wired up yet; events
  are dropped unless a collector is installed.

## Abuse protection

Present in the client: a honeypot field, and a `turnstileToken` slot in the
payload ready for Cloudflare Turnstile.

**Frontend protection is not security.** Rate limiting, duplicate detection,
file scanning, consent recording and Turnstile verification must all happen
server-side. See `docs/professional-registration-api.md`.

## Submission

`submitRegistration` posts JSON, or multipart when files are attached.

If `NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_ENDPOINT` is unset, the form states
that the service is unavailable, keeps the draft, and offers a retry. It never
shows a success screen for a request that went nowhere, and never invents an
application number: the confirmation id always comes from the server.

A demo mode exists for local work only — it requires
`NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_DEMO=true` **and** a non-production
build, and its success screen is explicitly labelled as a simulation.

## Accessibility

`fieldset`/`legend` for every group, a real `<label>` per control,
`aria-describedby` linking help and error text, `aria-invalid` on invalid
controls, and an error summary with links to each field. Submitting an
incomplete step moves focus to the first problem; changing step moves focus to
the step heading and announces it via a live region. The progress bar exposes
`aria-valuenow`/`aria-valuetext`. Errors always pair colour with an icon and
text. The whole flow works with the keyboard alone.

## Still requiring a backend

- The submission endpoint (Worker + D1 + private R2).
- Email and phone verification.
- Actual profile creation, moderation and the verification levels.
- Duplicate detection and server-side rate limiting.
- Turnstile verification.
- Applicant confirmation emails.
