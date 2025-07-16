export const onlyDigits = (e: KeyboardEvent) => {
  const key = e.key
  if (!/^\d$/.test(key)) {
    e.preventDefault()
  }
}
