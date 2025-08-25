
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberOrderStateInterface } from './memberOrder-store-interfaces';
import type { OrderMemberListInterface, OrderPromotionInterface, MemberOrderItemsInterface, MemberOrderOrgSettingInterface, MemberAdditionalCharityOptionsInterface, MemberCharityOptionInterface, CustomShippingOptionInterface, CustomShippingItemInterface, AdditionalOrderOptionInterface, DiscountInterface, PaymentMethodTypeInterface, ShulSettingInterface, } from '../../interfaces/memberOrder-interfaces';
import type { NoneType } from '../../services/service-interfaces';
import type { OrderItemSettingsInterface, Tab2AddonInterface } from '../../interfaces/advanced-settings.interfaces';
import { s_cartData, s_customShippingItemsTotal, s_donations, s_fee, s_isPaymentFormInvalid, s_orderTotal } from './services';



const initialState: MemberOrderStateInterface = {

  promotions: [],
  memberList: {
    original: [],
    copy: []
  },
  orderItems: [],
  membersSelected: [],
  orgSettings: undefined,
  additionalCharityOptions: [],
  charityOptions: [],
  customShippingOptions: [],
  customShippingItems: [],
  sendOutSettings: {
    enabled: false,
    message: "",
    price: 0
  },
  addonSettings: {
    enabled: false,
    message: "",
    price: 0
  },
  additionalOrderItemsSettings: {
    enabled: false,
    message: "",
  },
  additionalOrderOptions: [],
  discounts: [],
  paymentMethodTypes: [],
  paymentForm: {
    form: undefined,
    checkForm: undefined,
    email: "",
    paymentType: 1
  },
  shulSetting: undefined,
  totalFromBackend: 0,
}

export const useMemberOrderStore = defineStore('memberOrderStore', {
  state: (): MemberOrderStateInterface => ({
    ...initialState
  }),

  getters: {

    getMemberList: (state) => state.memberList,

    getCustomShippingItemsTotal: (state: MemberOrderStateInterface): number => s_customShippingItemsTotal(state),

    getTotalCost: (state: MemberOrderStateInterface): number => s_orderTotal(state),

    getFee: (state: MemberOrderStateInterface) => s_fee(state),

    getDonations: (state: MemberOrderStateInterface) => s_donations(state),

    IsPaymentFormInvalid: (state: MemberOrderStateInterface) => s_isPaymentFormInvalid(state),

    getCartData: (state: MemberOrderStateInterface) => s_cartData(state),

    getSPrice: (state: MemberOrderStateInterface) => state.shulSetting?.sPerperson || 0
  },

  actions: {
    setPromotions(promotions: OrderPromotionInterface[]) {
      this.promotions = [...promotions.map(item => ({ ...item }))];
    },
    setMemberList(memberList: OrderMemberListInterface[]) {
      this.memberList = {
        copy: [...memberList.map(item => ({ ...item }))],
        original: [...memberList.map(item => ({ ...item }))],
      };
    },
    setMemberListOriginal(memberList: OrderMemberListInterface[]) {
      this.memberList.original = [...memberList.map(item => ({ ...item }))]
    },
    setMemberListCopy(memberList: OrderMemberListInterface[]) {
      this.memberList.copy = [...memberList.map(item => ({ ...item }))]
    },
    setOrderItems(orderItems: MemberOrderItemsInterface[]) {
      this.orderItems = [...orderItems.map(item => ({ ...item }))];
    },
    setOrgSettings(orgSettings: MemberOrderOrgSettingInterface | NoneType) {
      this.orgSettings = orgSettings
    },
    setMembersSelected(membersSelected: OrderMemberListInterface[]) {
      this.membersSelected = membersSelected.map(item => ({ ...item }))
    },
    setAdditionalCharityOptions(additionalCharityOptions: MemberAdditionalCharityOptionsInterface[]) {
      this.additionalCharityOptions = additionalCharityOptions.map(item => ({ ...item }))
    },
    setCharityOptions(charityOptions: MemberCharityOptionInterface[]) {
      this.charityOptions = charityOptions.map(item => ({ ...item }))
    },
    setCustomShippingOptions(customShippingOptions: CustomShippingOptionInterface[]) {
      this.customShippingOptions = customShippingOptions.map(item => ({ ...item }))
    },
    setCustomShippingItems(customShippingItems: CustomShippingItemInterface[]) {
      this.customShippingItems = customShippingItems.map(item => ({ ...item }))
    },
    setSendOutSettings(sendOutSettings: Tab2AddonInterface) {
      this.sendOutSettings = sendOutSettings
    },
    setAddonSettings(addonSettings: Tab2AddonInterface) {
      this.addonSettings = addonSettings
    },
    setAdditionalOrderItemsSettings(additionalOrderItemsSettings: OrderItemSettingsInterface) {
      this.additionalOrderItemsSettings = additionalOrderItemsSettings
    },
    setAdditionalOrderOptions(additionalOrderOptions: AdditionalOrderOptionInterface[]) {
      this.additionalOrderOptions = additionalOrderOptions
    },
    setDiscounts(discounts: DiscountInterface[]) {
      this.discounts = discounts
    },
    setPaymentMethodTypes(paymentMethodTypes: PaymentMethodTypeInterface[]) {
      this.paymentMethodTypes = paymentMethodTypes
    },
    setPaymentForm(form: unknown) {
      this.paymentForm.form = form
    },
    setCheckForm(form: unknown) {
      this.paymentForm.checkForm = form
    },

    resetPaymentForm() {
      this.paymentForm = {
        form: undefined,
        checkForm: undefined,
        email: "",
        paymentType: 1
      }
    },
    setShulSetting(shulSetting: ShulSettingInterface | NoneType) {
      this.shulSetting = shulSetting
    },
    setTotalFromBackend(totalFromBackend: number) {
      this.totalFromBackend = totalFromBackend
    },

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberOrderStore, import.meta.hot));
}
