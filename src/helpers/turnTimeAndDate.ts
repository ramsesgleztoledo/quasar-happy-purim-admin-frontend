export const turnTimeAndDate = (value: {
  dateValue: string,
  timeValue: string
}) => {
  if (!value.dateValue || !value.timeValue) return undefined


  const [year, month, day] = value.dateValue.split("/");
  const [time, period] = value.timeValue.toLowerCase().split(" ");
  if (!time || !period || !year || !month || !day) return undefined

  const [hours, minutes] = time.split(":").map(Number);
  if (!hours || !minutes) return undefined

  let h = hours

  if (period === "p.m" && h !== 12) h += 12;
  if (period === "a.m" && h === 12) h = 0;


  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    h,
    minutes,
    0
  );

  return date.toISOString()
};

