import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { ReportFunctionsInterface } from "../interfaces/report-functions.interface";





export const useReportFunctionsService = () => {

  const baseUrl = '/ReportFunctions'
  const { apiCall } = useApiCall()

  return {
    getReportFunctions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ReportFunctionsInterface[]>> => {

      const url = `${baseUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    downloadFunctionReportById: async (id: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/generate-excel/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },



  }













}
