import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { BasketOptionBtnsInterface } from "../interfaces/memberOrder-interfaces";






export const useSpecialBasketOptionsService = () => {

  const baseUrl = '/SpecialBasketOptions'
  const { apiCall } = useApiCall()

  return {
    getBasketBtns: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketOptionBtnsInterface | undefined>> => {
      const nextUrl = `/basket-buttons`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },



  }













}
