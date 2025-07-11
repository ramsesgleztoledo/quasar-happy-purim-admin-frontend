import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { LabelOptionInterface } from "../interfaces/label-ordersheet.interface";

export const useLabelsAndOrdersheetService = () => {

  const baseUrl = '/LabelsAndOrdersheet'
  const { apiCall } = useApiCall()

  return {
    getLabelOption: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<LabelOptionInterface[]>> => {

      const nextUrl = `/LabelOptions`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
      })
    },

    downloadOrderSheet: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/OrderSheet`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },
    downloadOrderSheetByCategory: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/OrderSheetByCategory`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },
    downloadNameLabels: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/NameLabels`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },
    downloadMailingLabels: async (labelType: 'Regular' | 'Alternate', extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/MailingLabels?labelType=${labelType}`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        responseType: 'arraybuffer',
      })
    },

  }













}
