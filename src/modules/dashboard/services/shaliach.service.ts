import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AddRemoveMemberFormInterface } from "../interfaces/memberOrder-interfaces";




export const useShaliachService = () => {

  const baseUrl = '/Shaliach'
  const { apiCall } = useApiCall()

  return {
    addMember: async (memberData: { memberGuid: string, memberId: number }, data: AddRemoveMemberFormInterface[], extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-shaliach/add?memberGuid=${memberData.memberGuid}&memberId=${memberData.memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
      })
    },
    removeMember: async (memberData: { memberGuid: string, memberId: number }, data: AddRemoveMemberFormInterface[], extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-shaliach/delete?memberGuid=${memberData.memberGuid}&memberId=${memberData.memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
      })
    },




  }













}
