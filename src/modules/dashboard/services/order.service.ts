import type { ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { OrderArchiveInterface, OrderReceiptInterface, ItemDetailsInterface } from "../interfaces/order-interfaces";
import type { NoneType } from "./service-interfaces";


export const useOrderArchiveService = () => {

  const baseUrl = '/Orders'
  const { apiCall } = useApiCall()

  return {
    getOrdersArchive: async (extraOptions?: ExtraOptionsInterface): Promise<OrderArchiveInterface[]> => {

      const nextUrl = `/get-order-archive`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      }) || []
    },
    getOrderReceiptByOrderId: async (orderId: number, extraOptions?: ExtraOptionsInterface): Promise<OrderReceiptInterface | NoneType> => {

      const nextUrl = `/receipt/${orderId}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      })
    },
    getItemTableByItemId: async (itemId: number, extraOptions?: ExtraOptionsInterface): Promise<ItemDetailsInterface[]> => {

      const nextUrl = `/items/${itemId}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions
      }) || []
    },



  }













}
