import { describe, expect, it } from "vitest";
import { formatDate, formatEducationDate } from "../utils";

describe("formatDate", () => {
  it("formats YYYY-MM to Mon YYYY", () => {
    expect(formatDate("2024-04")).toBe("Apr 2024");
    expect(formatDate("2022-07")).toBe("Jul 2022");
    expect(formatDate("2021-11")).toBe("Nov 2021");
  });

  it("returns year-only input as-is", () => {
    expect(formatDate("2024")).toBe("2024");
  });

  it("handles full ISO dates", () => {
    expect(formatDate("2016-01-01")).toBe("Jan 2016");
  });
});

describe("formatEducationDate", () => {
  it("renders range with end date", () => {
    expect(formatEducationDate({ startDate: "2016", endDate: "2019" })).toBe(
      "2016 \u2013 2019",
    );
  });

  it("renders In Progress when endDate is missing", () => {
    expect(formatEducationDate({ startDate: "2024" })).toBe(
      "2024 \u2013 In Progress",
    );
  });
});
