/**
 * Formats a date string or Date object to a string like "Mar 31".
 * @param dateInput The date to format
 * @returns The formatted date string, or empty string if input is invalid
 */
export function formatShortDate(
  dateInput: Date | string | null | undefined,
  localeCode?: string,
): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const currentLocale = localeCode || navigator.language.split("-")[0];
  const mappedLocale = currentLocale === "en" ? "en-US" : "pt-BR";

  return date.toLocaleDateString(mappedLocale, { month: "short", day: "numeric" });
}
