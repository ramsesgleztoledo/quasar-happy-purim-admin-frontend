export interface ReportInterface {
  id: number;
  description: string;
  caption: string;
  view?: boolean
  download?: boolean
  preliminary?: boolean
}


export const basic: ReportInterface[] = [

  {
    id: 1,
    description: 'Sending To Report',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 2,
    description: 'Receiving From Report - Use this report to print/email your scrolls/recipient letters',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 3,
    description: 'Receiving From Report - Using Alternate Delivery Address',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 4,
    description: 'Members Not Logged In',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 5,
    description: 'Members Not Receiving',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 6,
    description: 'Membership List with Codes',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 7,
    description: 'Membership List with Codes - Using Alternate Delivery Address',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 8,
    description: 'Members with Reciprocity',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 9,
    description: 'Members without Orders',
    caption: 'Can be used for xyz email',
    view: true
  },

]
export const custom: ReportInterface[] = [
  {
    id: 10,
    description: 'I would be willing to help deliver/distribute baskets.',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 11,
    description: 'I would like to help pack the baskets on March 8th at 2pm.',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 12,
    description: 'Avel',
    caption: 'Can be used for xyz email',
    view: true
  },
  {
    id: 13,
    description: 'Donate basket option report',
    caption: 'This report lists those members who have elected to Donate Their Basket.',
    view: true
  },
  {
    id: 14,
    description: 'Invoices',
    caption: `These are invoices for orders that used the 'Invoice' payment method. Please print and send to your members.`,
    view: true
  },
  {
    id: 15,
    description: 'Reciprocity Invoices',
    caption: `These are the invoices for reciprocity only. Please print and send to your members.`,
    view: true
  },
]
export const advance: ReportInterface[] = [
  {
    id: 16,
    description: '2024 Statement - ',
    caption: `This displays the breakdown of payments and processing fees from 12/1/2023 - 7/11/2024.`,
    view: true,
    preliminary: true
  },
  {
    id: 17,
    description: `Last Season's Sending To Report`,
    caption: `Can be used for xyz email`,
    download: true,
  },
  {
    id: 18,
    description: `Last Season's Receiving From Report`,
    caption: `Can be used for xyz email`,
    download: true,
  },
  {
    id: 19,
    description: `Sending Comparison Report`,
    caption: `Can be used for xyz email`,
    view: true,
    download: true,
  },
]
