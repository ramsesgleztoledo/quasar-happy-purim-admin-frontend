
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
          message: 'loading emails...'
        }
      })
      $eStore.setCampaigns(campaigns);
    },
    async getCampaignDetailById(id: number) {
      const campaignsDetails = await getCampaignDetailById(id, {
        loading: {
          message: 'loading campaign details...'
        }
      })
      $eStore.setSelectedCampaign(campaignsDetails!);
      return campaignsDetails
    },
    async getEmailContentByEmailId(id: number) {

      const emailContent = await getEmailContentByEmailId(id, {
        loading: {
          message: 'loading email content...'
        },
        useCache: true
      })
      return emailContent?.body || ''
    },

  }
};
