export interface BasketToBeShippedInterface {
  shippingID: number;
  shippingOptionID: number | string;
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
  description?: string;
  email: string;
  phone: string;
  misc: string;
  sendingFrom: string;
  orderSubmitted: Date;
  intCode: number;
}

export interface BasketToBeShippedUpdateInterface {
  shippingID: number;
  sendTo: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
  email: string;
  phone: string;
  route: string;
  misc: string;
  shippingOptionID: number | string;
}

