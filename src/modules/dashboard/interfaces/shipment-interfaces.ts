export interface BasketToBeShippedInterface {
  shippingID: number;
  shippingOptionID: number;
  memberID: number;
  transactionID: number;
  sendTo: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
  route: string;
  description: null;
  email: string;
  phone: string;
  misc: string;
  sendingFrom: string;
  orderSubmitted: Date;
  intCode: number;
}











