export const getCardType = (cardNumber: string | number): string | undefined => {
  const number = cardNumber.toString().replace(/\D/g, '');

  if (/^4\d{12}(\d{3})?$/.test(number)) {
    return 'Visa';
  }

  if (
    /^5[1-5]\d{14}$/.test(number) ||
    /^2(2[2-9][1-9]|2[3-9]\d{2}|[3-6]\d{3}|7([01]\d{2}|20))\d{12}$/.test(number)
  ) {
    return 'Mastercard';
  }

  if (/^3[47]\d{13}$/.test(number)) {
    return 'Amex';
  }

  if (
    /^6(?:011|5\d{2}|4[4-9]\d|22(?:1[2-9]|[2-8]\d|9[01]))\d{12}$/.test(number)
  ) {
    return 'Discover';
  }

  return undefined;
};
