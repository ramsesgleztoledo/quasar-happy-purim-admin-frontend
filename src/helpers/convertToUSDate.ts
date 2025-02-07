export const convertToUSDate = (date: string | Date) =>
  typeof date === "string" ? new Date(date).toLocaleString("en-US") : date.toLocaleString("en-US");
