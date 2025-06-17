import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { OrderArchiveInterface, OrderReceiptInterface, ItemDetailsInterface } from "../interfaces/order-interfaces";



export const useOrderArchiveService = () => {

  const baseUrl = '/Orders'
  const { apiCall } = useApiCall()

  return {
    getOrdersArchive: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderArchiveInterface[]>> => {

      const nextUrl = `/get-order-archive`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      }) || []
    },
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
      }) || []
    },



  }













}
