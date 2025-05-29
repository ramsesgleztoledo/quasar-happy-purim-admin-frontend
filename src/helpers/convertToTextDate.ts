export const convertToTextDate = (date?: string | Date | undefined) => {

  if (!date) return ''

  if (typeof date === 'string')
    date = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);


  return formattedDate;

};
