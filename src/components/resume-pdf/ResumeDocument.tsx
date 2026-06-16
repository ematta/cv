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
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
    color: "#000000",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 6,
  },
  contact: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 14,
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
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
  entry: {
    marginBottom: 6,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  entryTitle: {
    flex: 1,
    paddingRight: 8,
  },
  position: {
    fontWeight: "bold",
    fontSize: 10,
  },
  at: {
    fontSize: 9.5,
    color: "#555555",
  },
  company: {
    fontSize: 10,
  },
  dates: {
    fontSize: 9,
    color: "#555555",
    whiteSpace: "nowrap",
  },
  highlightsList: {
    marginTop: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
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
    marginBottom: 7,
  },
  skillCategory: {
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 1,
  },
  skillKeywords: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#222222",
  },
  eduEntry: {
    marginBottom: 5,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10,
  },
  eduSchool: {
    fontSize: 9,
    color: "#333333",
    marginTop: 1,
  },
  certEntry: {
    marginBottom: 4,
  },
  certName: {
    fontWeight: "bold",
    fontSize: 10,
  },
  certIssuer: {
    fontSize: 9,
    color: "#555555",
    marginTop: 1,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: PAGE_PADDING,
    right: PAGE_PADDING,
    textAlign: "center",
    fontSize: 8,
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
  const { basics, work, skills, education, certificates } = resume;

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
        <Text style={styles.name}>{basics.name}</Text>
        <Text style={styles.label}>{basics.label}</Text>
        <Text style={styles.contact}>{contact.join(" · ")}</Text>

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
                  <Text style={styles.dates}>{cert.date}</Text>
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
