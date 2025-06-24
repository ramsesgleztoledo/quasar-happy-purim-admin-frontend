import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CharitySettingsInterface, Tab2AdditionalItemInterface, Tab2AddonFormInterface, Tab2AddonInterface, Tab2AddOrderItemFormInterface, Tab2AllowMembersFormInterface } from "../interfaces/advanced-settings.interfaces";





export const useAdvancedSettingsService = () => {

  const baseUrl = '/OrgInfo'
  const { apiCall } = useApiCall()

  return {
    getDonationContent: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CharitySettingsInterface>> => {
      const nextUrl = `/charity`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateDonationContent: async (data: CharitySettingsInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-charity-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getAddon: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AddonInterface>> => {
      const nextUrl = `/addon`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateAddon: async (data: Tab2AddonFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-addon-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getSendOut: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AddonInterface>> => {
      const nextUrl = `/sendout`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateSendOut: async (data: Tab2AllowMembersFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-sendout-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getAdditionalOrderingItems: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AdditionalItemInterface[]>> => {
      const nextUrl = `/admin-additional-ordering-options-extra-order-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    addAdditionalOrderingItems: async (data: Tab2AddOrderItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AdditionalItemInterface>> => {
      const nextUrl = `/add-order-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "POST",
        data
      })
    },
    deleteAdditionalOrderingItems: async (data: { optionId: number }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/orderoptions/delete`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data
      })
    },
    updateAdditionalOrderingItem: async (id: number, data: Tab2AddOrderItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-update-cards-and-and-additional-order-options-info/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data
      })
    },

  }

}
