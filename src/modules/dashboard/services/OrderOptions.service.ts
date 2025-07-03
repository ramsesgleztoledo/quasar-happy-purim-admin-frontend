import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AdditionalOrderOptionInterface } from "../interfaces/memberOrder-interfaces";




export const useOrderOptionsService = () => {

  const baseUrl = '/OrderOptions'
  const { apiCall } = useApiCall()

  return {

    getAdditionalOrderOptions: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<AdditionalOrderOptionInterface[]>> => {
      const nextUrl = `/get-order-options?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },



  }













}
