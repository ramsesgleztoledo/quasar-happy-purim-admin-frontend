import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CustomShippingItemFormInterface, CustomShippingItemResponseInterface, UpdateShippingItemFormInterface } from "../interfaces/memberOrder-interfaces";




export const useShippingItemsService = () => {

  const baseUrl = '/ShippingItems'
  const { apiCall } = useApiCall()

  return {
    getCustomShippingItem: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingItemResponseInterface[]>> => {
      const nextUrl = `/get-shipping-items?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },


    addCustomShippingItem: async (memberGuid: string, data: CustomShippingItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingItemResponseInterface[]>> => {
      const nextUrl = `/add-shipping-item?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
      })
    },
    updateCustomShippingItem: async (memberGuid: string, data: UpdateShippingItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingItemResponseInterface[]>> => {
      const nextUrl = `/update-shipping-item/add?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data,
      })
    },
    deleteCustomShippingItem: async (memberGuid: string, data: UpdateShippingItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingItemResponseInterface[]>> => {
      const nextUrl = `/update-shipping-item/delete?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data,
      })
    },



  }













}
