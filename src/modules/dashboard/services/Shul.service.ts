import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { ShulSettingInterface } from "../interfaces/memberOrder-interfaces";






export const useShulService = () => {

  const baseUrl = '/Shuls'
  const { apiCall } = useApiCall()

  return {

    getShulSettings: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ShulSettingInterface>> => {
      const nextUrl = `/get-shul-settings?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },



  }













}
