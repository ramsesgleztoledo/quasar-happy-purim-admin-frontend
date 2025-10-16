import printJS from 'print-js'

export const printHelper = (printArea: HTMLElement | null | undefined) => {
  if (!printArea) return
  printJS({
    printable: printArea,
    type: 'html',
    scanStyles: true,
  })
}

export const printDiv = (divId: string) => {
  const div = document.getElementById(divId);
  if (!div) {
    console.error('Div not found');
    return;
  }

  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) return;

  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch {
        return '';
      }
    })
    .join('\n');

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

        <style>${styles}</style>
      </head>
      <body>
        ${div.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();


  printWindow.close();
}

export const printElement = (elementId: string) => {
  const div = document.getElementById(elementId)
  if (!div) {
    console.error('Div not found')
    return
  }

  const content = div.innerHTML
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n')

  const printWindow = window.open('', '', 'width=800,height=600')
  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${stylesheets}
        <style>
          body {
            padding: 16px;
          }
          @media print {
            .q-btn {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()

  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
};
