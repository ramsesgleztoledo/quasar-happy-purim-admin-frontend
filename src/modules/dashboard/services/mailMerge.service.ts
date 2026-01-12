import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AddToUnmergedTableFormInterface, GeneratePDFFormInterface, MailMergeTemplateInterface, MergedContentPrintInterface, MergedContentResponseInterface, QueueBulkEmailsFormInterface } from "../interfaces/mail-merge.interface";
import type { TokenInterface } from "../interfaces/report.interface";





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
    getTokensByReportId: async (reportId: number | string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TokenInterface[]>> => {
      const nextUrl = `/get-merge-fields/${reportId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    getMergedContentByReportId: async (data: {
      reportId: number | string;
      emailOption: 'Primary' | 'primary_alternate';
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
    getMergedContentPrintByReportId: async (data: {
      reportId: number | string;
      data: {
        template: string;
        memberIds: number[]
      }
    }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MergedContentPrintInterface[]>> => {
      const nextUrl = `/print-merge-content?reportId=${data.reportId}`;
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

    queueBulkEmails: async (data: QueueBulkEmailsFormInterface & { timeZone?: string }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/queue-bulk-emails?timeZone=${data.timeZone ? data.timeZone : ''}&sendNow=${data.sendNow}`;
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

    getCustomTokensByReportId: async (id: string | number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TokenInterface[]>> => {
      const nextUrl = `/get-custom-merge-fields?id=${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

  }













}
