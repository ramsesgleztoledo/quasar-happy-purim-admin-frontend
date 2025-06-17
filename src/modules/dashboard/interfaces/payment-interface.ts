export interface UnPaidOrdersInterface {
  invoices: InvoiceUnpaidOrderInterface[];
  totalDue: number;
}

export interface InvoiceUnpaidOrderInterface {
  m_id: number;
  "First Name": string;
  "Last Name": string;
  Spouse: string;
  Address1: string;
  "Address 2": string;
  City: string;
  State: string;
  PostalCode: string;
  Phone: string;
  Email1: string;
  Email2: string;
  "Login Code": string;
  Misc: string;
  Notes: string;
  "Route Code": string;
  Title: string;
  OrganizationId: number;
  OrderNumber: number;
  "Order Date": Date;
  OrderTotal: number;
  Paid: number;
  BalanceDue: number;
  amountApplied: number | undefined
}
