import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemedResume from "@/components/ThemedResume";
import { resume } from "@/data/resume";

describe("ThemedResume", () => {
  it("renders name and label", () => {
    render(<ThemedResume resume={resume} />);
    expect(screen.getByText(resume.basics.name)).toBeDefined();
    expect(screen.getByText(resume.basics.label)).toBeDefined();
  });

  it("renders all sections", () => {
    render(<ThemedResume resume={resume} />);
    const sections = [
      "Summary",
      "Experience",
      "Projects",
      "Skills",
      "Education",
      "Certifications",
    ];
    for (const section of sections) {
      const elements = screen.getAllByText(section);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders summary text", () => {
    render(<ThemedResume resume={resume} />);
    if (resume.basics.summary) {
      const elements = screen.getAllByText(resume.basics.summary);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders work positions", () => {
    render(<ThemedResume resume={resume} />);
    for (const job of resume.work ?? []) {
      const elements = screen.getAllByText(job.position);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders skill categories", () => {
    render(<ThemedResume resume={resume} />);
    for (const group of resume.skills ?? []) {
      const elements = screen.getAllByText((content) =>
        content.startsWith(group.name),
      );
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders education institutions", () => {
    render(<ThemedResume resume={resume} />);
    for (const edu of resume.education ?? []) {
      const elements = screen.getAllByText(edu.institution);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders certificate issuers", () => {
    render(<ThemedResume resume={resume} />);
    for (const cert of resume.certificates ?? []) {
      if (cert.issuer) {
        const elements = screen.getAllByText(cert.issuer);
        expect(elements.length).toBeGreaterThan(0);
      }
    }
  });
});
