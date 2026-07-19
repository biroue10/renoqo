import { APPLICATION_STATUSES, type ApplicationStatus } from "./constants";
import type { RegistrationFiles, RegistrationPayload, SubmissionResult } from "./types";

/**
 * Submission layer.
 *
 * Renoqo is a static export, so there is no server route: the browser posts
 * directly to a configured endpoint (a Cloudflare Worker, in the planned
 * architecture). See `docs/professional-registration-api.md` for the contract.
 *
 * The one rule this module must never break: a submission is reported as
 * successful only when a real endpoint returned a real application id.
 */

export const REGISTRATION_ENDPOINT = process.env.NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_ENDPOINT ?? "";

/**
 * Demo mode short-circuits the network call. It requires an explicit opt-in
 * *and* a non-production build, so a missing endpoint in production can never
 * silently look like a success.
 */
export const DEMO_MODE =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_DEMO === "true";

export function isEndpointConfigured() {
  return REGISTRATION_ENDPOINT.trim().length > 0;
}

const isApplicationStatus = (value: unknown): value is ApplicationStatus =>
  typeof value === "string" && (APPLICATION_STATUSES as readonly string[]).includes(value);

function hasFiles(files: RegistrationFiles) {
  return files.portfolio.length > 0 || files.logo !== null || files.coverImage !== null;
}

/** Multipart when there are uploads, plain JSON otherwise. */
function buildBody(payload: RegistrationPayload, files: RegistrationFiles): { body: BodyInit; headers: HeadersInit } {
  if (!hasFiles(files)) {
    return { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } };
  }
  const form = new FormData();
  form.append("application", JSON.stringify(payload));
  for (const file of files.portfolio) form.append("portfolio", file, file.name);
  if (files.logo) form.append("logo", files.logo, files.logo.name);
  if (files.coverImage) form.append("coverImage", files.coverImage, files.coverImage.name);
  // Content-Type is intentionally omitted: the browser sets the multipart boundary.
  return { body: form, headers: {} };
}

function failureForStatus(status: number): SubmissionResult {
  if (status === 409) return { ok: false, code: "duplicate" };
  if (status === 413) return { ok: false, code: "payload_too_large" };
  if (status === 422 || status === 400) return { ok: false, code: "validation_error" };
  if (status === 429) return { ok: false, code: "rate_limited" };
  return { ok: false, code: "server_error" };
}

export async function submitRegistration(
  payload: RegistrationPayload,
  files: RegistrationFiles,
): Promise<SubmissionResult> {
  if (DEMO_MODE) {
    // Flagged as demo so the UI can label it unmistakably as a local simulation.
    return { ok: true, applicationId: "DEMO-LOCAL", status: "submitted", demo: true };
  }

  if (!isEndpointConfigured()) {
    // No endpoint means the request went nowhere. Say so rather than pretend.
    return { ok: false, code: "endpoint_not_configured" };
  }

  let response: Response;
  try {
    const { body, headers } = buildBody(payload, files);
    response = await fetch(REGISTRATION_ENDPOINT, { method: "POST", body, headers });
  } catch {
    return { ok: false, code: "network_error" };
  }

  if (!response.ok) {
    const failure = failureForStatus(response.status);
    if (failure.ok === false && failure.code === "validation_error") {
      try {
        const data = (await response.json()) as { fieldErrors?: Record<string, string> };
        if (data?.fieldErrors) return { ...failure, fieldErrors: data.fieldErrors };
      } catch {
        // A non-JSON error body is still a validation failure.
      }
    }
    return failure;
  }

  let data: { applicationId?: unknown; status?: unknown; reviewEtaLabel?: unknown };
  try {
    data = await response.json();
  } catch {
    return { ok: false, code: "server_error" };
  }

  // A 2xx without a usable application id is not a confirmed registration.
  const applicationId = typeof data.applicationId === "string" ? data.applicationId.trim() : "";
  if (!applicationId) return { ok: false, code: "server_error" };

  return {
    ok: true,
    applicationId,
    status: isApplicationStatus(data.status) ? data.status : "submitted",
    reviewEtaLabel: typeof data.reviewEtaLabel === "string" ? data.reviewEtaLabel : undefined,
  };
}
