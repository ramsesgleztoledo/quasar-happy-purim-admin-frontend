import { useUI } from "src/modules/UI/composables";
import { useEmailSchedulerService } from "../services/EmailScheduler.service";

export const useEmailScheduler = () => {

  const { getEmailScheduler, getEmailsByCampaignId, getScheduledEmailContent, cancelCampaign } = useEmailSchedulerService()
  const { showToast } = useUI()

  return {
    async getEmailScheduler() {
      const resp = await getEmailScheduler({
        loading: {
          message: 'Loading ...',
        },
      })
      return resp.ok ? resp.data : []
    },
    async getEmailsByCampaignId(campaignId: string | number) {
      const resp = await getEmailsByCampaignId(campaignId, {
        loading: {
          message: 'Loading ...',
        },
      })
      return resp.ok ? resp.data : []
    },
    async getScheduledEmailContent(emailId: string | number) {
      const resp = await getScheduledEmailContent(emailId, {
        loading: {
          message: 'Loading ...',
        },
      })
      return resp.ok ? resp.data?.body : ""
    },
    async cancelCampaign(campaignId: string | number) {
      const resp = await cancelCampaign(campaignId, {
        loading: {
          message: 'Loading ...',
        },
      })
      showToast(resp.ok, 'Email Cancelled', 'Something went wrong cancelling the email')
      return resp.ok
    },


  }
};
