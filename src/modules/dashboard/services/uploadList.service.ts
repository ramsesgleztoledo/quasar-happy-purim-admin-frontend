import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import { AxiosHeaders } from "axios";
import type { BackupUploadFormInterface, DataSummaryResponseInterface, DestinationKeyInterface, DetailedKeyInterface, FieldOptionInterface, ProcessAndMatchResponseInterface, UpdateAndValidateFormInterface, UploadFileResponseInterface } from "../interfaces/upload-list.interfaces";






export const useUploadListService = () => {

  const baseUrl = '/UploadList'
  const { apiCall } = useApiCall()

  return {
    uploadMemberList: async (file: File, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<UploadFileResponseInterface>> => {

      const nextUrl = `/upload-excel`;
      const url = `${baseUrl}${nextUrl}`;

      const formData = new FormData();
      formData.append('file', file);

      const headers = AxiosHeaders.from({
        'Content-Type': 'multipart/form-data',
      });

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data: formData,
        headers
      })
    },
    processAndMatch: async (data: { filePath: string; sheetName: string; }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ProcessAndMatchResponseInterface>> => {

      const nextUrl = `/process-and-match`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
      })
    },
    getFieldOptions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<FieldOptionInterface[]>> => {
      const nextUrl = `/get-field-options`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data: {
          selectedMapID: "<Ignore>",
          allSelectedMapIDs: [
            "<Ignore>"
          ]
        },
      })
    },
    updateAndValidate: async (data: UpdateAndValidateFormInterface[], extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-and-validate`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },

    checkMatchSrcDestKey: async (data: { sourceKey: string; destinationKey: string; }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ success: false, message: string }>> => {
      const nextUrl = `/check-match-src-dest-key`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },

    saveSelectionOptions: async (data: { add: boolean, update: boolean, delete: boolean }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/save-selection-options`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },

    compareDataGetSummary: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DataSummaryResponseInterface>> => {
      const nextUrl = `/compare-data-get-summary`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
      })
    },


    getDestinationKeys: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DestinationKeyInterface[]>> => {
      const nextUrl = `/destination-keys`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


    backupAndUpload: async (data: BackupUploadFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/backup-and-process-data`;
      const url = `${baseUrl}${nextUrl}`;

      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data,
      })
    },
    getDetailedChanges: async (memberKey: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DetailedKeyInterface[]>> => {
      const nextUrl = `/get-detailed-changes?memberKey=${memberKey}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
      })
    },
    revertChanges: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/revert-changes`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
      })
    },




  }













}
