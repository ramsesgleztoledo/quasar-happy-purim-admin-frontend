
import { computed } from "vue";
import { useDashboardStore } from "../store/dashboardStore/dashboardStore";
import { useDashboardService } from "src/modules/dashboard/services/dashboard.service";
import { useQuasar } from "quasar";
import type { BasketInfoInterface, BasketSizeBreakdownInterface, FundraiserStatusInterface, FundraiserTotalsInterface, MembersOrdersGraphInterface, MemberSummaryInterface, OrderGraphInterface, OrderItemsInterface, ParticipationInfoGraphInterface, ParticipationRateInterface, PercentageRunningTotalInterface, TopTransactionsInterface, TotalsRaisedInterface } from "../interfaces/dashboard-interfaces";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useMemberService } from "../services/member.service";
import type { MembersLoggedInterface } from "../interfaces/member-interfaces";
import { useCategoryService } from "../services/category.service";
import type { ShulCategoryInterface } from "../interfaces/category-interfaces";
import { useBasicSettingsService } from "../services/basic-settings.service";

export const useDashboard = () => {


  const $dStore = useDashboardStore();
  const $q = useQuasar()

  const { getBasketInfo, getBasketSizeBreakdown, getFundraiserStatus, getFundraiserTotals, getMembersOrdersGraph, getMemberSummary, getOrderItems, getOrderTotalGraph, getParticipationInfoGraph, getParticipationRate, getTopTransactions, getTotalsRaised, getPercentageOfRunningTotal } = useDashboardService()
  const { getMembersLogged } = useMemberService()
  const { getShulCategories } = useCategoryService()
  const { getShowOrderByCode } = useBasicSettingsService()

  return {
    dashboardState: computed(() => $dStore.$state),
    reset: () => $dStore.$reset(),

    async loadStartedData() {
      $q.loading.show({
        message: 'Loading ...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })

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
        membersLogged,
        categories,
        showCreateOrderByCode,
        percentageRunningTotal
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
          ApiCallResponseInterface<MembersLoggedInterface>,
          ApiCallResponseInterface<ShulCategoryInterface[]>,
          ApiCallResponseInterface<boolean>,
          ApiCallResponseInterface<PercentageRunningTotalInterface>,

        ]
        = await Promise.all([
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
          getMembersLogged(),
          getShulCategories(),
          getShowOrderByCode(),
          getPercentageOfRunningTotal(),
        ])



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
        membersLogged: membersLogged.ok ? membersLogged.data : undefined,
        categories: categories.ok ? categories.data : [],
        showCreateOrderByCode: showCreateOrderByCode.ok ? !!showCreateOrderByCode.data : false,
        percentageRunningTotal: percentageRunningTotal.ok ? percentageRunningTotal.data : undefined,
      })

      $q.loading.hide()
    },
    async getMemberSummary() {
      try {
        // console.log('====== UPDATING INFORMATION ======');
        const resp = await Promise.all([
          getMemberSummary({
            dontRedirect: true,
            dontShowToast: true
          }),
          getFundraiserTotals({
            dontRedirect: true,
            dontShowToast: true
          }),
          getParticipationRate({
            dontRedirect: true,
            dontShowToast: true
          }),])



        $dStore.setMemberSummary(resp[0].ok ? resp[0].data : undefined);
        $dStore.setFundraiserTotals(resp[1].ok ? resp[1].data : undefined)
        $dStore.setParticipationRate(resp[2].ok ? resp[2].data : undefined)

      } catch (error) {
        console.error(error);

        $q.notify({
          color: 'blue',
          textColor: 'white',
          icon: 'error',
          message: `We can't update the member logged at this moment`,
        })
      }
    },

    async updateDataMountedDashboard() {
      const resp = await Promise.all([
        getMemberSummary({
          dontRedirect: true,
          dontShowToast: true
        }),
        getFundraiserTotals({
          dontRedirect: true,
          dontShowToast: true
        }),
        getParticipationRate({
          dontRedirect: true,
          dontShowToast: true
        }),

        getOrderTotalGraph({
          dontRedirect: true,
          dontShowToast: true
        }),
        getMembersOrdersGraph({
          dontRedirect: true,
          dontShowToast: true
        }),
        getParticipationInfoGraph({
          dontRedirect: true,
          dontShowToast: true
        }),
        getFundraiserStatus({
          dontRedirect: true,
          dontShowToast: true
        }),
        getTopTransactions({
          dontRedirect: true,
          dontShowToast: true
        }),
        getTotalsRaised({
          dontRedirect: true,
          dontShowToast: true
        }),
        getBasketSizeBreakdown({
          dontRedirect: true,
          dontShowToast: true
        }),
        getBasketInfo({
          dontRedirect: true,
          dontShowToast: true
        }),
        getOrderItems({
          dontRedirect: true,
          dontShowToast: true
        }),
        getMembersLogged({
          dontRedirect: true,
          dontShowToast: true
        }),
        getPercentageOfRunningTotal({
          dontRedirect: true,
          dontShowToast: true
        }),

      ])

      $dStore.$patch({
        memberSummary: resp[0].ok ? resp[0].data : undefined,
        fundraiserTotals: resp[1].ok ? resp[1].data : undefined,
        participationRate: resp[2].ok ? resp[2].data : undefined,
        orderTotalGraph: resp[3].ok ? resp[3].data : [],
        membersOrdersGraph: resp[4].ok ? resp[4].data : [],
        participationInfoGraph: resp[5].ok ? resp[5].data : undefined,
        fundraiserStatus: resp[6].ok ? resp[6].data : undefined,
        topTransactions: resp[7].ok ? resp[7].data : [],
        totalsRaised: resp[8].ok ? resp[8].data : undefined,
        basketSizeBreakdown: resp[9].ok ? resp[9].data : [],
        basketInfo: resp[10].ok ? resp[10].data : [],
        orderItems: resp[11].ok ? resp[11].data : [],
        membersLogged: resp[12].ok ? resp[12].data : undefined,
        percentageRunningTotal: resp[13].ok ? resp[13].data : undefined,
      })
    },


  }
};
