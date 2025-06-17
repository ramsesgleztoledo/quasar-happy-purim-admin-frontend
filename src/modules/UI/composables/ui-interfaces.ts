import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";

export type downloadEndPointType = (extraOptions?: ExtraOptionsInterface) => Promise<ApiCallResponseInterface<unknown>>
