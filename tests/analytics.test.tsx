import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/guides" }));
vi.mock("next/script", () => ({ default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <script {...props}>{children}</script> }));

const ENV = "NEXT_PUBLIC_GA_ID";

async function analytics(id = "G-TEST") {
  vi.stubEnv(ENV, id);
  return import("@/lib/analytics");
}

describe("consent-aware analytics", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.resetModules(); });

  it("does nothing without an id, consent, or gtag", async () => {
    const noId = await analytics("");
    const gtag = vi.fn();
    window.gtag = gtag;
    noId.setAnalyticsConsent("granted");
    noId.trackEvent("calculator_started", { calculator_type: "quick_estimate" });
    expect(gtag).not.toHaveBeenCalledWith("event", expect.anything(), expect.anything());

    const withId = await analytics();
    localStorage.clear();
    withId.trackEvent("calculator_started", { calculator_type: "quick_estimate" });
    expect(gtag).not.toHaveBeenCalledWith("event", expect.anything(), expect.anything());
    delete window.gtag;
    expect(() => withId.trackPageView("/guides")).not.toThrow();
  });

  it("keeps only the event allowlist and excludes personal fields", async () => {
    const mod = await analytics();
    const gtag = vi.fn();
    window.gtag = gtag;
    mod.setAnalyticsConsent("granted");
    mod.trackEvent("calculator_completed", { calculator_type: "quick_estimate", project_type: "renovation", email: "person@example.com", address: "private" });
    expect(gtag).toHaveBeenLastCalledWith("event", "calculator_completed", { calculator_type: "quick_estimate", project_type: "renovation" });
  });

  it("loads GA only after consent and supports withdrawal", async () => {
    vi.stubEnv(ENV, "G-TEST");
    const { GoogleAnalytics } = await import("@/components/analytics/GoogleAnalytics");
    const labels = { title: "Audience", message: "Optional analytics", accept: "Accept", decline: "Decline", settings: "Settings" };
    const { container } = render(<GoogleAnalytics locale="en" labels={labels} />);
    expect(container.querySelector('script[src*="googletagmanager"]')).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(container.querySelector('script[src*="googletagmanager"]')).not.toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("button", { name: "Decline" }));
    expect(localStorage.getItem("renoqo_analytics_consent")).toBe("denied");
    await waitFor(() => expect(container.querySelector('script[src*="googletagmanager"]')).toBeNull());
  });
});
