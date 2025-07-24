import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { RecordCCPaymentFormInterface, RecordCheckOrCreditPaymentFormInterface, RecordCheckPaymentFormInterface, UnPaidOrdersInterface } from "../interfaces/payment-interface";




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

    recordCheckOrCreditPayment: async (memberId: number, data: RecordCheckOrCreditPaymentFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/record-check-or-credit-payment`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },

    recordCheckPayment: async (memberId: number, data: RecordCheckPaymentFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/record-check-payment`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    recordCreditPayment: async (memberId: number, data: RecordCheckPaymentFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/record-credit-payment`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    recordCCPayment: async (memberId: number, data: RecordCCPaymentFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/record-cc-payment`;
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
