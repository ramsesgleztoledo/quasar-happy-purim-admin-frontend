
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { DashboardStateInterface } from './dashboard-store-interfaces';
import type { MemberSummaryInterface } from 'src/modules/dashboard/interfaces/dashboard-interfaces';
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
  categories: []
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

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
