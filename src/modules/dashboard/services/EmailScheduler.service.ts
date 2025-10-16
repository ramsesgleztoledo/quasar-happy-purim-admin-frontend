import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { ScheduleEmailInterface } from "../interfaces/schedule-email.interfaces";
import type { EmailToBeSentInterface } from '../interfaces/schedule-email.interfaces';



export const useEmailSchedulerService = () => {

  const baseUrl = '/EmailScheduler'
  const { apiCall } = useApiCall()

  return {
    getEmailScheduler: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ScheduleEmailInterface[]>> => {
      const nextUrl = `/scheduled-emails`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getEmailsByCampaignId: async (campaignId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<EmailToBeSentInterface[]>> => {
      const nextUrl = `/get-info-by-campaign-Id/${campaignId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getScheduledEmailContent: async (emailId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string>> => {
      const nextUrl = `/view-email-body/${emailId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    cancelCampaign: async (campaignId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/cancel-scheduled-emails/${campaignId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST'
      })
    },



  }













}
