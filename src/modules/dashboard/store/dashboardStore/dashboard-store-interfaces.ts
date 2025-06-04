import type { BasketInfoInterface, BasketSizeBreakdownInterface, FundraiserStatusInterface, FundraiserTotalsInterface, MembersOrdersGraphInterface, MemberSummaryInterface, OrderGraphInterface, OrderItemsInterface, ParticipationInfoGraphInterface, ParticipationRateInterface, TopTransactionsInterface, TotalsRaisedInterface } from 'src/modules/dashboard/interfaces/dashboard.interface';

export interface DashboardStateInterface {
  orderTotalGraph: OrderGraphInterface[];
  membersOrdersGraph: MembersOrdersGraphInterface[];
  participationInfoGraph?: ParticipationInfoGraphInterface | undefined;
  fundraiserStatus?: FundraiserStatusInterface | undefined;
  fundraiserTotals?: FundraiserTotalsInterface | undefined;
  participationRate?: ParticipationRateInterface | undefined;
  topTransactions: TopTransactionsInterface[];
  totalsRaised?: TotalsRaisedInterface | undefined;
  basketSizeBreakdown: BasketSizeBreakdownInterface[];
  basketInfo: BasketInfoInterface[];
  orderItems: OrderItemsInterface[];
  memberSummary?: MemberSummaryInterface | undefined;
}
