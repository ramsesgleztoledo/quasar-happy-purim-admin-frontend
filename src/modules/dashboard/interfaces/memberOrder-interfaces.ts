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
  price: number;
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
  // sSendout: boolean;
  // sSendoutprice: number;
  // sSendoutText: string
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


export interface CustomShippingOptionInterface {
  id: number;
  description: string;
  price: number;
  sortOrder: number;
  maxQuantity: number;
  hasAttributes: boolean;
  shippingOptionGuid?: string,
  shippingItemGuid?: string,
  shippingOptionsGUID?: string,
  clientId?: number,
  deleted?: boolean,
  dateAdded?: Date,
  lastUpdated?: Date,
}



export interface CustomShippingOptionAttributeInterface {
  id: number;
  shippingOptionAttributeGuid: string;
  shippingOptionId: number;
  name: string;
  required: boolean;
  price: number;
  description: string;
  promptText: string;
  imageURL: string;
}


export type CustomShippingOptionAttributeType = CustomShippingOptionAttributeInterface & {
  value: string | number;

  type: "text"
  | "password"
  | "textarea"
  | "email"
  | "search"
  | "tel"
  | "file"
  | "number"
  | "url"
  | "time"
  | "date"
  | "datetime-local"
  | undefined;

  selected: boolean;
};

export interface CustomShippingItemFieldsInterface {
  shippingItemId: number;
  shippingItemGuid: string;
  recipient: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  message: string;
  memberId: number;
  dateAdded: Date;
  shippingOptionId: number;
  email: string;
  phoneNumber: string;
  glutenFree: boolean;
  lastUpdated: Date;
  // attributes: AttributeCustomShippingItemInterface[];
}
export interface CustomShippingItemResponseInterface extends CustomShippingItemFieldsInterface {
  attributes: string;
}
export interface CustomShippingItemInterface extends CustomShippingItemFieldsInterface {
  attributes: AttributeCustomShippingItemInterface[];
}


export interface CustomShippingItemFormInterface {
  recipient: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
  shippingOptionId: number;
  email: string;
  phoneNumber: string;
  glutenFree: boolean;
  attributes: string;
}

export interface AttributeCustomShippingItemInterface {
  id: number;
  shippingOptionAttributeGuid: string;
  shippingOptionId: number;
  name: string;
  dataType: string;
  required: boolean;
  price: number;
  deleted: boolean;
  dateAdded: Date;
  lastUpdated: Date;
  description: string;
  promptText: string;
  imageURL: string;
  value: string;
  selected?: boolean;
}


export interface UpdateShippingItemFormInterface {
  shippingItemGuid: string;
  shippingItemId: number;
  recipient: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
  shippingOptionId: number;
  email: string;
  phoneNumber: string;
  glutenFree: boolean;
  attributes: string;
}


export interface AdditionalOrderOptionInterface {
  id: number;
  description: string;
  price: number;
  sortOrder: number;
  maxQuantity: number;
  value?: number
}


export interface DiscountInterface {
  discountId: number;
  name: string;
  description: string;
  couponCode: string;
  couponCodeRequired: boolean;
  validUntil: Date;
  neverExpires: boolean;
  discountPercent: number;
  excludeCharity: boolean;
}


export interface PaymentMethodTypeInterface {
  methodId: number;
  methodCode: string;
  methodDescription: string;
}

export interface PaymentFormInterface {
  firstName: string;
  lastName: string;
  date: string;
  cardCode: string;
  checkOrCCNumber: string;
  billAddress1: string;
  billAddress2: string;
  billCity: string;
  billState: string;
  billZip: string;
  phoneOrCheckDate: string;
}

export interface PaymentCheckFormInterface {
  checkOrCCNumber: string;
  total: number;
  firstName: string;
  phoneOrCheckDate: string;
}


export interface MemberCreateOrderFormInterfaceOld {
  cardType: 'v' | 'm' | 'a' | 'd' | '';
  checkOrCCNumber: string;
  paymentType: 'Credit Card' | 'Invoice' | 'Check';
  paymentMethod: string;
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  cardCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  billAddress1: string;
  billAddress2: string;
  billCity: string;
  billState: string;
  billZip: string;
  phone: string;
  specialInstructions: boolean;
  reciprocity: boolean;
  emailTo: string;
  tempCode: string;
  total: number;
  discountName: string;
  discountPrice: number;
  phoneOrCheckDate: string;
}

export interface MemberCreateOrderFormInterface {
  paymentMethod: 'Credit Card' | 'Invoice' | 'Check';
  paymentType: 'Credit Card' | 'Invoice' | 'Check';
  cardType: 'v' | 'm' | 'a' | 'd' | '';
  firstName: string;
  lastName: string;
  checkOrCCNumber: string;
  cardCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  billAddress1: string;
  billAddress2: string;
  billCity: string;
  billState: string;
  billZip: string;
  total: number;
  emailTo: string;
  tempCode: string;
  phoneOrCheckDate: string;
  specialInstructions: boolean;
  reciprocity: boolean;
}


export interface ShulSettingInterface {
  id: number;
  sName: string;
  sAddress1: string;
  sAddress2: string;
  sCity: string;
  sState: string;
  sZip: string;
  sPhone: string;
  sFax: string;
  sContact: string;
  sEmail: string;
  sImage: string;
  sLasttime: Date;
  sPerperson: number;
  sMaximum: number;
  sProcesspayments: boolean;
  sReciprocity: boolean;
  sMembershipfee: number;
  sFrontpage: string;
  sReceiptpage: string;
  sSendout: boolean;
  sSendoutprice: number;
  sAddon: boolean;
  sAddonprice: number;
  sAddOnText: string;
  sSendoutText: string;
  sDisplayaddress: boolean;
  sUrl: string;
  sCheckall: boolean;
  sCards: boolean;
  sCardsprice: number;
  sCardstext: string;
  sShiplocal: boolean;
  sShiplocalprice: number;
  sShiplocaltext: string;
  sMembershiptext: string;
  sEcheck: boolean;
  sCardsdescription: string;
  sShowmessagebox: boolean;
  sReciprocityprice: number;
}


export interface LocalDeliveryInterface {
  localDeliveryPrice: number;
  localDeliveryText: string;
  enabled: boolean;
  zipCode: string;
}
