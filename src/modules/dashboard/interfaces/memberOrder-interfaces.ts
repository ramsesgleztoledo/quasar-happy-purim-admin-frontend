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
export interface AddRemoveMemberFormInterface {
  receiver: number;
  tempcode: string;
}

export interface MemberOrderOrgSettingInterface {
  displayChildren: boolean;
  displayLastYearsOrders: boolean;
  processOwn: boolean;
  payLaterOption: boolean;
  payLaterText: string;
  excludeSendToAll: boolean;
  receiptText: string;
  showShippingInstructions: boolean;
  showShippingInstructionsTitle: string;
  displayLastYearsOrderIntro: boolean;
  overrideMailFromAddress: boolean;
  alternateDeliveryAddress: boolean;
  alternateDeliveryAddressPrompt: string;
  donateBasketOption: boolean;
  donateBasketOptionText: string;
  displayMisc2: boolean;
  currency: string;
  payPal: boolean;
  paypalUserName: string;
  displayPromotions: boolean;
  displayPromotionsScreen: boolean;
  reviewReciprocityCharges: boolean;
  promotionBtnDisplayText: string;
  displayNameLimit: number;
  symbol: string;
  creditCardPercent: number;
  perTransactionFee: number;
  feeActive: boolean;
  feeRequired: boolean;
  feeDesc: string;
  feeTitle: string;
  feeText: string;
}



export interface MemberAdditionalCharityOptionsInterface {
  id: number;
  message: string;
}


export interface MemberCharityOptionInterface {
  id: number;
  description: string;
  displayOrder: number;
}

export type CharityType = MemberCharityOptionInterface & {
  value: number
}

export type ExtendedPromotionType = MemberOrderItemsInterface & {
  memberList: OrderMemberListInterface[]
}
