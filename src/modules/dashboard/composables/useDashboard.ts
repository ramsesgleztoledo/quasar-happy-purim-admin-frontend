/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useDashboardStore } from "../store/dashboardStore/dashboardStore";
import { useDashboardService } from "src/modules/dashboard/services/dashboard.service";
import { useQuasar } from "quasar";
import type { BasketInfoInterface, BasketSizeBreakdownInterface, FundraiserStatusInterface, FundraiserTotalsInterface, MembersOrdersGraphInterface, MemberSummaryInterface, OrderGraphInterface, OrderItemsInterface, ParticipationInfoGraphInterface, ParticipationRateInterface, TopTransactionsInterface, TotalsRaisedInterface } from "../interfaces/dashboard-interfaces";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";

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

      const promises: [
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
      ] =
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
      ]:
        [
          ApiCallResponseInterface<OrderGraphInterface[]>,
          ApiCallResponseInterface<MembersOrdersGraphInterface[]>,
          ApiCallResponseInterface<ParticipationInfoGraphInterface>,
          ApiCallResponseInterface<FundraiserStatusInterface>,
          ApiCallResponseInterface<FundraiserTotalsInterface>,
          ApiCallResponseInterface<ParticipationRateInterface>,
          ApiCallResponseInterface<TopTransactionsInterface[]>,
          ApiCallResponseInterface<TotalsRaisedInterface>,
          ApiCallResponseInterface<BasketSizeBreakdownInterface[]>,
          ApiCallResponseInterface<BasketInfoInterface[]>,
          ApiCallResponseInterface<OrderItemsInterface[]>,
          ApiCallResponseInterface<MemberSummaryInterface>,

        ]
        = await Promise.all(promises)



      $dStore.$patch({
        orderTotalGraph: orderTotalGraph.ok ? orderTotalGraph.data : [],
        membersOrdersGraph: membersOrdersGraph.ok ? membersOrdersGraph.data : [],
        participationInfoGraph: participationInfoGraph.ok ? participationInfoGraph.data : undefined,
        fundraiserStatus: fundraiserStatus.ok ? fundraiserStatus.data : undefined,
        fundraiserTotals: fundraiserTotals.ok ? fundraiserTotals.data : undefined,
        participationRate: participationRate.ok ? participationRate.data : undefined,
        topTransactions: topTransactions.ok ? topTransactions.data : [],
        totalsRaised: totalsRaised.ok ? totalsRaised.data : undefined,
        basketSizeBreakdown: basketSizeBreakdown.ok ? basketSizeBreakdown.data : [],
        basketInfo: basketInfo.ok ? basketInfo.data : [],
        orderItems: orderItems.ok ? orderItems.data : [],
        memberSummary: memberSummary.ok ? memberSummary.data : undefined,
      })

      $q.loading.hide()
    },
    async getMemberSummary() {
      try {
        // console.log('====== UPDATING INFORMATION ======');
        const memberSummary = await getMemberSummary({
          dontRedirect: true,
          dontShowToast: true
        })
        $dStore.setMemberSummary(memberSummary.ok ? memberSummary.data : undefined);
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
