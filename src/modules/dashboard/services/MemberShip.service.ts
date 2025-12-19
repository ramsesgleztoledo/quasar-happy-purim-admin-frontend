import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { MembershipInterface } from "../interfaces/membership.interface";




export const useMemberShipService = () => {

  const baseUrl = '/Membership'
  const { apiCall } = useApiCall()

  return {
    getPayMembershipByMemberId: async (memberId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembershipInterface>> => {
      const nextUrl = `/${memberId}/pay-membership`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


  }













}
