
import type {
  OrderGraphInterface,
  MembersOrdersGraphInterface,
  ParticipationInfoGraphInterface,
  FundraiserStatusInterface,
  FundraiserTotalsInterface,
  ParticipationRateInterface,
  TopTransactionsInterface,
  TotalsRaisedInterface,
  BasketSizeBreakdownInterface,
  BasketInfoInterface,
  OrderItemsInterface,
  MemberSummaryInterface
} from "src/modules/dashboard/interfaces/dashboard-interfaces";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";


export const useDashboardService = () => {

  const baseUrl = '/dashboard'
  const { apiCall } = useApiCall()

  return {
    getOrderTotalGraph: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderGraphInterface[]>> => {

      const nextUrl = '/order-totals-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },
    getMembersOrdersGraph: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MembersOrdersGraphInterface[]>> => {

      const nextUrl = '/members-orders-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getParticipationInfoGraph: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ParticipationInfoGraphInterface>> => {

      const nextUrl = '/participation-info-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getFundraiserStatus: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<FundraiserStatusInterface>> => {

      const nextUrl = '/fundraiser-status';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },


    getFundraiserTotals: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<FundraiserTotalsInterface>> => {

      const nextUrl = '/fundraiser-totals';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getParticipationRate: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ParticipationRateInterface>> => {

      const nextUrl = '/participation-rate';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getTopTransactions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TopTransactionsInterface[]>> => {

      const nextUrl = '/top-transactions';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getTotalsRaised: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<TotalsRaisedInterface>> => {

      const nextUrl = '/totals-raised';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getBasketSizeBreakdown: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketSizeBreakdownInterface[]>> => {

      const nextUrl = '/basket-size-breakdown';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getBasketInfo: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<BasketInfoInterface[]>> => {

      const nextUrl = '/baskets';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getOrderItems: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderItemsInterface[]>> => {

      const nextUrl = '/order-items';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getMemberSummary: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberSummaryInterface>> => {

      const nextUrl = '/member-summary';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
  }













}
