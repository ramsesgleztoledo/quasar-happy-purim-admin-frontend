import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CustomShippingOptionAttributeInterface, CustomShippingOptionInterface } from "../interfaces/memberOrder-interfaces";




export const useCustomShippingOptionsService = () => {

  const baseUrl = '/CustomShippingOptions'
  const { apiCall } = useApiCall()

  return {
    getCustomShippingOptions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingOptionInterface[]>> => {
      const nextUrl = `/get-shipping-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getAttributesByCustomShippingOptionId: async (id: number, memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomShippingOptionAttributeInterface[]>> => {
      const nextUrl = `/get-shipping-attributes/${id}?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },



  }













}
