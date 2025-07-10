import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CustomReportInterface, RecipientDataFormInterface, RecipientDataInterface, ReportResponseInterface } from "../interfaces/report.interface";




export const useReportsService = () => {

  const baseUrl = '/Reports'
  const { apiCall } = useApiCall()

  return {
    getReportList: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ReportResponseInterface>> => {
      const nextUrl = `/Basic-and-Advanced/Get-Report-List`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getCustomReports: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CustomReportInterface[]>> => {
      const nextUrl = `/Custom-Reports/get-reports-list`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    downloadReportExcelByReportId: async (reportId: string | number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/Basic-and-Advanced/generate-excel/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },
    downloadCustomReportExcelByReportId: async (reportId: string | number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/Custom-Report/generate-excel/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },

    runSQLReportRecipientsByReportId: async (reportId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/Basic-and-Advanced/run-sql-for-report/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
      })
    },
    getReportRecipientsByReportId: async (data: RecipientDataFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<RecipientDataInterface>> => {
      const nextUrl = `/Basic-and-Advanced/display-report-data-and-filter/${data.id}`;
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
