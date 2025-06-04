
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { emailStateInterface } from './email-store-interfaces';
import type { CampaignDetailsInterface, CampaignInterface } from '../../interfaces/email-interfaces';


const initialState: emailStateInterface = {
  campaigns: [],
  selectedCampaign: undefined,
}

export const useEmailStore = defineStore('emailStore', {
  state: (): emailStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setSelectedCampaign(selectedCampaign: CampaignDetailsInterface) {
      this.selectedCampaign = selectedCampaign;
    },
    setCampaigns(campaigns: CampaignInterface[]) {
      this.campaigns = campaigns;
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmailStore, import.meta.hot));
}
