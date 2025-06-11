import printJS from 'print-js'

export const printHelper = (printArea: HTMLElement | null | undefined) => {
  if (!printArea) return
  printJS({
    printable: printArea,
    type: 'html',
    scanStyles: true,
  })
}
