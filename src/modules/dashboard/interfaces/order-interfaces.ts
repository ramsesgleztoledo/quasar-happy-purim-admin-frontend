export interface OrderArchiveInterface {
  orderNum: number;
  date: Date;
  memberName: string;
  numSent: number;
  method: string;
  total: number;
  authCode: string;
  nameOnCard: string;
}


export interface OrderReceiptInterface {
  organizationName: string;
  transactionNumber: number;
  soldTo: string;
  paymentMethod: string;
  last4DigitsOfCard: string;
  authCode: string;
  sendingToPeople: string[];
  totalRecipients: number;
  dueFromBaskets: number;
  orderItems: OrderItemInterface[];
  donations: number;
  amountDue: number;
  totalAmountPaid: number;
}

export interface OrderItemInterface {
  description: string;
  quantity: number;
  price: number;
  totalPrice: number;
}


export interface ItemDetailsInterface {
  quantity: number;
  description: string;
  orderNum: number;
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
  displayName: string;
}
