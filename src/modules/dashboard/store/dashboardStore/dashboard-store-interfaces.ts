import type { BasketInfoInterface, BasketSizeBreakdownInterface, FundraiserStatusInterface, FundraiserTotalsInterface, MembersOrdersGraphInterface, MemberSummaryInterface, OrderGraphInterface, OrderItemsInterface, ParticipationInfoGraphInterface, ParticipationRateInterface, TopTransactionsInterface, TotalsRaisedInterface } from 'src/modules/dashboard/interfaces/dashboard-interfaces';
import type { NoneType } from '../../services/service-interfaces';
import type { MembersLoggedInterface } from '../../interfaces/member-interfaces';

export interface DashboardStateInterface {
  orderTotalGraph: OrderGraphInterface[];
  membersOrdersGraph: MembersOrdersGraphInterface[];
  participationInfoGraph: ParticipationInfoGraphInterface | NoneType;
  fundraiserStatus: FundraiserStatusInterface | NoneType;
  fundraiserTotals: FundraiserTotalsInterface | NoneType;
  participationRate: ParticipationRateInterface | NoneType;
  topTransactions: TopTransactionsInterface[];
  totalsRaised: TotalsRaisedInterface | NoneType;
  basketSizeBreakdown: BasketSizeBreakdownInterface[];
  basketInfo: BasketInfoInterface[];
  orderItems: OrderItemsInterface[];
  memberSummary: MemberSummaryInterface | NoneType;
  membersLogged: MembersLoggedInterface | NoneType;
}
