import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";

export type downloadEndPointType = (extraOptions?: ExtraOptionsInterface) => Promise<ApiCallResponseInterface<unknown>>


export interface ColorModeInterface {
  value: -1 | 0 | 1;
  icon: 'brightness_medium' | 'light_mode' | 'dark_mode'
}
export interface AppColorInterface {
  value: string;
  label: string;
}
