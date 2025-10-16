import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { LocalDeliveryInterface } from "../interfaces/memberOrder-interfaces";



export const useLocalDeliveryService = () => {

  const baseUrl = '/LocalDelivery'
  const { apiCall } = useApiCall()

  return {
    getLocalDelivery: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<LocalDeliveryInterface[]>> => {

      const nextUrl = `/get-local-delivery`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


  }













}
