import { describe, expect, it } from "vitest";
import type { JsonResume } from "@/data/resume";
import { resume } from "@/data/resume";

describe("resume data integrity", () => {
  it("has basics with required fields", () => {
    expect(resume.basics.name).toBeTruthy();
    expect(resume.basics.label).toBeTruthy();
    expect(resume.basics.email).toBeTruthy();
  });

  it("has work experience entries", () => {
    expect(resume.work).toBeDefined();
    expect(resume.work?.length).toBeGreaterThan(0);
    for (const job of resume.work ?? []) {
      expect(job.name).toBeTruthy();
      expect(job.position).toBeTruthy();
      expect(job.startDate).toBeTruthy();
      expect(job.highlights).toBeDefined();
      expect(job.highlights?.length).toBeGreaterThan(0);
    }
  });

  it("has skills in categories", () => {
    expect(resume.skills).toBeDefined();
    expect(resume.skills?.length).toBeGreaterThan(0);
    for (const group of resume.skills ?? []) {
      expect(group.name).toBeTruthy();
      expect(group.keywords).toBeDefined();
      expect(group.keywords?.length).toBeGreaterThan(0);
    }
  });

  it("has education entries with institutions", () => {
    expect(resume.education).toBeDefined();
    expect(resume.education?.length).toBeGreaterThan(0);
    for (const edu of resume.education ?? []) {
      expect(edu.institution).toBeTruthy();
    }
  });

  it("has certificates when present", () => {
    expect(resume.certificates).toBeDefined();
    for (const cert of resume.certificates ?? []) {
      expect(cert.name).toBeTruthy();
      expect(cert.issuer).toBeTruthy();
    }
  });

  it("has a meta section", () => {
    const meta = (resume as JsonResume & { meta?: Record<string, unknown> })
      .meta;
    expect(meta).toBeDefined();
    expect(meta?.version).toBe("v1.0.0");
  });
});
