export const compareValues = (a: unknown, b: unknown, descending?: boolean): number => {
  if (a == null && b == null) return 0
  if (a == null) return descending ? 1 : -1
  if (b == null) return descending ? -1 : 1

  // Convert Dates to timestamps
  if (a instanceof Date) a = a.getTime()
  if (b instanceof Date) b = b.getTime()

  // For strings, compare case-insensitively
  if (typeof a === 'string' && typeof b === 'string') {
    a = a.toLowerCase()
    b = b.toLowerCase()
  }

  const a1: number = a as number
  const b1: number = b as number

  if (a1 < b1) return descending ? 1 : -1
  if (a1 > b1) return descending ? -1 : 1

  return 0
}
