import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SkillsGrid from "@/components/SkillsGrid";
import SmoothNav from "@/components/SmoothNav";
import Timeline from "@/components/Timeline";
import { resume } from "@/data/resume";
import { formatEducationDate } from "@/lib/utils";
import styles from "./page.module.css";

const NAV_SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "summary", label: "Summary" },
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <SmoothNav sections={NAV_SECTIONS} />
      <div className={styles.container}>
        <Hero basics={resume.basics} />

        <section id="experience" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Experience
            <span className={styles.sectionTitleAccent} />
          </h2>
          <Timeline jobs={resume.work ?? []} />
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Projects
            <span className={styles.sectionTitleAccent} />
          </h2>
          <Projects projects={resume.projects ?? []} />
        </section>

        <section id="skills" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Skills
            <span className={styles.sectionTitleAccent} />
          </h2>
          <SkillsGrid groups={resume.skills ?? []} />
        </section>

        <section id="education" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Education
            <span className={styles.sectionTitleAccent} />
          </h2>
          <div className={styles.sectionList}>
            {resume.education?.map((edu) => (
              <div
                key={`${edu.institution}-${edu.studyType}`}
                className={styles.listItem}
              >
                <div className={styles.itemTitle}>
                  {[edu.studyType, edu.area].filter(Boolean).join(", ")}
                </div>
                <div className={styles.itemSub}>{edu.institution}</div>
                <div className={styles.itemMeta}>
                  {formatEducationDate(edu)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Certifications
            <span className={styles.sectionTitleAccent} />
          </h2>
          <div className={styles.sectionList}>
            {resume.certificates?.map((cert) => (
              <div key={cert.name} className={styles.listItem}>
                <div className={styles.itemTitle}>{cert.name}</div>
                <div className={styles.itemSub}>{cert.issuer}</div>
                <div className={styles.itemMeta}>{cert.date}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="summary" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Professional Summary
            <span className={styles.sectionTitleAccent} />
          </h2>
          <p className={styles.summary}>{resume.basics.summary}</p>
        </section>

        <footer className={`${styles.footer} no-print`}>
          &copy; {new Date().getFullYear()} Enrique Matta-Rodriguez
        </footer>
      </div>
    </div>
  );
}
