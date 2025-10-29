
import { computed } from "vue";
import { useEmailStore } from "../store/emailStore/emailStore";
import { useEmailService } from "../services/email.service";
import type { EmailDataFormInterface } from "../interfaces/email-interfaces";


export const useEmail = () => {


  const $eStore = useEmailStore()
  const { getEmails, getCampaignDetailById, getEmailContentByEmailId, sendAEmail } = useEmailService()



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

    async sendAEmail(data: EmailDataFormInterface) {

      const resp = await sendAEmail(data, {
        loading: {
          message: 'Loading ...',
        },
        dontRedirect: true,
        useRespAsError: true
      })

      console.log({ resp });

    },

  }
};
