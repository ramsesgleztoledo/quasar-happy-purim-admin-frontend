/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useDashboardStore } from "../store/dashboardStore";
import { useDashboardService } from "src/services/dashboard.service";
import { useQuasar } from "quasar";
import type { DashboardStateInterface } from "../store/dashboard-store-interfaces";

export const useDashboard = () => {


  const $dStore = useDashboardStore();
  const $q = useQuasar()

  const { getBasketInfo, getBasketSizeBreakdown, getFundraiserStatus, getFundraiserTotals, getMembersOrdersGraph, getMemberSummary, getOrderItems, getOrderTotalGraph, getParticipationInfoGraph, getParticipationRate, getTopTransactions, getTotalsRaised } = useDashboardService()


  return {
    state: computed(() => $dStore.$state),
    reset: () => $dStore.$reset(),

    async loadStartedData() {
      const promises: Promise<any>[] =
        [
          getOrderTotalGraph(),
          getMembersOrdersGraph(),
          getParticipationInfoGraph(),
          getFundraiserStatus(),
          getFundraiserTotals(),
          getParticipationRate(),
          getTopTransactions(),
          getTotalsRaised(),
          getBasketSizeBreakdown(),
          getBasketInfo(),
          getOrderItems(),
          getMemberSummary(),
        ]

      const [
        orderTotalGraph,
        membersOrdersGraph,
        participationInfoGraph,
        fundraiserStatus,
        fundraiserTotals,
        participationRate,
        topTransactions,
        totalsRaised,
        basketSizeBreakdown,
        basketInfo,
        orderItems,
        memberSummary,
      ]: any = await Promise.all(promises)

      const dashboardState: DashboardStateInterface = {
        orderTotalGraph,
        membersOrdersGraph,
        participationInfoGraph,
        fundraiserStatus,
        fundraiserTotals,
        participationRate,
        topTransactions,
        totalsRaised,
        basketSizeBreakdown,
        basketInfo,
        orderItems,
        memberSummary,
      }

      $dStore.$patch(dashboardState)


    },
    async getMemberSummary() {
      try {
        // console.log('====== UPDATING INFORMATION ======');
        const memberSummary = await getMemberSummary({
          dontRedirect: true,
          dontShowToast: true
        })
        if (memberSummary)
          $dStore.setMemberSummary(memberSummary);
      } catch (error) {
        console.error(error);

        $q.notify({
          color: 'blue',
          textColor: 'white',
          icon: 'error',
          message: `we can't update the member logged at this moment`,
        })
      }

    },


  }
};
