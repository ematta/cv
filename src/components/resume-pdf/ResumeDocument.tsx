import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { JsonResume } from "@/data/resume";
import { formatDate } from "@/lib/utils";

Font.registerHyphenationCallback((word) => [word]);

const PAGE_PADDING = 36;

const styles = StyleSheet.create({
  page: {
    padding: PAGE_PADDING,
    paddingBottom: PAGE_PADDING + 6,
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#000000",
  },
  header: {
    marginBottom: 16,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 1.2,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 11,
    lineHeight: 1.3,
    color: "#333333",
    marginBottom: 6,
    fontStyle: "italic",
  },
  contact: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#333333",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    lineHeight: 1.3,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 3,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.45,
    color: "#222222",
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#444444",
    marginTop: 2,
    marginBottom: 2,
  },
  entry: {
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },
  entryTitle: {
    flex: 1,
    paddingRight: 8,
  },
  position: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 1.3,
  },
  at: {
    fontSize: 9.5,
    lineHeight: 1.3,
    color: "#555555",
  },
  company: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  dates: {
    fontSize: 9,
    lineHeight: 1.3,
    color: "#555555",
    whiteSpace: "nowrap",
  },
  highlightsList: {
    marginTop: 3,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 7,
    fontSize: 9,
    lineHeight: 1.4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: "#222222",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skillColumn: {
    width: "48%",
    marginBottom: 8,
  },
  skillCategory: {
    fontWeight: "bold",
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  skillKeywords: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#222222",
  },
  eduEntry: {
    marginBottom: 6,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 1.3,
  },
  eduSchool: {
    fontSize: 9,
    lineHeight: 1.3,
    color: "#333333",
    marginTop: 2,
  },
  certEntry: {
    marginBottom: 5,
  },
  certName: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 1.3,
  },
  certIssuer: {
    fontSize: 9,
    lineHeight: 1.3,
    color: "#555555",
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: PAGE_PADDING,
    right: PAGE_PADDING,
    textAlign: "center",
    fontSize: 8,
    lineHeight: 1.3,
    color: "#777777",
  },
});

interface ResumeDocumentProps {
  resume: JsonResume;
  maxHighlightsPerJob?: number;
}

function formatDateRange(
  start?: string,
  end?: string,
  isEducation = false,
): string {
  const fmtStart = formatDate(start);
  if (!end) {
    return `${fmtStart} – ${isEducation ? "In Progress" : "Present"}`;
  }
  return `${fmtStart} – ${formatDate(end)}`;
}

export default function ResumeDocument({
  resume,
  maxHighlightsPerJob = Number.POSITIVE_INFINITY,
}: ResumeDocumentProps) {
  const { basics, work, projects, skills, education, certificates } = resume;

  const location = [basics.location?.city, basics.location?.region]
    .filter(Boolean)
    .join(", ");

  const contact: string[] = [];
  if (location) contact.push(location);
  if (basics.phone) contact.push(basics.phone);
  if (basics.email) contact.push(basics.email);

  const trimmedWork = work?.map((job) => ({
    ...job,
    highlights: job.highlights?.slice(0, maxHighlightsPerJob),
  }));

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.label}>{basics.label}</Text>
          <Text style={styles.contact}>{contact.join(" · ")}</Text>
        </View>

        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{basics.summary}</Text>
          </View>
        )}

        {trimmedWork && trimmedWork.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {trimmedWork.map((job, i) => (
              <View
                key={`${job.name}-${job.position}-${i}`}
                style={styles.entry}
              >
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>
                    <Text style={styles.position}>{job.position}</Text>
                    <Text style={styles.at}> at </Text>
                    <Text style={styles.company}>{job.name}</Text>
                  </Text>
                  <Text style={styles.dates}>
                    {formatDateRange(job.startDate, job.endDate)}
                  </Text>
                </View>
                {job.highlights && job.highlights.length > 0 && (
                  <View style={styles.highlightsList}>
                    {job.highlights.map((h) => (
                      <View key={h.slice(0, 60)} style={styles.bullet}>
                        <Text style={styles.bulletDot}>{"\u2022"}</Text>
                        <Text style={styles.bulletText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {projects && projects.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, i) => (
              <View key={`${project.name}-${i}`} style={styles.entry}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>
                    <Text style={styles.position}>{project.name}</Text>
                    {project.entity && (
                      <>
                        <Text style={styles.at}> at </Text>
                        <Text style={styles.company}>{project.entity}</Text>
                      </>
                    )}
                  </Text>
                  <Text style={styles.dates}>
                    {formatDateRange(project.startDate, project.endDate)}
                  </Text>
                </View>
                {project.description && (
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <View style={styles.highlightsList}>
                    {project.highlights.map((h) => (
                      <View key={h.slice(0, 60)} style={styles.bullet}>
                        <Text style={styles.bulletDot}>{"\u2022"}</Text>
                        <Text style={styles.bulletText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skills.map((group) => (
                <View key={group.name} style={styles.skillColumn}>
                  <Text style={styles.skillCategory}>{group.name}</Text>
                  <Text style={styles.skillKeywords}>
                    {group.keywords?.join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={`${edu.institution}-${i}`} style={styles.eduEntry}>
                <View style={styles.entryRow}>
                  <Text style={styles.eduDegree}>
                    {[edu.studyType, edu.area].filter(Boolean).join(", ")}
                  </Text>
                  <Text style={styles.dates}>
                    {formatDateRange(edu.startDate, edu.endDate, true)}
                  </Text>
                </View>
                <Text style={styles.eduSchool}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {certificates && certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certificates.map((cert, i) => (
              <View key={`${cert.name}-${i}`} style={styles.certEntry}>
                <View style={styles.entryRow}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.dates}>{formatDate(cert.date)}</Text>
                </View>
                {cert.issuer && (
                  <Text style={styles.certIssuer}>{cert.issuer}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            totalPages > 1 ? `Page ${pageNumber} of ${totalPages}` : ""
          }
          fixed
        />
      </Page>
    </Document>
  );
}
