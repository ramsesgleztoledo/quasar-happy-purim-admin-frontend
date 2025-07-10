import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AddToUnmergedTableFormInterface, GeneratePDFFormInterface, MailMergeTemplateInterface, MergedContentResponseInterface, QueueBulkEmailsFormInterface } from "../interfaces/mail-merge.interface";





export const useMailMergeService = () => {

  const baseUrl = '/MailMerge'
  const { apiCall } = useApiCall()

  return {

    getFormFields: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ fullName: string; email: string; }>> => {
      const nextUrl = `/admin-info-to-populate-email-fields`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getImages: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/get-images-urls-list`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getTemplates: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MailMergeTemplateInterface[]>> => {
      const nextUrl = `/email-templates`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getTokensByReportId: async (reportId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/get-merge-fields/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    getMergedContentByReportId: async (data: {
      reportId: number | string;
      emailOption: 'Primary' | 'Primary & Alternate';
      data: {
        template: string;
        memberIds: number[]
      }
    }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MergedContentResponseInterface>> => {
      const nextUrl = `/email-merge-content?reportId=${data.reportId}&emailOption=${data.emailOption}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
        , method: 'POST',
        data: data.data
      })
    },

    generatePDF: async (data: GeneratePDFFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/generate-pdf`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
        responseType: 'arraybuffer'
      })
    },

    queueBulkEmails: async (data: QueueBulkEmailsFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/queue-bulk-emails`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,

      })
    },
    addUnmergedEmailJobToTable: async (reportId: number | string, data: AddToUnmergedTableFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/add-unmerged-email-job-to-table/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,

      })
    },



  }













}
