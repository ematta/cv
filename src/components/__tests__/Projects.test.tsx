import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import Projects from "@/components/Projects";
import { resume } from "@/data/resume";

beforeAll(() => {
  class MockObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(globalThis, "IntersectionObserver", {
    value: MockObserver,
    writable: true,
    configurable: true,
  });
});

describe("Projects", () => {
  it("renders all project names and entities", () => {
    render(<Projects projects={resume.projects ?? []} />);
    for (const project of resume.projects ?? []) {
      const names = screen.getAllByText(project.name);
      expect(names.length).toBeGreaterThan(0);
      if (project.entity) {
        const entities = screen.getAllByText(project.entity);
        expect(entities.length).toBeGreaterThan(0);
      }
    }
  });

  it("renders descriptions for each project", () => {
    render(<Projects projects={resume.projects ?? []} />);
    for (const project of resume.projects ?? []) {
      if (project.description) {
        const elements = screen.getAllByText(project.description);
        expect(elements.length).toBeGreaterThan(0);
      }
    }
  });

  it("renders highlights for each project", () => {
    render(<Projects projects={resume.projects ?? []} />);
    for (const project of resume.projects ?? []) {
      if (project.highlights && project.highlights.length > 0) {
        const firstHighlight = project.highlights[0];
        if (firstHighlight) {
          const elements = screen.getAllByText(firstHighlight);
          expect(elements.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("renders keyword pills", () => {
    render(<Projects projects={resume.projects ?? []} />);
    for (const project of resume.projects ?? []) {
      if (project.keywords && project.keywords.length > 0) {
        const firstKeyword = project.keywords[0];
        if (firstKeyword) {
          const elements = screen.getAllByText(firstKeyword);
          expect(elements.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("shows Present for current projects", () => {
    render(<Projects projects={resume.projects ?? []} />);
    const presents = screen.getAllByText(/Present/);
    expect(presents.length).toBeGreaterThan(0);
  });
});
