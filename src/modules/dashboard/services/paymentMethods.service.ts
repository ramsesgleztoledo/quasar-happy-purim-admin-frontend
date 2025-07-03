import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { PaymentMethodTypeInterface } from "../interfaces/memberOrder-interfaces";




export const usePaymentMethodsService = () => {

  const baseUrl = '/PaymentMethods'
  const { apiCall } = useApiCall()

  return {
    getPaymentMethods: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<PaymentMethodTypeInterface[]>> => {
      const nextUrl = `/get-payment-methods?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },



  }













}
