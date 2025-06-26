import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { MemberOrderItemsInterface } from "../interfaces/memberOrder-interfaces";




export const useOrderItemService = () => {

  const baseUrl = '/OrderItems'
  const { apiCall } = useApiCall()

  return {
    getOrderItemsByMemberGuid: async (memberGuid: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberOrderItemsInterface[]>> => {
      const nextUrl = `/get-order-items?memberGuid=${memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    addOrRemoveOrderItemsByMemberGuid: async (value: { memberGuid: string, data: MemberOrderItemsInterface, isAdd: boolean }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberOrderItemsInterface[]>> => {
      const nextUrl = `/update-order-items/${value.isAdd ? 'add' : 'delete'}?memberGuid=${value.memberGuid}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data: value.data
      })
    },



  }













}
