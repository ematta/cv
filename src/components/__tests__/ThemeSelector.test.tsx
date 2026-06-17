import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeSelector from "@/components/ThemeSelector";

const THEMES = ["Light", "Dark", "Papyrus", "Terminal"] as const;

let storage: Record<string, string> = {};

beforeEach(() => {
  document.documentElement.setAttribute("data-theme", "terminal");
  storage = {};
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
  });
});

describe("ThemeSelector", () => {
  it("renders all four theme options", () => {
    render(<ThemeSelector />);
    for (const label of THEMES) {
      const options = screen.getAllByText(label);
      expect(options.length).toBeGreaterThan(0);
    }
  });

  it("updates data-theme attribute on selection", () => {
    render(<ThemeSelector />);
    const selects = screen.getAllByLabelText("Select theme");
    fireEvent.change(selects[0], { target: { value: "papyrus" } });
    expect(document.documentElement.getAttribute("data-theme")).toBe("papyrus");
  });

  it("persists selection to localStorage", () => {
    render(<ThemeSelector />);
    const selects = screen.getAllByLabelText("Select theme");
    fireEvent.change(selects[0], { target: { value: "dark" } });
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
