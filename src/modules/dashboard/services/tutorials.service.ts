import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { TutorialInterface } from "../interfaces/tutorials.interface";






export const useTutorialService = () => {

  const baseUrl = '/Tutorials'
  const { apiCall } = useApiCall()

  return {
    getTutorials: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TutorialInterface[]>> => {
      return await apiCall({
        url: baseUrl,
        extraOptions
      })
    },
  }













}
