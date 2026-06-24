"use client";

import { useCallback, useEffect, useRef } from "react";
import type { JsonResumeProject } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import styles from "./Projects.module.css";

interface ProjectsProps {
  projects: JsonResumeProject[];
}

export default function Projects({ projects }: ProjectsProps) {
  const entriesRef = useRef<HTMLElement[]>([]);

  const setEntryRef = useCallback((el: HTMLElement | null) => {
    if (el && !entriesRef.current.includes(el)) {
      entriesRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const current = entriesRef.current;
    for (const el of current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.projects}>
      {projects.map((project, index) => (
        <article
          key={`${project.name}-${project.startDate}`}
          className={styles.entry}
          ref={setEntryRef}
          style={{ transitionDelay: `${index * 100}ms` }}
          data-revealed="false"
        >
          <div className={styles.card}>
            <div className={styles.header}>
              <span className={styles.name}>{project.name}</span>
              {project.entity && (
                <span className={styles.entity}>{project.entity}</span>
              )}
            </div>
            <div className={styles.meta}>
              {(project.roles?.length ?? 0) > 0 && (
                <>
                  <span className={styles.roles}>
                    {project.roles?.join(", ")}
                  </span>
                  <span className={styles.metaDot}>&middot;</span>
                </>
              )}
              <span className={styles.dates}>
                {formatDate(project.startDate)} &mdash;{" "}
                {project.endDate ? formatDate(project.endDate) : "Present"}
              </span>
            </div>
            {project.description && (
              <p className={styles.description}>{project.description}</p>
            )}
            {project.highlights && project.highlights.length > 0 && (
              <ul className={styles.bullets}>
                {project.highlights.map((bullet, i) => (
                  <li
                    key={`${bullet.slice(0, 20)}-${i}`}
                    className={styles.bullet}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {(project.keywords?.length ?? 0) > 0 && (
              <div className={styles.keywords}>
                {project.keywords?.map((keyword) => (
                  <span key={keyword} className={styles.keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
