import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { MemberCreateOrderFormInterface } from "../interfaces/memberOrder-interfaces";




export const useProcessOrderService = () => {

  const baseUrl = '/ProcessOrder'
  const { apiCall } = useApiCall()

  return {
    placeOrder: async (query: { memberGuid: string, memberId: number }, data: MemberCreateOrderFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string>> => {
      const nextUrl = `/transaction-request?memberGuid=${query.memberGuid}&memberId=${query.memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },



  }













}
