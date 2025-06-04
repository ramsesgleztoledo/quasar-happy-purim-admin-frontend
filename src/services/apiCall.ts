
import { AxiosError, AxiosHeaders } from "axios";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import type { ApiCallInterface } from "./api-interfaces";
import type { ExtraOptionsInterface } from './api-interfaces';
import type { authStateInterface } from "src/modules/auth/store/auth-store-interfaces";
import { fetchWithCache } from "./api-cache";



export const useApiCall = () => {

  const $q = useQuasar();
  const $router = useRouter();



  const errorAction = (status: number, extraOptions?: ExtraOptionsInterface | undefined | null) => {

    const options = {
      color: 'red',
      textColor: 'white',
      icon: 'error',
      message: '',

    }
    if (extraOptions?.errorMsg) {
      options.message = extraOptions.errorMsg
      $q.notify(options)
    }

    switch (status) {
      case 401:
        options.message = 'Unauthorized'
        if (!extraOptions?.dontShowToast) $q.notify(options)
        return $router.push({ name: 'LogOutPage' });

      case 500:
      case 404:
        options.message = 'Internal error, please try again later'
        if (!extraOptions?.dontShowToast) $q.notify(options)
        return extraOptions?.dontRedirect ? null : $router.push({ name: '500' });

      default:
        options.message = 'Internal fronted error, please try again later'
        if (!extraOptions?.dontShowToast) $q.notify(options)
        return extraOptions?.dontRedirect ? null : $router.push({ name: '500' });
    }
  };

  const apiCall = async <T>(options: ApiCallInterface): Promise<T | undefined | null> => {

    const method: string = options.method || 'GET';
    const responseType = options.responseType || 'json';
    const authState: authStateInterface | null = $q.localStorage.getItem('authState')

    const token = authState?.token?.token || ""

    const headers: AxiosHeaders = new AxiosHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    });

    const extraOptions = options.extraOptions;
    let data: T | undefined | null = undefined

    try {

      if (extraOptions?.loading) {
        $q.loading.show({
          message: extraOptions?.loading.message ? extraOptions?.loading.message : 'Loading ...',
          spinnerColor: extraOptions?.loading.spinnerColor ? extraOptions?.loading.spinnerColor : '#ef6982',
          messageColor: extraOptions?.loading.messageColor ? extraOptions?.loading.messageColor : '#ef6982',
        })
      }

      const key = options.url;
      const fetchFunction = async () => {
        return (await api({
          data: options.data,
          method,
          url: options.url,
          params: options.params,
          headers,
          responseType: responseType
        })).data
      }

      data = await fetchWithCache<T>(key, fetchFunction, extraOptions)

    } catch (error: AxiosError | unknown) {




      if (error instanceof AxiosError) {
        if (!extraOptions?.dontUseErrorAction)
          errorAction(error.status!, extraOptions)
      }
      else {
        if (!extraOptions?.dontUseErrorAction)
          errorAction(500.1, extraOptions)
      }

    }
    if (extraOptions?.loading) {
      $q.loading.hide()
    }

    return data;
  };

  return {
    apiCall,
    errorAction
  }

}







