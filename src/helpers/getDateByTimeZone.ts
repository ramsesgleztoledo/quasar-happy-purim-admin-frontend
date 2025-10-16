import { DateTime } from "luxon";

export const getDateByTimeZone = (date: string, timeZone: string) => {

  const dateUtc = new Date(date);


  const dtUtc = DateTime.fromJSDate(dateUtc, { zone: "utc" });


  const timezoneAux = timeZone || "America/New_York";
  const dtInZone = dtUtc.setZone(timezoneAux);

  return dtInZone.toFormat("MM/dd/yyyy hh:mm a")

};
