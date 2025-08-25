/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestHeaders, ResponseType } from "axios";

export interface ExtraOptionsInterface {
  dontRedirect?: boolean | undefined | null;
  dontShowToast?: boolean | undefined | null;
  goBackIn400Error?: boolean | undefined | null;
  dontUseErrorAction?: boolean | undefined | null;
  errorMsg?: string | undefined | null;
  loading?: {
    message?: string | undefined | null;
    spinnerColor?: string | undefined | null;
    messageColor?: string | undefined | null;
  }
  useCache?: boolean | undefined | null;
  ttl?: number | undefined | null;
  useRespAsError?: boolean | undefined | null;
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

export interface CacheItemInterface {
  key: string;
  data: any;
  timestamp: number;
}


export interface ApiCallResponseInterface<T> {
  code: number;
  ok: boolean;
  data: T
}

export interface DoorManStatusInterface {
  showKJRow: boolean;
  rbl24HourSelectedIndex: number;
}


export interface MembershipStatusInterface {
  visible: boolean;
  checkedStatus: boolean;
}



// export type ApiCallResponseInterface<T, E = unknown> =
//   | { code: number; ok: true; data: T }
//   | { code: number; ok: false; data: E };
