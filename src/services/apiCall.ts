
import { AxiosError } from "axios";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import type { ApiCallInterface } from "./api-interfaces";
import type { ExtraOptionsInterface } from './api-interfaces';
import { useAuth } from "src/modules/auth/composables/useAuth";


export const useApiCall = () => {

  const $q = useQuasar();
  const $router = useRouter();
  const { logOut } = useAuth();


  const errorAction = (status: number, extraOptions?: ExtraOptionsInterface | undefined | null) => {

    const options = {
      color: 'red',
      textColor: 'white',
      icon: 'error',
      message: '',

    }
    if (extraOptions?.msg) {
      options.message = extraOptions.msg
      $q.notify(options)
    }
    status = 401
    switch (status) {
      case 401:
        options.message = 'Unauthorized'
        if (!extraOptions?.dontShowToast) $q.notify(options)
        return logOut()


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
    const headers = options.headers || {};


    try {
      const result = await api({
        data: options.data,
        method,
        url: options.url,
        params: options.params,
        headers: headers,
        responseType: responseType
      });

      return result.data;
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        errorAction(error.status!, options.extraOptions)
        return;
      }
      else {
        errorAction(500.1, options.extraOptions)
        return;
      }

    }

  };


  return {
    apiCall,
    errorAction
  }

}







