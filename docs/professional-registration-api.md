# Professional registration — API contract

The Renoqo site is a static export, so there is no Next.js server route. The
browser posts the registration request directly to an endpoint configured at
build time:

```
NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_ENDPOINT=https://api.renoqo.com/v1/professional-applications
```

**This endpoint does not exist yet.** Until it is deployed, the form refuses to
submit and tells the applicant that the service is unavailable. It never reports
a request as recorded when nothing was sent.

Client implementation: `src/lib/professional-registration/submit.ts`.

## Request

`POST` to the configured URL.

| Condition | Content type | Body |
| --- | --- | --- |
| No files attached | `application/json` | the payload below |
| Any file attached | `multipart/form-data` | `application` part (JSON string) + file parts |

Multipart part names: `application`, `portfolio` (repeated), `logo`, `coverImage`.
The client deliberately omits the `Content-Type` header for multipart so the
browser sets the boundary.

### Payload

```ts
type RegistrationPayload = {
  contact: {
    firstName: string; lastName: string; email: string;
    phoneCountry: string; phone: string;
    whatsappSameAsPhone: boolean; whatsapp: string;
    contactLanguage: "fr" | "en" | "ar" | "";
    role: "owner" | "manager" | "sales_manager" | "independent_craftsman" | "other" | "";
    roleOther: string;
  };
  business: {
    professionalType: "independent_craftsman" | "auto_entrepreneur" | "sole_proprietorship"
      | "company" | "architecture_design_firm" | "cooperative" | "other" | "";
    professionalTypeOther: string;
    tradeName: string; legalName: string;
    country: string; city: string; address: string;
    foundedYear: string; teamSize: string;
    website: string; socialUrl: string;
    /** Country-specific, all optional. For MA: ice, rc, taxId, cnss. */
    businessIds: Record<string, string>;
  };
  services: {
    primaryTrade: string;        // stable id, e.g. "plumbing"
    secondaryTrades: string[];
    primaryTradeOther: string;
    specialties: string;
    projectTypes: string[];
    clientTypes: "individuals" | "businesses" | "both" | "";
  };
  coverage: {
    mainCity: string; secondaryCities: string[]; coversWholeRegion: boolean;
    neighbourhoods: string; travelRadiusKm: string; worksInOtherRegions: boolean;
    availability: "available_now" | "available_soon" | "limited" | "unavailable" | "";
    acceptsUrgent: boolean; availableDays: string[]; leadTime: string;
    minBudget: string; maxBudget: string;
  };
  presentation: {
    description: string; yearsOfExperience: string; spokenLanguages: string[];
    certifications: string; hasInsurance: boolean; insuranceDetails: string;
    offersWarranty: boolean; warrantyDetails: string; references: string;
  };
  preferences: {
    channels: ("email" | "whatsapp" | "phone")[];
    interestedProjectTypes: string[]; minimumProjectBudget: string;
    preferredAreas: string[];
    notificationFrequency: "immediate" | "daily" | "weekly" | "";
    pauseRequests: boolean;
    acceptProfessionalTerms: boolean; acceptPrivacyPolicy: boolean;
    confirmAccuracy: boolean; allowContactAboutApplication: boolean;
    acceptMarketing: boolean;
  };
  /** Metadata only — must never change how a value is interpreted. */
  locale: "fr" | "en";
  submittedAt: string;   // ISO 8601
  /** Honeypot. A non-empty value means a bot filled a hidden field. */
  botField: string;
  turnstileToken?: string;
};
```

All enumerated values are **stable internal ids**, identical in every language.
Free-text fields are trimmed client-side but must be treated as untrusted.

## Response

### Success — `201 Created`

```json
{
  "applicationId": "REQ-2026-0042",
  "status": "submitted",
  "reviewEtaLabel": "Sous 5 jours ouvrés"
}
```

- `applicationId` is **required**. The client treats a 2xx without a usable id
  as a server error, because a confirmation number must come from the server —
  it is never generated in the browser.
- `reviewEtaLabel` is optional and administrable. When absent, the UI shows a
  neutral note instead of promising a timeframe.

### Errors

| Status | Client code | Shown to the applicant |
| --- | --- | --- |
| 400 / 422 | `validation_error` | Fix the highlighted fields |
| 409 | `duplicate` | An application already exists for this email or phone |
| 413 | `payload_too_large` | Files are too large |
| 429 | `rate_limited` | Too many attempts, wait a few minutes |
| 5xx | `server_error` | Something went wrong on our side |
| network failure | `network_error` | Connection failed |
| endpoint unset | `endpoint_not_configured` | Service temporarily unavailable |

A `422` may include field-level detail, keyed by `section.field`:

```json
{ "fieldErrors": { "contact.email": "already_registered" } }
```

In every failure case the local draft is preserved so the applicant can retry
without retyping.

## Application statuses

```
draft → submitted → under_review → { approved | rejected | more_information_required }
                                                                    ↓
                                                              under_review
approved → suspended (moderation)
```

## Required server-side validation

The client checks are a convenience for the applicant and can be bypassed
trivially. The server must independently enforce:

1. **Every rule in `src/lib/professional-registration/schema.ts`** — required
   fields, email and phone shape, description length, budget ordering, and the
   four mandatory consents.
2. **Enumerated values** — reject any id not in the published constant lists
   rather than storing free text.
3. **Field lengths** — cap every string; the client only bounds the description.
4. **Uploads** — verify the real content type by sniffing magic bytes, not the
   declared MIME type or the extension. Allowed: JPEG, PNG, WebP, PDF.
   Enforce the size cap (5 MB) and count cap (8) again. Re-encode images and
   strip EXIF. Store outside the web root with generated names; never serve
   user uploads from the app origin.
5. **Consents** — persist the exact text version accepted, with a timestamp.
6. **Honeypot** — treat a non-empty `botField` as spam; drop it silently.
7. **Turnstile** — verify the token server-side once enabled.
8. **Rate limiting** — per IP and per email, plus duplicate detection.
9. **Email and phone verification** — before a profile becomes publicly visible.

## Planned Cloudflare architecture

Not implemented in this change; documented so the contract stays stable.

| Concern | Component |
| --- | --- |
| API | Worker handling `POST /v1/professional-applications` |
| Applications | D1 table `professional_applications` |
| Files | **Private** R2 bucket, no public access, presigned reads for staff only |
| Anti-bot | Turnstile, verified in the Worker |
| Email | Transactional provider for the applicant confirmation and staff alert |
| Audit | Append-only log of every status change with the acting account |

## Security notes

- Uploads are never executed, embedded, or served from the app origin.
- Administrative identifiers (ICE, RC, tax id, CNSS) and files are **never**
  written to `localStorage`, echoed in the review screen, exposed in metadata,
  or shown on a public profile.
- No file path or document content is ever logged to the console.
- Analytics events carry structural data only — never names, contact details,
  free text, identifiers, or files.
