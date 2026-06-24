import type { JsonResume } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import styles from "./ThemedResume.module.css";

interface ThemedResumeProps {
  resume: JsonResume;
}

export default function ThemedResume({ resume }: ThemedResumeProps) {
  const { basics, work, projects, skills, education, certificates } = resume;
  const location = [basics.location?.city, basics.location?.region]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.name}>{basics.name}</h1>
        <p className={styles.label}>{basics.label}</p>
        <div className={styles.contact}>
          {location && <span>{location}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span>{basics.email}</span>}
          {basics.profiles?.map((p) => (
            <a key={p.network} href={p.url} className={styles.link}>
              {p.network}
            </a>
          ))}
        </div>
      </header>

      {basics.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>
          <p className={styles.summary}>{basics.summary}</p>
        </section>
      )}

      {work && work.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {work.map((job, i) => (
            <div
              key={`${job.name}-${job.position}-${i}`}
              className={styles.entry}
            >
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.position}>{job.position}</span>
                  <span className={styles.at}> at </span>
                  <span className={styles.company}>{job.name}</span>
                </div>
                <span className={styles.dates}>
                  {formatDate(job.startDate)} – {formatDate(job.endDate)}
                </span>
              </div>
              {job.highlights && job.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 40)}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {projects.map((project, i) => (
            <div key={`${project.name}-${i}`} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.position}>{project.name}</span>
                  {project.entity && (
                    <>
                      <span className={styles.at}> at </span>
                      <span className={styles.company}>{project.entity}</span>
                    </>
                  )}
                </div>
                <span className={styles.dates}>
                  {formatDate(project.startDate)} –{" "}
                  {project.endDate ? formatDate(project.endDate) : "Present"}
                </span>
              </div>
              {project.roles && project.roles.length > 0 && (
                <div className={styles.projectRoles}>
                  {project.roles.join(", ")}
                </div>
              )}
              {project.description && (
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {project.highlights.map((h) => (
                    <li key={h.slice(0, 40)}>{h}</li>
                  ))}
                </ul>
              )}
              {project.keywords && project.keywords.length > 0 && (
                <div className={styles.projectKeywords}>
                  {project.keywords.join(", ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          {skills.map((group) => (
            <div key={group.name} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{group.name}: </span>
              {group.keywords?.join(", ")}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={`${edu.institution}-${i}`} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.degree}>
                    {[edu.studyType, edu.area].filter(Boolean).join(", ")}
                  </span>
                  <span className={styles.at}> at </span>
                  <span className={styles.school}>{edu.institution}</span>
                </div>
                <span className={styles.dates}>
                  {formatDate(edu.startDate ?? "")} –{" "}
                  {formatDate(edu.endDate ?? "")}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {certificates && certificates.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={`${cert.name}-${i}`} className={styles.entry}>
              <div className={styles.entryHeader}>
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.dates}>{cert.date}</span>
              </div>
              <div className={styles.certIssuer}>{cert.issuer}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
