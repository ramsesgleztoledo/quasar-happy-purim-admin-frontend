export const convertWithCommas = (
  number: number | undefined | null,
  params?: {
    dontAllowZero?: boolean,
    usdm?: boolean,
    goDown?: boolean
  }
) => {
  if (!number && params?.dontAllowZero) return "";

  if (params?.usdm && number) number = number / 1000000;

  const decimals = params?.usdm ? 1 : 2;
  const factor = Math.pow(10, decimals);


  const adjusted =
    params?.goDown && number
      ? number > 0
        ? Math.floor(number * factor) / factor
        : Math.ceil(number * factor) / factor
      : number;

  const formatted = Math.abs(adjusted ?? 0)
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return number
    ? number < 0
      ? `${params?.usdm ? (number > -0.1 ? "" : "-") : "(-"}${formatted}${params?.usdm ? "" : ")"}`
      : formatted
    : params?.usdm
      ? "0.0"
      : "0.00";
};
