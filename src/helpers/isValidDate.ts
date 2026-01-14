export const isValidDate = (dateString: string) => {

  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split('/').map(Number);
  if (!year || !month || !day) return false

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;

};

export const isValidDateUSA = (dateString: string) => {

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [month, day, year] = dateString.split('/').map(Number);
  if (!year || !month || !day) return false

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;

};
