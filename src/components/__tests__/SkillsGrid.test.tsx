import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsGrid from "@/components/SkillsGrid";
import { resume } from "@/data/resume";

describe("SkillsGrid", () => {
  it("renders all skill category names", () => {
    render(<SkillsGrid groups={resume.skills ?? []} />);
    for (const group of resume.skills ?? []) {
      const elements = screen.getAllByText(group.name);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders keyword pills for each skill", () => {
    render(<SkillsGrid groups={resume.skills ?? []} />);
    for (const group of resume.skills ?? []) {
      for (const keyword of group.keywords ?? []) {
        const elements = screen.getAllByText(keyword);
        expect(elements.length).toBeGreaterThan(0);
      }
    }
  });
});
