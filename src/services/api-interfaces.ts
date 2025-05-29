import type { AxiosRequestHeaders, ResponseType } from "axios";

export interface ExtraOptionsInterface {
  dontRedirect?: boolean | undefined | null;
  dontShowToast?: boolean | undefined | null;
  msg?: string | undefined | null;
}

export type AxiosMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';


export interface ApiCallInterface {
  url: string;
  method?: AxiosMethod,
  data?: unknown;
  headers?: AxiosRequestHeaders;
  params?: Record<string, unknown>;
  responseType?: ResponseType;
  extraOptions?: ExtraOptionsInterface | undefined | null;
}
