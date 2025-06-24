import type { CharitySettingsInterface, Tab2AdditionalItemInterface, Tab2AddonInterface } from "../../interfaces/advanced-settings.interfaces";


export interface AdvancedSettingsStateInterface {
  charitySettings: CharitySettingsInterface;
  addonSettings: Tab2AddonInterface;
  sendOutSettings: Tab2AddonInterface;
  additionalOrderingItem: {
    enabled: boolean,
    text: string,
    items: Tab2AdditionalItemInterface[]
  }
}
