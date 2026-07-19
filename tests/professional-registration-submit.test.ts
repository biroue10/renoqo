import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEmptyDraft, createEmptyFiles } from "@/lib/professional-registration/defaults";
import type { RegistrationPayload } from "@/lib/professional-registration/types";

const ENDPOINT_VAR = "NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_ENDPOINT";

const payload = (): RegistrationPayload => ({
  ...createEmptyDraft(),
  locale: "fr",
  submittedAt: "2026-07-19T10:00:00.000Z",
  botField: "",
});

/** The endpoint is read at module load, so each case re-imports with its own env. */
async function loadSubmit(endpoint?: string) {
  vi.resetModules();
  if (endpoint === undefined) vi.stubEnv(ENDPOINT_VAR, "");
  else vi.stubEnv(ENDPOINT_VAR, endpoint);
  return import("@/lib/professional-registration/submit");
}

describe("submitRegistration", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_DEMO", ""));
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("reports the service as unavailable when no endpoint is configured", async () => {
    const { submitRegistration, isEndpointConfigured } = await loadSubmit();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    expect(isEndpointConfigured()).toBe(false);
    const result = await submitRegistration(payload(), createEmptyFiles());

    // The decisive assertion: no endpoint must never look like a success.
    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ code: "endpoint_not_configured" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns the application id issued by the server", async () => {
    const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(
      JSON.stringify({ applicationId: "REQ-2026-0042", status: "submitted" }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    )));

    const result = await submitRegistration(payload(), createEmptyFiles());
    expect(result).toEqual({ ok: true, applicationId: "REQ-2026-0042", status: "submitted", reviewEtaLabel: undefined });
  });

  it("treats a 2xx without an application id as a server error", async () => {
    const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ status: "submitted" }), { status: 200 })));

    const result = await submitRegistration(payload(), createEmptyFiles());
    expect(result).toEqual({ ok: false, code: "server_error" });
  });

  it("maps HTTP failures to specific codes", async () => {
    const cases: [number, string][] = [
      [409, "duplicate"], [413, "payload_too_large"], [422, "validation_error"],
      [429, "rate_limited"], [500, "server_error"],
    ];
    for (const [status, code] of cases) {
      const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
      vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status })));
      const result = await submitRegistration(payload(), createEmptyFiles());
      expect(result).toMatchObject({ ok: false, code });
    }
  });

  it("surfaces server-side field errors", async () => {
    const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(
      JSON.stringify({ fieldErrors: { "contact.email": "already_registered" } }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    )));

    const result = await submitRegistration(payload(), createEmptyFiles());
    expect(result).toMatchObject({ ok: false, code: "validation_error", fieldErrors: { "contact.email": "already_registered" } });
  });

  it("reports a network failure rather than throwing", async () => {
    const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("offline"); }));

    const result = await submitRegistration(payload(), createEmptyFiles());
    expect(result).toEqual({ ok: false, code: "network_error" });
  });

  it("sends JSON when there are no files and multipart when there are", async () => {
    const { submitRegistration } = await loadSubmit("https://api.renoqo.com/pro");
    const fetchSpy = vi.fn(async (_url: string, init: RequestInit) => {
      void _url; void init;
      return new Response(JSON.stringify({ applicationId: "REQ-1" }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchSpy);

    await submitRegistration(payload(), createEmptyFiles());
    expect(fetchSpy.mock.calls[0][1].headers).toMatchObject({ "Content-Type": "application/json" });
    expect(typeof fetchSpy.mock.calls[0][1].body).toBe("string");

    const files = { ...createEmptyFiles(), portfolio: [new File(["x"], "chantier.jpg", { type: "image/jpeg" })] };
    await submitRegistration(payload(), files);
    const body = fetchSpy.mock.calls[1][1].body as FormData;
    expect(body).toBeInstanceOf(FormData);
    // The boundary must be set by the browser, so no explicit Content-Type.
    expect(fetchSpy.mock.calls[1][1].headers).toEqual({});
    expect(body.get("portfolio")).toBeInstanceOf(File);
  });

  it("keeps demo mode out of production builds", async () => {
    vi.stubEnv("NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_DEMO", "true");
    vi.stubEnv("NODE_ENV", "production");
    const { DEMO_MODE, submitRegistration } = await loadSubmit();
    vi.stubGlobal("fetch", vi.fn());

    expect(DEMO_MODE).toBe(false);
    // Even with the demo flag on, a production build without an endpoint fails loudly.
    expect(await submitRegistration(payload(), createEmptyFiles())).toEqual({ ok: false, code: "endpoint_not_configured" });
  });

  it("labels a development demo submission as a simulation", async () => {
    vi.stubEnv("NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_DEMO", "true");
    vi.stubEnv("NODE_ENV", "development");
    const { submitRegistration } = await loadSubmit();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await submitRegistration(payload(), createEmptyFiles());
    expect(result).toMatchObject({ ok: true, demo: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
