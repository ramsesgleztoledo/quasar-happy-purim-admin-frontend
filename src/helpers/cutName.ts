export const cutName = (value: string, long: number) => {
  if (!value) return ''
  if (value.length <= long) return value
  return value.slice(0, long) + '...'
};
