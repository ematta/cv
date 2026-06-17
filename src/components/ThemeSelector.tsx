"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSelector.module.css";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "papyrus", label: "Papyrus" },
  { value: "terminal", label: "Terminal" },
] as const;

export default function ThemeSelector() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored) setTheme(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* noop */
    }
  };

  return (
    <select
      className={`${styles.select} no-print`}
      value={theme}
      onChange={handleChange}
      aria-label="Select theme"
    >
      {THEMES.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
