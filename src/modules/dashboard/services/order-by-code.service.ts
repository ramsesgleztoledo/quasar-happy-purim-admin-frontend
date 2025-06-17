import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { OrderReceiptInterface, ItemDetailsInterface } from "../interfaces/order-interfaces";



export const useOrderByCodeService = () => {

  const baseUrl = '/Orders'
  const { apiCall } = useApiCall()

  return {

    getOrderReceiptByOrderId: async (orderId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderReceiptInterface>> => {

      const nextUrl = `/receipt/${orderId}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      })
    },
    getItemTableByItemId: async (itemId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ItemDetailsInterface[]>> => {

      const nextUrl = `/items/${itemId}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      }) 
    },



  }













}
