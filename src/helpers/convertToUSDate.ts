export const convertToUSDate = (date?: string | Date | undefined, excludeSec: boolean = false) => {
  if (!date) return "";

  const options: Intl.DateTimeFormatOptions = excludeSec
    ? { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", options);

};
