import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { OrderMemberListInterface } from "../interfaces/memberOrder-interfaces";




export const useMemberListService = () => {

  const baseUrl = '/MemberList'
  const { apiCall } = useApiCall()

  return {
    getMemberListMemberGuid: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderMemberListInterface[]>> => {
      const nextUrl = `/get-members-for-order?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },



  }













}
