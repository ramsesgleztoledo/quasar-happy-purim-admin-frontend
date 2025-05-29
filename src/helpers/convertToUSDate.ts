export const convertToUSDate = (date?: string | Date | undefined) => {
  if (!date) return "";

  return typeof date === "string" ? new Date(date).toLocaleString("en-US") : date.toLocaleString("en-US")

};
