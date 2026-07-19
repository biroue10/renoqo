import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQSection } from "@/components/home/FAQSection";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import type { Dictionary } from "@/i18n/types";

const labelsFor = (d: Dictionary) => ({ eyebrow: d.faq.eyebrow, title: d.faq.title, items: d.faq.items });

describe("FAQSection", () => {
  it("exposes accordion state and opens a question from its button", () => {
    render(<FAQSection labels={labelsFor(fr)} />);
    const first = screen.getByRole("button", { name: /estimation Renoqo est-elle gratuite/i });
    const second = screen.getByRole("button", { name: /prix affichés sont-ils définitifs/i });
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(second.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByText(/fourchettes indicatives/i)).toBeTruthy();
  });

  it("renders English questions when given the English dictionary", () => {
    render(<FAQSection labels={labelsFor(en)} />);
    expect(screen.getByRole("button", { name: /Is the Renoqo estimate free/i })).toBeTruthy();
    expect(screen.getByText(/indicative estimate offered on Renoqo is free/i)).toBeTruthy();
  });
});
