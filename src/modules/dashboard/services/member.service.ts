import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { AlternativeMemberAddress, BasketReceivedInterface, EmailLoginCodeInfoInterface, MemberAddFormInterface, MemberAddResponseInterface, MemberAlternativeAddressDataInterface, MemberDataInterface, MemberDonateBasketOptionInterface, MemberHiddenInterface, MemberInterface, MemberPersonalBasketInterface, MemberReciprocityInterface, MembersLoggedInterface, MemberTransactionInterface, MemberUpdateFormInterface, PendingDeletionInterface } from "../interfaces/member-interfaces";




export const useMemberService = () => {

  const baseUrl = '/Members'
  const { apiCall } = useApiCall()

  return {
    getMembersList: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberInterface[]>> => {

      return await apiCall({
        url: baseUrl,
        extraOptions
      })
    },
    getMemberById: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberDataInterface>> => {

      const nextUrl = `/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getHiddenByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberHiddenInterface>> => {

      const nextUrl = `/${memberId}/hidden`;
      const url = `${baseUrl}${nextUrl}`;
      return (await apiCall({
        url,
        extraOptions
      }))
    },
    getReciprocityByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberReciprocityInterface>> => {

      const nextUrl = `/${memberId}/reciprocity`;
      const url = `${baseUrl}${nextUrl}`;
      return (await apiCall({
        url,
        extraOptions
      }))
    },
    deleteMemberById: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}/delete`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    getIsPendingDeletionByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<PendingDeletionInterface>> => {

      const nextUrl = `/${memberId}/pendingdeletion`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getAlternativeAddressByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<AlternativeMemberAddress>> => {

      const nextUrl = `/${memberId}/alternate-delivery`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    updateAlternativeAddressByMemberId: async (memberId: number, data: MemberAlternativeAddressDataInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<AlternativeMemberAddress>> => {

      const nextUrl = `/${memberId}/alternate-delivery`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getTransactionsByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberTransactionInterface[]>> => {

      const nextUrl = `/${memberId}/transactions`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getMemberDonateBasketOptionByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberDonateBasketOptionInterface>> => {

      const nextUrl = `/${memberId}/donate-basket-option`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    updateMemberDonateBasketOptionByMemberId: async (memberId: number, donateValue: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}/donate-basket-option?value=${donateValue}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    updateReciprocityByMemberId: async (memberId: number, reciprocityValue: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}/reciprocity?reciprocity=${reciprocityValue}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    clearCartByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}/clear-cart`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    getEmailLoginCodeInfo: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<EmailLoginCodeInfoInterface>> => {

      const nextUrl = `/${memberId}/email-login-code-info`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getMembersLogged: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembersLoggedInterface>> => {
      const nextUrl = `/logged-in-members`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    downloadMembersLogged: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/logged-in-members/export`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'text'
      })
    },
    getBasketReceived: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketReceivedInterface[]>> => {
      const nextUrl = `/send-receive-stats`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    downloadBasketReceived: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/send-receive-stats/export`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'text'
      })
    },
    getMemberPersonalBasket: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberPersonalBasketInterface[]>> => {
      const nextUrl = `/personal-baskets`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    downloadMemberPersonalBasketCSV: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/personal-baskets/export`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'text'
      })
    },
    updateMemberByMemberId: async (memberId: number, data: MemberUpdateFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    updateHiddenByMemberId: async (memberId: number, hiddenValue: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/${memberId}/hidden?hidden=${hiddenValue}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    addMember: async (data: MemberAddFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberAddResponseInterface>> => {

      const nextUrl = `/add`;
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
