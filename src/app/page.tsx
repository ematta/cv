import Hero from "@/components/Hero";
import SkillsGrid from "@/components/SkillsGrid";
import SmoothNav from "@/components/SmoothNav";
import Timeline from "@/components/Timeline";
import { resume } from "@/data/resume";
import styles from "./page.module.css";

const NAV_SECTIONS = [
  { id: "experience", label: "Experience" },
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
        <Hero contact={resume.contact} />

        <section id="experience" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Experience
            <span className={styles.sectionTitleAccent} />
          </h2>
          <Timeline jobs={resume.experience} />
        </section>

        <section id="skills" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Skills
            <span className={styles.sectionTitleAccent} />
          </h2>
          <SkillsGrid groups={resume.skills} />
        </section>

        <section id="education" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Education
            <span className={styles.sectionTitleAccent} />
          </h2>
          <div className={styles.sectionList}>
            {resume.education.map((edu) => (
              <div key={edu.degree} className={styles.listItem}>
                <div className={styles.itemTitle}>{edu.degree}</div>
                <div className={styles.itemSub}>{edu.school}</div>
                <div className={styles.itemMeta}>
                  {edu.years}
                  {edu.status ? ` \u00B7 ${edu.status}` : ""}
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
            {resume.certifications.map((cert) => (
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
          <p className={styles.summary}>{resume.summary}</p>
        </section>

        <footer className={`${styles.footer} no-print`}>
          &copy; {new Date().getFullYear()} Enrique Matta-Rodriguez
        </footer>
      </div>
    </div>
  );
}
