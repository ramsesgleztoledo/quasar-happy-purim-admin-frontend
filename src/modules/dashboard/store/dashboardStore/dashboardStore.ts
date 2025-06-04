
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { DashboardStateInterface } from './dashboard-store-interfaces';
import type { MemberSummaryInterface } from 'src/modules/dashboard/interfaces/dashboard.interface';



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
}

export const useDashboardStore = defineStore('dashBoardStore', {
  state: (): DashboardStateInterface => ({
    ...initialState
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2,
  },

  actions: {
    setMemberSummary(memberSummary: MemberSummaryInterface) {
      this.memberSummary = memberSummary
    },

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
