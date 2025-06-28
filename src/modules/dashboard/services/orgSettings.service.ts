import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { MemberOrderOrgSettingInterface } from "../interfaces/memberOrder-interfaces";





export const useOrgSettingsService = () => {

  const baseUrl = '/OrganizationSettings'
  const { apiCall } = useApiCall()

  return {
    getOrganizationSettings: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberOrderOrgSettingInterface[]>> => {
      const nextUrl = `/get-org-settings?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,

      })
    },




  }













}
