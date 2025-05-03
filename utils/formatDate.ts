export function formatDate(date: string | Date, locale: string = "en-US") {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}