export interface OrderPromotionInterface {
  id: number;
  categories: string;
  joinCategories: string;
  displayText: string;
  itemId: number;
  sortOrder: number;
  price: number;
  cssClass: string;
  applyMax: null;
  displayed: null;
  orderItemID: null;
  transactionID: null;
  quantity: number;
  selected?: boolean;
}


export interface OrderMemberListInterface {
  id: number;
  firstName: string;
  sFirstName: string;
  sLastName: string;
  lastName: string;
  misc: string;
  category: string;
  address1: string;
  title: string;
  paid: boolean;
  sendToMe: StringBooleanEnum;
  sentToMeLastYear: number;
  iSentLastYear: number;
  reciprocal: OrderReciprocalEnum;
  price: number;
  customPrice: number;
  selected: boolean;
  memberCategories: string;
}



export enum OrderReciprocalEnum {
  No = "No",
  Yes = "Yes"
}



export enum StringBooleanEnum {
  False = "False",
  True = "True",
}


export interface MemberOrderItemsInterface {
  price: number;
  description: string;
  itemId: number;
  shipTo: string;
  message: string;
  quantity: number;
  sessionId: string;
}
