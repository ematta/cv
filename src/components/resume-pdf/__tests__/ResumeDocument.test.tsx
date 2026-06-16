// @vitest-environment node

import { renderToBuffer } from "@react-pdf/renderer";
import { describe, expect, it } from "vitest";
import { resume } from "@/data/resume";
import ResumeDocument from "../ResumeDocument";

describe("ResumeDocument", () => {
  it("renders to a valid PDF buffer", async () => {
    const buffer = await renderToBuffer(<ResumeDocument resume={resume} />);
    expect(buffer).toBeDefined();
    expect(buffer.length).toBeGreaterThan(0);
    expect(buffer.slice(0, 5).toString()).toBe("%PDF-");
  });
});
