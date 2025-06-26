export interface TransactionsInterface {
  count: number;
  transactions: TransactionInterface[];
}

export interface TransactionInterface {
  memberID: number;
  invoiceNum: number;
  cardType: CardTypeEnum;
  postedOn: Date;
  processedOn: Date;
  charge: number;
  nameOnCard: string;
  memberName: string;
}

export enum CardTypeEnum {
  Amex = "AMEX",
  Discover = "Discover",
  Invoice = "INVOICE",
  MasterCard = "MasterCard",
  Visa = "VISA",
}


export interface DonationInterface {
  amount: number;
  description: string;
  orderNumber: number;
  lastName: string;
  firstName: string;
  spouse: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

export interface ReciprocityChargeInterface {
  orderId: number;
  type: string;
  memberId: number;
  lastName: string;
  firstName: string;
  spouse: string;
  address: string;
  reciprocatingToCount: number;
  orderTotal: number;
}


export interface TransactionDetailsInterface {
  summary: TransactionDetailsSummaryInterface;
  paymentInfo: TransactionDetailsPaymentInfoInterface;
  recipients: TransactionDetailsRecipientInterface[];
  additionalOrderItems: TransactionDetailsAdditionalOrderItemsInterface[];
}

export interface TransactionDetailsPaymentInfoInterface {
  tranId: number;
  method: string;
  last4OrCheckNo: string;
  approvalCode: string;
  charge: number;
  donation: number;
  tranPostedDate: Date;
}

export interface TransactionDetailsRecipientInterface {
  sendingTo: string;
  price: number;
}

export interface TransactionDetailsSummaryInterface {
  organization: string;
  sendingFromName: string;
  sendingFromAddress: string;
  recipientsCount: number;
  dueFromBaskets: number;
}
export interface TransactionDetailsAdditionalOrderItemsInterface {
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
  totalPricePerItem: number;
}

