/* eslint-disable @typescript-eslint/no-explicit-any */


import type { OrderItemSettingsInterface, Tab2AddonInterface } from "../../interfaces/advanced-settings.interfaces";
import type { OrganizationSettingsInterface } from "../../interfaces/basic-settings.interfaces";
import type { AdditionalOrderOptionInterface, CustomShippingItemInterface, CustomShippingOptionInterface, DiscountInterface, GreetingsRecipientInterface, LocalDeliveryInterface, MemberAdditionalCharityOptionsInterface, MemberCharityOptionInterface, MemberOrderItemsInterface, MemberOrderOrgSettingInterface, OrderMemberListInterface, OrderPromotionInterface, PageStepInterface, PaymentMethodTypeInterface, ShulSettingInterface } from "../../interfaces/memberOrder-interfaces";
import type { MembershipInterface } from "../../interfaces/membership.interface";
import type { NoneType } from "../../services/service-interfaces";


export interface MemberOrderStateInterface {


  promotions: OrderPromotionInterface[];
  memberList:
  {
    original: OrderMemberListInterface[];
    copy: OrderMemberListInterface[];
  };
  orderItems: MemberOrderItemsInterface[];
  orgSettings: MemberOrderOrgSettingInterface | NoneType;
  membersSelected: OrderMemberListInterface[];
  additionalCharityOptions: MemberAdditionalCharityOptionsInterface[];
  charityOptions: MemberCharityOptionInterface[];
  customShippingOptions: CustomShippingOptionInterface[];
  customShippingItems: CustomShippingItemInterface[];
  sendOutSettings: Tab2AddonInterface;
  addonSettings: Tab2AddonInterface;
  additionalOrderItemsSettings: OrderItemSettingsInterface;
  additionalOrderOptions: AdditionalOrderOptionInterface[];
  discounts: DiscountInterface[];
  paymentMethodTypes: PaymentMethodTypeInterface[];
  paymentForm: {
    form: any;
    checkForm: any;
    email: string
    paymentType: number
  };
  shulSetting: ShulSettingInterface | NoneType;
  totalFromBackend: number;
  localDeliveries: LocalDeliveryInterface[];
  settings: OrganizationSettingsInterface | NoneType;
  showFee: boolean;
  showEmailReceiptTo: boolean;
  step: 0 | 1 | 2 | 3;
  membership: MembershipInterface | NoneType;
  membershipType: 'life' | 'annual' | 'none';
  orderPages: PageStepInterface[];
  greetingsRecipients: GreetingsRecipientInterface[]
}
