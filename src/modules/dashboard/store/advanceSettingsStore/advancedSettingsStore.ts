
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { AdvancedSettingsStateInterface } from './advancedSettings-store-interfaces';
import type { CharitySettingsInterface, OrderItemSettingsInterface, Tab1AdditionalProfileQuestionInterface, Tab1AlternativeDeliveryAddressInterface, Tab1DonateBasketInterface, Tab2AdditionalItemInterface, Tab2AddonInterface, Tab3BasketSizeInterface } from '../../interfaces/advanced-settings.interfaces';




const initialState: AdvancedSettingsStateInterface = {

  // tab 1
  donateBasket: {
    donateBasketOption: false,
    donateBasketOptionText: ""
  },
  alternativeAddress: {
    alternateDeliveryAddressEnabled: false,
    alternateDeliveryAddressPrompt: ""
  },
  additionalProfileQuestions: [],

  // tab 2
  charitySettings: {
    active: false,
    message: ""
  },
  addonSettings: {
    enabled: false,
    message: "",
    price: 0
  },
  sendOutSettings: {
    enabled: false,
    message: "",
    price: 0
  },
  additionalOrderingItem: {
    enabled: false,
    message: '',
    items: []
  },

  // tab 3
  basketSize: [],


  // tab 4
  receiptText: "",
  invoiceText: "",
}

export const useAdvancedSettingsStore = defineStore('advanceSettingsStore', {
  state: (): AdvancedSettingsStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {


    /**========================================================================
     *                           tab 1
     *========================================================================**/
    setDonateBasket(donateBasket: Tab1DonateBasketInterface) {
      this.donateBasket = donateBasket
    },
    setAlternativeAddress(alternativeAddress: Tab1AlternativeDeliveryAddressInterface) {
      this.alternativeAddress = alternativeAddress
    },
    setAdditionalProfileQuestions(additionalProfileQuestions: Tab1AdditionalProfileQuestionInterface[]) {
      this.additionalProfileQuestions = additionalProfileQuestions
    },
    addAdditionalProfileQuestions(additionalProfileQuestions: Tab1AdditionalProfileQuestionInterface[]) {
      this.additionalProfileQuestions = [...additionalProfileQuestions, ... this.additionalProfileQuestions]
    },

    /**========================================================================
     *                           tab 2
     *========================================================================**/

    setAddonSettings(addonSettings: Tab2AddonInterface) {
      this.addonSettings = addonSettings
    },
    setSendOutSettings(sendOutSettings: Tab2AddonInterface) {
      this.sendOutSettings = sendOutSettings
    },
    setOrderingItem(orderingItem: Tab2AdditionalItemInterface[]) {
      this.additionalOrderingItem.items = orderingItem
    },
    setAdditionalOrderingItem(additionalOrderingItem: OrderItemSettingsInterface) {
      this.additionalOrderingItem.enabled = additionalOrderingItem.enabled
      this.additionalOrderingItem.message = additionalOrderingItem.message
    },
    addOrderingItem(orderingItem: Tab2AdditionalItemInterface[]) {
      this.additionalOrderingItem.items = [...orderingItem, ...this.additionalOrderingItem.items]
    },
    setDonationContent(charitySettings: CharitySettingsInterface) {
      this.charitySettings = charitySettings
    },

    /**========================================================================
     *                           tab 3
     *========================================================================**/
    setBasketSize(basketSize: Tab3BasketSizeInterface[]) {
      this.basketSize = basketSize
    },
    addBasketSize(basketSize: Tab3BasketSizeInterface[]) {
      this.basketSize = [...basketSize, ... this.basketSize]
    },

    /**========================================================================
     *                           tab 4
     *========================================================================**/
    setReceiptText(receiptText: string) {
      this.receiptText = receiptText;
    },
    setInvoiceText(invoiceText: string) {
      this.invoiceText = invoiceText;
    },

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdvancedSettingsStore, import.meta.hot));
}
