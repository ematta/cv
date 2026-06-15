const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(date: string | undefined): string {
  if (!date) return "Present";
  const [year, month] = date.split("-");
  if (!month) return year;
  return `${MONTHS[Number.parseInt(month, 10) - 1]} ${year}`;
}

export function formatEducationDate(edu: {
  startDate?: string;
  endDate?: string;
}): string {
  const parts = [edu.startDate, edu.endDate || "In Progress"].filter(Boolean);
  return parts.join(" \u2013 ");
}
