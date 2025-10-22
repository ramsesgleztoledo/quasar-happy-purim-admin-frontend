
import { computed } from "vue";
import { useEmailStore } from "../store/emailStore/emailStore";
import { useEmailService } from "../services/email.service";


export const useEmail = () => {


  const $eStore = useEmailStore()
  const { getEmails, getCampaignDetailById, getEmailContentByEmailId } = useEmailService()



  return {
    emailState: computed(() => $eStore.$state),
    async getEmails() {
      const campaigns = await getEmails({
        loading: {
          message: 'Loading ...'
        }
      })
      $eStore.setCampaigns(campaigns.ok ? campaigns.data : []);
    },
    async getCampaignDetailById(id: number) {
      const campaignsDetails = await getCampaignDetailById(id, {
        loading: {
          message: 'Loading ...'
        }
      })
      $eStore.setSelectedCampaign(campaignsDetails.ok ? campaignsDetails.data : undefined);
      return campaignsDetails
    },
    async getEmailContentByEmailId(id: number) {

      const emailContent = await getEmailContentByEmailId(id, {
        loading: {
          message: 'Loading ...'
        },
        useCache: true
      })
      return emailContent.ok ? (emailContent.data.body || "") : ""
    },

  }
};
