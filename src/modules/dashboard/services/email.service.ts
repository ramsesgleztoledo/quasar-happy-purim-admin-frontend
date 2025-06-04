import type { ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { CampaignDetailsInterface, CampaignInterface, EmailContentInterface } from "../interfaces/email-interfaces";


export const useEmailService = () => {

  const baseUrl = '/Emails'
  const { apiCall } = useApiCall()

  return {
    getEmails: async (extraOptions?: ExtraOptionsInterface): Promise<CampaignInterface[]> => {

      const nextUrl = `/email-campaigns`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      }) || []
    },

    getCampaignDetailById: async (campaignId: number, extraOptions?: ExtraOptionsInterface): Promise<CampaignDetailsInterface | undefined | null> => {
      const nextUrl = `/emails/${campaignId}/details`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getEmailContentByEmailId: async (emailId: number, extraOptions?: ExtraOptionsInterface): Promise<EmailContentInterface | undefined | null> => {
      const nextUrl = `/emails/${emailId}/content`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

  }













}
