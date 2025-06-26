import type { CharitySettingsInterface, Tab1AdditionalProfileQuestionInterface, Tab1AlternativeDeliveryAddressInterface, Tab1DonateBasketInterface, Tab2AdditionalItemInterface, Tab2AddonInterface, Tab3BasketSizeInterface } from "../../interfaces/advanced-settings.interfaces";


export interface AdvancedSettingsStateInterface {
  // tab 1
  donateBasket: Tab1DonateBasketInterface;
  alternativeAddress: Tab1AlternativeDeliveryAddressInterface;
  additionalProfileQuestions: Tab1AdditionalProfileQuestionInterface[];

  // tab 2
  charitySettings: CharitySettingsInterface;
  addonSettings: Tab2AddonInterface;
  sendOutSettings: Tab2AddonInterface;
  additionalOrderingItem: {
    enabled: boolean;
    message: string;
    items: Tab2AdditionalItemInterface[];
  },
  // tab 3
  basketSize: Tab3BasketSizeInterface[];

  // tab 4
  receiptText: string;
  invoiceText: string;
}
