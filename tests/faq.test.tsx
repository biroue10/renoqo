import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQSection } from "@/components/home/FAQSection";

describe("FAQSection", () => {
  it("exposes accordion state and opens a question from its button", () => {
    render(<FAQSection />);
    const first = screen.getByRole("button", { name: /estimation Renoqo est-elle gratuite/i });
    const second = screen.getByRole("button", { name: /prix affichés sont-ils définitifs/i });
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(second.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByText(/fourchettes indicatives/i)).toBeTruthy();
  });
});
