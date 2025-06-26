import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { OrderPromotionInterface } from "../interfaces/memberOrder-interfaces";




export const usePromotionService = () => {

  const baseUrl = '/Promotions'
  const { apiCall } = useApiCall()

  return {
    getPromotionsByMemberGuid: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderPromotionInterface[]>> => {
      const nextUrl = `/get-promotions?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getMemberListByMemberGuid: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderPromotionInterface[]>> => {
      const nextUrl = `/get-promotions?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


  }













}
