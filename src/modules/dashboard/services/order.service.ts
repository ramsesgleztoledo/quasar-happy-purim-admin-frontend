import type { ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type {  CampaignInterface } from "../interfaces/email-interfaces";


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



  }













}
