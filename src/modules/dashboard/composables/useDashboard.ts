/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useDashboardStore } from "../store/dashboardStore/dashboardStore";
import { useDashboardService } from "src/modules/dashboard/services/dashboard.service";
import { useQuasar } from "quasar";
import type { DashboardStateInterface } from "../store/dashboardStore/dashboard-store-interfaces";

export const useDashboard = () => {


  const $dStore = useDashboardStore();
  const $q = useQuasar()

  const { getBasketInfo, getBasketSizeBreakdown, getFundraiserStatus, getFundraiserTotals, getMembersOrdersGraph, getMemberSummary, getOrderItems, getOrderTotalGraph, getParticipationInfoGraph, getParticipationRate, getTopTransactions, getTotalsRaised } = useDashboardService()


  return {
    dashboardState: computed(() => $dStore.$state),
    reset: () => $dStore.$reset(),

    async loadStartedData() {
      $q.loading.show({
        message: 'Loading ...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })

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

      $q.loading.hide()
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
