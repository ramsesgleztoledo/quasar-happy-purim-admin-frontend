import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CustomReportInterface, RecipientDataFormInterface, RecipientDataInterface, ReportResponseInterface, SpecialReportInterface } from "../interfaces/report.interface";




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
    runSQLReportRecipientsByReportIdCustom: async (reportId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/Custom-Reports/run-sql-for-report/${reportId}`;
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
    getReportRecipientsByReportIdWithSQL: async (data: RecipientDataFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<RecipientDataInterface>> => {
      const nextUrl = `/Basic-and-Advanced/run-and-display-report/${data.id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    getReportRecipientsByReportIdCustom: async (reportId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<RecipientDataInterface>> => {
      const nextUrl = `/Custom-Reports/get-report-data-and-filter?reportId=${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,

      })
    },
    getReportRecipientsByReportIdCustomWithSQL: async (data: RecipientDataFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<RecipientDataInterface>> => {
      const nextUrl = `/Custom-Reports/run-and-get-report/${data.id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    getZipCodeFilters: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/Receiving-from-report/filter-by-zip-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getRouteCodeFilters: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/Receiving-from-report/filter-by-route-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getBasketSizeFilters: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/Receiving-from-report/filter-by-basket-size-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getDonateFilters: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/Receiving-from-report/filter-by-donate-basket-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getCustomSpecialReports: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<SpecialReportInterface[]>> => {
      const nextUrl = `/special-custom-reports`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getAdvancedSpecialReports: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<SpecialReportInterface[]>> => {
      const nextUrl = `/special-advanced-reports`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    downloadRouteReport: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/route-report`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },

  }













}
