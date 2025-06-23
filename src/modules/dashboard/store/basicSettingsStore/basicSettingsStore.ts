
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { BasicSettingsStateInterface } from './basicSettings-store-interfaces';
import type { OrganizationSettingsInterface } from '../../interfaces/basic-settings.interfaces';
import type { NoneType } from '../../services/service-interfaces';




const initialState: BasicSettingsStateInterface = {
  settings: undefined,
  welcomePage: ""
}

export const useBasicSettingsStore = defineStore('basicSettingsStore', {
  state: (): BasicSettingsStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setSettings(settings: OrganizationSettingsInterface | NoneType) {
      this.settings = settings
    },
    setWelcomePage(welcomePage: string) {
      this.welcomePage = welcomePage
    }

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBasicSettingsStore, import.meta.hot));
}
