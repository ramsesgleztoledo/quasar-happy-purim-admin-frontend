import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { AlternativeMemberAddress, AlternativeMemberAddressFormInterface, BasketReceivedInterface, DoorManStatusInterface, EmailLoginCodeInfoInterface, MemberAddFormInterface, MemberAddResponseInterface, MemberAllInfoInterface, MemberDataInterface, MemberDonateBasketOptionInterface, MemberHiddenInterface, MemberPersonalBasketInterface, MemberProfileQuestionInterface, MemberReciprocityInterface, MembershipStatusInterface, MembersLoggedInterface, MembersResponseInterface, MemberTransactionInterface, MemberUpdateFormInterface, PendingDeletionInterface, SearchedMemberInterface } from "../interfaces/member-interfaces";




export const useMemberService = () => {

  const baseUrl = '/Members'
  const { apiCall } = useApiCall()

  return {
    getMembersList: async (filters: { search: string, categories: string | number }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembersResponseInterface>> => {
      const nextUrl = `?search=${filters.search}&categories=${filters.categories}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      })
    },
    getShowRecordPaymentBtn: async (memberId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{
      showRecordPaymentButton: boolean
    }>> => {
      const nextUrl = `/${memberId}/show-record-payment-button`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
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
    updateAlternativeAddressByMemberId: async (memberId: number, data: AlternativeMemberAddressFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

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

    getProfileQuestions: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberProfileQuestionInterface[]>> => {
      const nextUrl = `/${memberId}/options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    updateProfileQuestions: async (memberId: number, data: { option: number, value: 0 | 1 }[], extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown[]>> => {
      const nextUrl = `/${memberId}/options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },

    resetMemberLoginCode: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ loginCode: string, signOnLink: string }>> => {
      const nextUrl = `/${memberId}/reset-login-code`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT'
      })
    },
    emailReceiptByTransactionId: async (transaction: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string>> => {
      const nextUrl = `/${transaction}/email-receipt`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST'
      })
    },
    getDisplayChildren: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<boolean>> => {
      const nextUrl = `/${memberId}/display-children`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getKJSettings: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DoorManStatusInterface>> => {
      const nextUrl = `/${memberId}/kj-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    updateKJSettings: async (memberId: number, value: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DoorManStatusInterface>> => {
      const nextUrl = `/${memberId}/kj-update-doorman-status`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data: {
          selectedIndex: value ? 1 : 0,
          rowKJVisible: true
        }
      })
    },
    getMemberShipStatus: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembershipStatusInterface>> => {
      const nextUrl = `/${memberId}/membership-status`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    updateMemberShipStatus: async (memberId: number, value: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembershipStatusInterface>> => {
      const nextUrl = `/${memberId}/membership-status?isChecked=${value}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
      })
    },
    getShowClearCart: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<boolean>> => {
      const nextUrl = `/${memberId}/show-cart`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    searchMembers: async (query: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<SearchedMemberInterface[]>> => {
      const nextUrl = `/search-members?query=${query}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getAllMemberInfo: async (memberId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberAllInfoInterface>> => {
      const nextUrl = `/${memberId}/all-info`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

  }
}
