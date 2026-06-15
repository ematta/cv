import type { JsonResumeSkill } from "@/data/resume";
import styles from "./SkillsGrid.module.css";

interface SkillsGridProps {
  groups: JsonResumeSkill[];
}

export default function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <div key={group.name} className={styles.card}>
          <h3 className={styles.category}>{group.name}</h3>
          <div className={styles.pills}>
            {group.keywords?.map((keyword) => (
              <span key={keyword} className={styles.pill}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
