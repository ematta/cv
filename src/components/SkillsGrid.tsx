"use client";

import { useEffect, useState } from "react";
import type { SkillGroup } from "@/data/resume";
import styles from "./SkillsGrid.module.css";

interface SkillsGridProps {
  groups: SkillGroup[];
}

export default function SkillsGrid({ groups }: SkillsGridProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`${styles.grid} ${loaded ? styles.loaded : ""}`}>
      {groups.map((group) => (
        <div key={group.category} className={styles.card}>
          <h3 className={styles.category}>{group.category}</h3>
          {group.skills.map((skill, i) => (
            <div key={skill.name} className={styles.skill}>
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}/5</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={
                    {
                      "--target-width": `${skill.level * 20}%`,
                      "--index": i,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
