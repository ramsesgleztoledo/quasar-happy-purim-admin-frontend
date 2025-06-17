import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { DonationInterface, TransactionsInterface } from "../interfaces/transaction-interfaces";





export const useTransactionService = () => {

  const baseUrl = '/Transaction'
  const { apiCall } = useApiCall()

  return {
    getTransactions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TransactionsInterface>> => {
      const nextUrl = `/get-transactions`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getDonations: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<DonationInterface[]>> => {
      const nextUrl = `/donations`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    downloadCharityCSV: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/donations/export`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        responseType: 'text'
      })
    },


  }













}
