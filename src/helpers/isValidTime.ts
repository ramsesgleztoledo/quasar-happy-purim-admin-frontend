
export const isValidTime = (timeString: string) => {
  const regex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (a.m|p.m)/;

  return regex.test(timeString);
}
