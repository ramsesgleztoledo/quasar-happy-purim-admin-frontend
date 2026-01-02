import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { GreetingsRecipientInterface, UpdateGreetingsRecipientType } from "../interfaces/memberOrder-interfaces";





export const useGreetingsService = () => {

  const baseUrl = '/Greetings'
  const { apiCall } = useApiCall()

  return {
    getRecipientsByMemberId: async (memberId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<GreetingsRecipientInterface[]>> => {
      const nextUrl = `/get-recipients/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateRecipientsByMemberId: async (memberId: number | string, updates: UpdateGreetingsRecipientType[], extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<GreetingsRecipientInterface[]>> => {
      const nextUrl = `/update-greetings/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data: {
          updates
        }
      })
    },

    deleteRecipientsByMemberId: async (memberId: number | string, rowId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<GreetingsRecipientInterface[]>> => {
      const nextUrl = `/delete-greeting/${memberId}/${rowId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE'
      })
    },



  }













}
