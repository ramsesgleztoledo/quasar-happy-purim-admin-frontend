export const convertWithCommas = (number: number | undefined | null, usdm?: boolean) => {
    if (usdm && number) number = number / 1000000;
    return number
        ? number < 0
            ? `${usdm ? (number > -0.1 ? "" : "-") : "("}${Math.abs(number)
                .toFixed(usdm ? 1 : 2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${usdm ? "" : ")"}`
            : number.toFixed(usdm ? 1 : 2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : usdm
            ? "0.0"
            : "0.00";
};
