"use client";

import { useEffect, useRef, useState } from "react";
import PrintButton from "./PrintButton";
import styles from "./SmoothNav.module.css";
import ThemeToggle from "./ThemeToggle";

interface NavSection {
  id: string;
  label: string;
}

interface SmoothNavProps {
  sections: readonly NavSection[];
}

export default function SmoothNav({ sections }: SmoothNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: 0, rootMargin: "-72px 0px -60% 0px" },
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.nav} no-print`}>
      <ThemeToggle />
      <ul className={styles.links}>
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`${styles.link} ${active === s.id ? styles.active : ""}`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.end}>
        <PrintButton />
      </div>
    </nav>
  );
}
