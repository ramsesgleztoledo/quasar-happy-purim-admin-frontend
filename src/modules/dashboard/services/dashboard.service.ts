
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
} from "src/modules/dashboard/interfaces/dashboard.interface";
import type { ExtraOptionsInterface } from "../../../services/api-interfaces";
import { useApiCall } from "../../../services/apiCall";

export const useDashboardService = () => {

  const baseUrl = '/dashboard'
  const { apiCall } = useApiCall()

  return {
    getOrderTotalGraph: async (extraOptions?: ExtraOptionsInterface): Promise<OrderGraphInterface[]> => {

      const nextUrl = '/order-totals-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },
    getMembersOrdersGraph: async (extraOptions?: ExtraOptionsInterface): Promise<MembersOrdersGraphInterface[]> => {

      const nextUrl = '/members-orders-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getParticipationInfoGraph: async (extraOptions?: ExtraOptionsInterface): Promise<ParticipationInfoGraphInterface | undefined | null> => {

      const nextUrl = '/participation-info-graph';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getFundraiserStatus: async (extraOptions?: ExtraOptionsInterface): Promise<FundraiserStatusInterface | undefined | null> => {

      const nextUrl = '/fundraiser-status';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },


    getFundraiserTotals: async (extraOptions?: ExtraOptionsInterface): Promise<FundraiserTotalsInterface | undefined | null> => {

      const nextUrl = '/fundraiser-totals';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
    getParticipationRate: async (extraOptions?: ExtraOptionsInterface): Promise<ParticipationRateInterface | undefined | null> => {

      const nextUrl = '/participation-rate';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getTopTransactions: async (extraOptions?: ExtraOptionsInterface): Promise<TopTransactionsInterface[]> => {

      const nextUrl = '/top-transactions';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getTotalsRaised: async (extraOptions?: ExtraOptionsInterface): Promise<TotalsRaisedInterface | undefined | null> => {

      const nextUrl = '/totals-raised';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },

    getBasketSizeBreakdown: async (extraOptions?: ExtraOptionsInterface): Promise<BasketSizeBreakdownInterface[]> => {

      const nextUrl = '/basket-size-breakdown';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getBasketInfo: async (extraOptions?: ExtraOptionsInterface): Promise<BasketInfoInterface[]> => {

      const nextUrl = '/baskets';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getOrderItems: async (extraOptions?: ExtraOptionsInterface): Promise<OrderItemsInterface[]> => {

      const nextUrl = '/order-items';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      }) || []
    },

    getMemberSummary: async (extraOptions?: ExtraOptionsInterface): Promise<MemberSummaryInterface | undefined | null> => {

      const nextUrl = '/member-summary';
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
      })
    },
  }













}
