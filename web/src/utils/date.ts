/**
 * Formats a date string or Date object to a string like "Mar 31".
 * @param dateInput The date to format
 * @returns The formatted date string, or empty string if input is invalid
 */
export function formatShortDate(dateInput: Date | string | null | undefined): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
