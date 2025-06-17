import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { BasketToBeShippedInterface } from "../interfaces/shipment-interfaces";






export const useShipmentService = () => {

  const baseUrl = '/Shipments'
  const { apiCall } = useApiCall()

  return {

    getBasketsToBeShipped: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketToBeShippedInterface[]>> => {
      const nextUrl = `/baskets-to-be-shipped`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    downloadBasketsToBeShippedCSV: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/baskets-to-be-shipped/export`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'text'
      })
    },


  }













}
