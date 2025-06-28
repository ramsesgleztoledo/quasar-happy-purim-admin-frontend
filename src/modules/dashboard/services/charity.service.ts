import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { MemberAdditionalCharityOptionsInterface, MemberCharityOptionInterface } from "../interfaces/memberOrder-interfaces";





export const useCharityService = () => {

  const baseUrl = '/Charity'
  const { apiCall } = useApiCall()

  return {
    getAdditionalCharityOptions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberAdditionalCharityOptionsInterface[]>> => {
      const nextUrl = `/get-additional-charity-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,

      })
    },
    getCharityOptions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberCharityOptionInterface[]>> => {
      const nextUrl = `/get-charity-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,

      })
    },



  }













}
