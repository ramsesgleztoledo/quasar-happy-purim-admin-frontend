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

  }













}
