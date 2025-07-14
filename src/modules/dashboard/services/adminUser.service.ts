import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { AddUserFormInterface, AdminUserInterface, EditUserFormType } from "../interfaces/admin-user.interface";






export const useAdminUserService = () => {

  const baseUrl = '/AdminUser'
  const { apiCall } = useApiCall()

  return {
    getAllAdmins: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<AdminUserInterface[]>> => {
      const nextUrl = `/get-all-admins`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    addAdmin: async (data: AddUserFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<string>> => {
      const nextUrl = `/add-admin-user`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    editAdmin: async (data: EditUserFormType, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-admin-info`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    setNewPassword: async (data: {
      userId: number,
      password: string
    }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-admins-password`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },
    deleteUser: async (userId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/delete-admin/${userId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',

      })
    },



  }













}
