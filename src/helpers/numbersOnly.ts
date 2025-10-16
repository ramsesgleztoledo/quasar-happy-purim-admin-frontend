export const numbersOnly = (evt: KeyboardEvent) => {
  const charCode: number = evt.which ? evt.which : evt.keyCode

  // allow backspace (8) and delete (46)
  if (charCode === 8 || charCode === 46)
    return


  // allow numbers only (0-9)
  if (charCode < 48 || charCode > 57) {
    evt.preventDefault()
  }
};
