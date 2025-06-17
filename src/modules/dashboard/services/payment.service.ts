import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { UnPaidOrdersInterface } from "../interfaces/payment-interface";




export const usePaymentService = () => {

  const baseUrl = '/Payments'
  const { apiCall } = useApiCall()

  return {

    getUnPaidOrdersByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<UnPaidOrdersInterface>> => {

      const nextUrl = `/${memberId}/get-unpaid-orders`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


  }













}
