import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { FundraiserCoordinatorFormInterface, GiftBasketProgramFormInterface, OrganizationInformationFormInterface, OrganizationSettingsInterface } from "../interfaces/basic-settings.interfaces";
import { AxiosHeaders } from "axios";





export const useBasicSettingsService = () => {

  const baseUrl = '/OrgInfo'
  const { apiCall } = useApiCall()

  return {
    getSettings: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrganizationSettingsInterface>> => {
      const nextUrl = `/settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateOrganizationInformation: async (data: OrganizationInformationFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/update-shul-info`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    updateFundraiserCoordinator: async (data: FundraiserCoordinatorFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/update-admin-info`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    updatePricingSettings: async (data: GiftBasketProgramFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/update-pricing-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    getWelcomePage: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ html: string }>> => {
      const nextUrl = `/welcome-page-content`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateWelcomePage: async (html: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {

      const nextUrl = `/edit-welcome-page-content`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data: {
          html
        }
      })
    },
    uploadFile: async (file: File, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ fileName: string, url: string }>> => {

      const nextUrl = `/upload-file-to-welcome-page-content`;
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
    getFiles: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string[]>> => {
      const nextUrl = `/welcome-content-uploaded-files`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    deleteFile: async (name: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/delete-welcome-page-uploaded-file/${name}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE'
      })
    },
    getShowOrderByCode: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<boolean>> => {
      const nextUrl = `/show-create-order-by-code`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    canUploadList: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ canUpload: false }>> => {
      const nextUrl = `/can-upload-list`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
  }

}
