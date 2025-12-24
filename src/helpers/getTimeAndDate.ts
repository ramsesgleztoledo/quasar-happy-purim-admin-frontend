type monthDayYear = 'y' | 'm' | 'd'

export const getTimeAndDate = (value: string | Date, format?: [monthDayYear, monthDayYear, monthDayYear]) => {
  let result = {
    dateValue: "",
    timeValue: "",
  }

  if (!value) return result

  const date = new Date(value);


  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateToFormat = {
    y: `${year}`,
    m: month,
    d: day,
  }

  const dateValue = format ? useFormat(dateToFormat, format) : `${year}/${month}/${day}`;


  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const m = hours >= 12 ? "p.m" : "a.m";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const timeValue = `${String(hours).padStart(2, "0")}:${minutes} ${m}`;

  result = { dateValue, timeValue };
  return result
};

const useFormat = (dateToFormat: {
  y: string;
  m: string;
  d: string;
}, format: [monthDayYear, monthDayYear, monthDayYear]) => {
  let formatted = ""
  format.forEach((fo) => {
    formatted += dateToFormat[fo]
  });
  return formatted
};



