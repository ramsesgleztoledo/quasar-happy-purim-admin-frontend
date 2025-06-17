/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError, AxiosHeaders } from "axios";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import type { ApiCallInterface, ApiCallResponseInterface } from "./api-interfaces";
import type { ExtraOptionsInterface, CacheItemInterface } from './api-interfaces';
import type { authStateInterface } from "src/modules/auth/store/auth-store-interfaces";
import Dexie, { type Table } from 'dexie';




export const useApiCall = () => {

  const $q = useQuasar();
  const $router = useRouter();

  const db = new Dexie('CacheDB');

  db.version(1).stores({
    cache: 'key, timestamp',
  });

  const cache: Table<CacheItemInterface, string> = db.table('cache');



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

  const saveInCache = async (key: string, data: any) => {
    const timestamp = Date.now();
    await cache.put({ key, data, timestamp });
  };

  const fetchWithCache = async <T>(
    key: string,
    fetchFunction: () => Promise<T>,
    extraOptions?: ExtraOptionsInterface | undefined | null)
    : Promise<T> => {

    try {
      const ttl = (extraOptions?.ttl ? extraOptions?.ttl : 20) * 60 * 1000;
      const cached = await cache.get(key);

      const now = Date.now();

      if (
        extraOptions?.useCache &&
        cached &&
        (now - cached.timestamp) < ttl
      ) {
        const cachedData: T = cached.data

        return cachedData;
      }

      const data: T = await fetchFunction()
      await saveInCache(key, data)

      return data
    }

    catch (error) {
      console.error(error);
      throw error
    }
  }



  const apiCall = async <T>(options: ApiCallInterface): Promise<ApiCallResponseInterface<T>> => {

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
    try {

      if (extraOptions?.loading) {
        $q.loading.show({
          message: extraOptions?.loading.message ? extraOptions?.loading.message : 'Loading ...',
          spinnerColor: extraOptions?.loading.spinnerColor ? extraOptions?.loading.spinnerColor : '#ef6982',
          messageColor: extraOptions?.loading.messageColor ? extraOptions?.loading.messageColor : '#ef6982',
        })
      }

      const key = `${options.url}:::${token}`;
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

      const dataValue = await fetchWithCache<T>(key, fetchFunction, extraOptions)
      if (extraOptions?.loading) {
        $q.loading.hide()
      }
      const data: ApiCallResponseInterface<T> = {
        code: 200,
        ok: true,
        data: dataValue
      }

      return data

    } catch (error: AxiosError | any) {


      if (error instanceof AxiosError) {
        if (!extraOptions?.dontUseErrorAction)
          errorAction(error.status!, extraOptions)
      }


      else {
        if (!extraOptions?.dontUseErrorAction)
          errorAction(500.1, extraOptions)
      }




      if (extraOptions?.loading) {
        $q.loading.hide()
      }

      const data: ApiCallResponseInterface<T> = {
        code: error.status!,
        ok: false,
        data: error.response?.data || error.message
      }

      return data;
    }
  };

  const clearCache = async () => {
    return await cache.clear()
  };


  return {
    apiCall,
    errorAction,
    saveInCache,
    fetchWithCache,
    clearCache,
  }

}







