import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AddDraftFormInterface, DraftInterface } from "../interfaces/draft.interfaces";




export const useDraftsService = () => {

  const baseUrl = '/Drafts'
  const { apiCall } = useApiCall()

  return {
    getDrafts: async (startIndex: number, pageSize: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DraftInterface[]>> => {
      const nextUrl = `?startIndex=${startIndex}&pageSize=${pageSize}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,

      })
    },
    deleteDrafts: async (id: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE'
      })
    },
    
    addDrafts: async (data: AddDraftFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DraftInterface>> => {
      const nextUrl = `/add-draft`;
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
