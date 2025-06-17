/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";
import type { LoginInterface, LoginUrlInterface } from "../interfaces/auth.interfaces";



export const useAuthService = () => {

  const baseUrl = '/Auth'
  const { apiCall } = useApiCall()

  const loinFunctions: any = {
  }

  if (process.env.DEV)
    loinFunctions.generateLoginUrl = async (guid: string, extraOptions?: ExtraOptionsInterface): Promise<string> => {
      const nextUrl = '/generate-token';
      const url = `${baseUrl}${nextUrl}`;
      const data = await apiCall<LoginUrlInterface>({
        url,
        extraOptions,
        method: 'POST',
        data: {
          guid
        }
      });
      let finalData = ""
      if (data.ok && data.data)
        finalData = `${window.location.protocol}//${window.location.hostname}/authenticate?token=${data.data.token}`

      return finalData
    }

  return {
    login: async (encryptedToken: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<LoginInterface>> => {
      const nextUrl = '/login';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data: {
          encryptedToken
        }
      })
    },

    // ...loinFunctions,
  }













}
