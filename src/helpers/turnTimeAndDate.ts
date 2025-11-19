import { DateTime } from "luxon";


export const getFormattedStringDate = (value: {
  dateValue: string,
  timeValue: string,
  timeZone?: string
}) => {

  const { hour, minute } = parseTime12h(value.timeValue);



  const dateValue = value.dateValue.split('/')



  const year = dateValue[0] || '00'
  const month = dateValue[1] || '00'
  const day = dateValue[2] || '00'

  const hourAux = hour && (hour < 10) ? `0${hour}` : (hour || '00')
  const minuteAux = minute && (minute < 10) ? `0${minute}` : (minute || '00')





  return `${year}-${month}-${day}T${hourAux}:${minuteAux}`


};

export const turnTimeAndDate = (value: {
  dateValue: string,
  timeValue: string,
  timeZone?: string
}) => {

  const { hour, minute } = parseTime12h(value.timeValue);



  const dateValue = value.dateValue.split('/')



  const year = Number(dateValue[0] || 0)
  const month = Number(dateValue[1] || 0)
  const day = Number(dateValue[2] || 0)




  const dtInZone = DateTime.fromObject(
    {
      year,
      month,
      day,
      hour,
      minute,
    },
    { zone: value.timeZone }
  );

  // console.log("En time zone:", dtInZone.toString());
  // console.log("En UTC:", dtInZone.toUTC().toString());


  // const jsDate = dtInZone.toJSDate();
  const jsDateUTC = dtInZone.toUTC().toJSDate();

  // console.log("JS Date (local zone):", jsDate);
  // console.log("JS Date (UTC):", jsDateUTC);


  return jsDateUTC
};



const parseTime12h = (time12h: string): { hour: number; minute: number } => {
  const [time, modifier] = time12h.split(" ");
  //handling error of undefined
  if (time == undefined || modifier == undefined) {
    return { hour: 0, minute: 0 }
  }

  // eslint-disable-next-line prefer-const
  let [hour, minute] = time.split(":").map(Number);

  //handling error of undefined
  if (hour == undefined || minute == undefined) {

    return { hour: 0, minute: 0 }
  }

  if (modifier.toLowerCase() === "p.m" && hour !== 12) hour += 12;
  if (modifier.toLowerCase() === "a.m" && hour === 12) hour = 0;

  return { hour, minute };
}


export const turnTimeAndDateAux = (value: {
  dateValue: string,
  timeValue: string,
  timeZone?: string
}) => {




  if (!value.dateValue || !value.timeValue) return undefined





  const [year, month, day] = value.dateValue.split("/");
  const [time, period] = value.timeValue.toLowerCase().split(" ");



  if (!time || !period || !year || !month || !day) return undefined

  const [hours, minutes] = time.split(":").map(Number);
  if (hours == undefined || isNaN(hours) || minutes == undefined || isNaN(minutes)) return undefined

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

  return date
  // .toISOString()

};

