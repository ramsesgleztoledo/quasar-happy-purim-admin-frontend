import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { BasketsInCartResponseInterface } from "../interfaces/create-order-by-code.interface";






export const useCreateOrderByCodeService = () => {

  const baseUrl = '/CreateOrderByCode'
  const { apiCall } = useApiCall()

  return {

    getOrdersByCode: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketsInCartResponseInterface>> => {
      const nextUrl = `/${memberId}/baskets-in-cart`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    addOrdersByCode: async (memberId: number, data: { receiverMisc: string | number }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/add-basket`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    deleteOrdersByCode: async (memberId: number, receiverId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${memberId}/basket?receiverId=${receiverId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE',
      })
    },



  }













}
