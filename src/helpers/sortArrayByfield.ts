/* eslint-disable @typescript-eslint/no-explicit-any */


export const sortArrayByField = <T extends Record<string, any>>(
  arr: T[],
  field: keyof T,
  IsAsc: boolean) => {


  const final = arr.sort((a, b) => {



    const valA = a[field];
    const valB = b[field];
    if (typeof valA === 'string' && typeof valB === 'string') {
      return IsAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (valA < valB) return IsAsc ? -1 : 1;
    if (valA > valB) return IsAsc ? 1 : -1;
    return 0;
  })




  return final
};

