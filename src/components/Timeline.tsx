"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Job } from "@/data/resume";
import styles from "./Timeline.module.css";

interface TimelineProps {
  jobs: Job[];
}

export default function Timeline({ jobs }: TimelineProps) {
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
    <div className={styles.timeline}>
      <div className={styles.line} />
      {jobs.map((job, index) => (
        <article
          key={`${job.company}-${job.role}-${job.start}`}
          className={styles.entry}
          ref={setEntryRef}
          style={{ transitionDelay: `${index * 100}ms` }}
          data-revealed="false"
        >
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.header}>
              <span className={styles.role}>{job.role}</span>
              <span className={styles.company}>{job.company}</span>
            </div>
            <div className={styles.meta}>
              <span className={styles.dates}>
                {job.start} &mdash; {job.end}
              </span>
              <span className={styles.metaDot}>&middot;</span>
              {job.remote ? (
                <span className={styles.badge}>Remote</span>
              ) : (
                <span>{job.location}</span>
              )}
            </div>
            <ul className={styles.bullets}>
              {job.bullets.map((bullet, i) => (
                <li
                  key={`${bullet.slice(0, 20)}-${i}`}
                  className={styles.bullet}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
