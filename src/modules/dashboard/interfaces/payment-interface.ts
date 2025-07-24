export interface UnPaidOrdersInterface {
  invoices: InvoiceUnpaidOrderInterface[];
  totalDue: number;
}

export interface InvoiceUnpaidOrderInterface {
  OrderDate: Date,
  OrderNumber: number;
  OrderTotal: number;
  Paid: number;
  Due: number;
  amountApplied: number | undefined
}

export interface RecordCheckOrCreditPaymentFormInterface {
  paymentMethodIndex: number;
  checkAmount:        number;
  checkDate:          string;
  creditAmount:       number;
  creditDate:         string;
  checkNumber:        string;
  memo:               string;
  cMemo:              string;
}


export interface RecordCheckPaymentFormInterface {
  amount: number;
  date: string;
  memo: string;
  checkNumber: string;
  invoices: RecordCheckPaymentInvoiceInterface[];
}

export interface RecordCheckPaymentInvoiceInterface {
  transactionID: number;
  amount: number;
}


export interface RecordCCPaymentFormInterface {
  paymentMethodIndex: number;
  total:              number;
  invoiceList:        RecordCCPaymentInvoiceList[];
  fullName:           string;
  expiration:         string;
  cardNumber:         string;
  cvv:                string;
  billingAddress:     string;
  city:               string;
  state:              string;
  phone:              string;
  postalCode:         string;
  cardLast4:          string;
}

export interface RecordCCPaymentInvoiceList {
  transactionId: number;
  amountApplied: number;
}



// export interface UnPaidOrdersInterface {
//   invoices: InvoiceUnpaidOrderInterface[];
//   totalDue: number;
// }

// export interface InvoiceUnpaidOrderInterface {
//   m_id: number;
//   "First Name": string;
//   "Last Name": string;
//   Spouse: string;
//   Address1: string;
//   "Address 2": string;
//   City: string;
//   State: string;
//   PostalCode: string;
//   Phone: string;
//   Email1: string;
//   Email2: string;
//   "Login Code": string;
//   Misc: string;
//   Notes: string;
//   "Route Code": string;
//   Title: string;
//   OrganizationId: number;
//   OrderNumber: number;
//   "Order Date": Date;
//   OrderTotal: number;
//   Paid: number;
//   BalanceDue: number;
//   amountApplied: number | undefined
// }
