import type { ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { MemberDataInterface, MemberHiddenInterface, MemberReciprocityInterface } from "../interfaces/member-interfaces";
import type { NoneType } from "./service-interfaces";



export const useMemberService = () => {

  const baseUrl = '/Members'
  const { apiCall } = useApiCall()

  return {
    getMembersList: async (extraOptions?: ExtraOptionsInterface): Promise<[]> => {

      return await apiCall({
        url: baseUrl,
        extraOptions
      }) || []
    },

    getMemberById: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<MemberDataInterface | NoneType> => {

      const nextUrl = `/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    getHiddenByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<MemberHiddenInterface | NoneType> => {

      const nextUrl = `/${memberId}/hidden`;
      const url = `${baseUrl}${nextUrl}`;
      return (await apiCall({
        url,
        extraOptions
      }))
    },
    
    getReciprocityByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<MemberReciprocityInterface | NoneType> => {

      const nextUrl = `/${memberId}/reciprocity`;
      const url = `${baseUrl}${nextUrl}`;
      return (await apiCall({
        url,
        extraOptions
      }))
    },

    deleteMemberById: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<NoneType> => {

      const nextUrl = `/${memberId}/delete`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },

  }













}
