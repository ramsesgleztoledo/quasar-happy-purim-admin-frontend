
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { DashboardStateInterface } from './dashboard-store-interfaces';
import type { FundraiserStatusInterface, FundraiserTotalsInterface, MembersOrdersGraphInterface, MemberSummaryInterface, OrderGraphInterface, ParticipationInfoGraphInterface, ParticipationRateInterface, PercentageRunningTotalInterface, TopTransactionsInterface } from 'src/modules/dashboard/interfaces/dashboard-interfaces';
import type { NoneType } from '../../services/service-interfaces';



const initialState: DashboardStateInterface = {
  orderTotalGraph: [],
  membersOrdersGraph: [],
  participationInfoGraph: undefined,
  fundraiserStatus: undefined,
  fundraiserTotals: undefined,
  participationRate: undefined,
  topTransactions: [],
  totalsRaised: undefined,
  basketSizeBreakdown: [],
  basketInfo: [],
  orderItems: [],
  memberSummary: undefined,
  membersLogged: undefined,
  showCreateOrderByCode: false,
  categories: [],
  percentageRunningTotal: undefined,
  customShippingOptions: [],
}

export const useDashboardStore = defineStore('dashBoardStore', {
  state: (): DashboardStateInterface => ({
    ...initialState
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2,
  },

  actions: {
    setMemberSummary(memberSummary: MemberSummaryInterface | NoneType) {
      this.memberSummary = memberSummary
    },
    setShowCreateOrderByCode(showCreateOrderByCode: boolean) {
      this.showCreateOrderByCode = showCreateOrderByCode
    },
    setFundraiserStatus(fundraiserStatus: FundraiserStatusInterface | NoneType) {
      this.fundraiserStatus = fundraiserStatus
    },
    setFundraiserTotals(fundraiserTotals: FundraiserTotalsInterface | NoneType) {
      this.fundraiserTotals = fundraiserTotals
    },
    setParticipationRate(participationRate: ParticipationRateInterface | NoneType) {
      this.participationRate = participationRate
    },
    setTopTransactions(topTransactions: TopTransactionsInterface[]) {
      this.topTransactions = topTransactions
    },
    setPercentageRunningTotal(percentageRunningTotal: PercentageRunningTotalInterface | NoneType) {
      this.percentageRunningTotal = percentageRunningTotal
    },
    setOrderTotalGraph(orderTotalGraph: OrderGraphInterface[]) {
      this.orderTotalGraph = orderTotalGraph
    },
    setMembersOrdersGraph(membersOrdersGraph: MembersOrdersGraphInterface[]) {
      this.membersOrdersGraph = membersOrdersGraph
    },
    setParticipationInfoGraph(participationInfoGraph: ParticipationInfoGraphInterface | NoneType) {
      this.participationInfoGraph = participationInfoGraph
    },

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
