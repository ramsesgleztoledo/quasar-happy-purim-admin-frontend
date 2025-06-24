
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { AdvancedSettingsStateInterface } from './advancedSettings-store-interfaces';
import type { CharitySettingsInterface, Tab2AdditionalItemInterface, Tab2AddonInterface } from '../../interfaces/advanced-settings.interfaces';




const initialState: AdvancedSettingsStateInterface = {
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
    enabled: true,
    text: 'selling extra items',
    items: []
  }
}

export const useAdvancedSettingsStore = defineStore('advanceSettingsStore', {
  state: (): AdvancedSettingsStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setDonationContent(charitySettings: CharitySettingsInterface) {
      this.charitySettings = charitySettings
    },
    setAddonSettings(addonSettings: Tab2AddonInterface) {
      this.addonSettings = addonSettings
    },
    setSendOutSettings(sendOutSettings: Tab2AddonInterface) {
      this.sendOutSettings = sendOutSettings
    },
    setOrderingItem(orderingItem: Tab2AdditionalItemInterface[]) {
      this.additionalOrderingItem.items = orderingItem
    },
    addOrderingItem(orderingItem: Tab2AdditionalItemInterface[]) {
      this.additionalOrderingItem.items = [...orderingItem, ...this.additionalOrderingItem.items]
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdvancedSettingsStore, import.meta.hot));
}
