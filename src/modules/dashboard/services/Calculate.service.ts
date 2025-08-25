import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";





export const useCalculateService = () => {

  const baseUrl = '/Calculate'
  const { apiCall } = useApiCall()

  return {
    CalculateTotal: async (memberGuid: string, memberId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<number>> => {
      const nextUrl = `/calculate-advanced-pricing?memberGuid=${memberGuid}&memberId=${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },



  }













}
