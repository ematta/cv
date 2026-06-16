import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { JsonResume } from "@/data/resume";
import { formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 42,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.35,
    color: "#000000",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 3,
  },
  label: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 6,
  },
  contact: {
    fontSize: 9.5,
    color: "#333333",
    marginBottom: 14,
  },
  section: {
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#222222",
    textAlign: "justify",
  },
  entry: {
    marginBottom: 7,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  entryLeft: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    flex: 1,
  },
  position: {
    fontWeight: "bold",
    fontSize: 10.5,
  },
  at: {
    fontSize: 10,
    color: "#555555",
    marginHorizontal: 2,
  },
  company: {
    fontSize: 10.5,
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
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 7,
    fontSize: 9.5,
    lineHeight: 1.45,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: "#222222",
  },
  skillRow: {
    flexDirection: "row",
    fontSize: 9.5,
    marginBottom: 2.5,
    color: "#222222",
  },
  skillCategory: {
    fontWeight: "bold",
    fontSize: 9.5,
  },
  skillKeywords: {
    fontSize: 9.5,
    color: "#222222",
  },
  eduEntry: {
    marginBottom: 6,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10.5,
  },
  eduSchool: {
    fontSize: 10,
    color: "#333333",
  },
  certEntry: {
    marginBottom: 4,
  },
  certName: {
    fontWeight: "bold",
    fontSize: 10.5,
  },
  certIssuer: {
    fontSize: 9.5,
    color: "#555555",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 42,
    right: 42,
    textAlign: "center",
    fontSize: 8.5,
    color: "#888888",
  },
});

interface ResumeDocumentProps {
  resume: JsonResume;
}

function DateRange({
  start,
  end,
  isEducation,
}: {
  start?: string;
  end?: string;
  isEducation?: boolean;
}) {
  const fmtStart = formatDate(start);
  if (!end) {
    const suffix = isEducation ? "In Progress" : "Present";
    return <Text>{`${fmtStart} – ${suffix}`}</Text>;
  }
  return <Text>{`${fmtStart} – ${formatDate(end)}`}</Text>;
}

export default function ResumeDocument({ resume }: ResumeDocumentProps) {
  const { basics, work, skills, education, certificates } = resume;

  const location = [basics.location?.city, basics.location?.region]
    .filter(Boolean)
    .join(", ");

  const contact: string[] = [];
  if (location) contact.push(location);
  if (basics.phone) contact.push(basics.phone);
  if (basics.email) contact.push(basics.email);

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

        {work && work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {work.map((job, i) => (
              <View
                key={`${job.name}-${job.position}-${i}`}
                style={styles.entry}
              >
                <View style={styles.entryRow}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.position}>{job.position}</Text>
                    <Text style={styles.at}>at</Text>
                    <Text style={styles.company}>{job.name}</Text>
                  </View>
                  <Text style={styles.dates}>
                    <DateRange start={job.startDate} end={job.endDate} />
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
            {skills.map((group) => (
              <View key={group.name} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{group.name}: </Text>
                <Text style={styles.skillKeywords}>
                  {group.keywords?.join(", ")}
                </Text>
              </View>
            ))}
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
                    <DateRange
                      start={edu.startDate}
                      end={edu.endDate}
                      isEducation
                    />
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
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
