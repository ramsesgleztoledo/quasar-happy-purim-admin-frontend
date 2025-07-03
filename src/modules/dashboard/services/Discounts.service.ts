import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { DiscountInterface } from "../interfaces/memberOrder-interfaces";




export const useDiscountsService = () => {

  const baseUrl = '/Discounts'
  const { apiCall } = useApiCall()

  return {
    getDiscounts: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DiscountInterface[]>> => {
      const nextUrl = `/get-discount`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },



  }













}
