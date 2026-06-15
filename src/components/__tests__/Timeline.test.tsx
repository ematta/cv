import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import Timeline from "@/components/Timeline";
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

describe("Timeline", () => {
  it("renders all job positions and companies", () => {
    render(<Timeline jobs={resume.work ?? []} />);
    for (const job of resume.work ?? []) {
      const positions = screen.getAllByText(job.position);
      expect(positions.length).toBeGreaterThan(0);
      const companies = screen.getAllByText(job.name);
      expect(companies.length).toBeGreaterThan(0);
    }
  });

  it("renders highlights for each job", () => {
    render(<Timeline jobs={resume.work ?? []} />);
    for (const job of resume.work ?? []) {
      if (job.highlights && job.highlights.length > 0) {
        const firstHighlight = job.highlights[0];
        if (firstHighlight) {
          const elements = screen.getAllByText(firstHighlight);
          expect(elements.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("shows Remote badge for remote positions", () => {
    render(<Timeline jobs={resume.work ?? []} />);
    const remoteJobs = (resume.work ?? []).filter(
      (j) => j.location === "Remote",
    );
    expect(remoteJobs.length).toBeGreaterThan(0);
    const badges = screen.getAllByText("Remote");
    expect(badges.length).toBeGreaterThanOrEqual(remoteJobs.length);
  });

  it("shows Present for current position", () => {
    render(<Timeline jobs={resume.work ?? []} />);
    const presents = screen.getAllByText(/Present/);
    expect(presents.length).toBeGreaterThan(0);
  });
});
