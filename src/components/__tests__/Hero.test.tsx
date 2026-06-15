import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "@/components/Hero";
import { resume } from "@/data/resume";

describe("Hero", () => {
  it("renders name and title", () => {
    render(<Hero basics={resume.basics} />);
    expect(screen.getByText(resume.basics.name)).toBeDefined();
    expect(screen.getByText(resume.basics.label)).toBeDefined();
  });

  it("renders location", () => {
    render(<Hero basics={resume.basics} />);
    const location = [
      resume.basics.location?.city,
      resume.basics.location?.region,
    ]
      .filter(Boolean)
      .join(", ");
    const elements = screen.getAllByText(location);
    expect(elements.length).toBeGreaterThan(0);
  });
});
