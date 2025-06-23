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
