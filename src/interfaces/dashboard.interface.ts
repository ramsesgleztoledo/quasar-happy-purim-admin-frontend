export interface OrderGraphInterface {
  date: Date;
  totalRaised: number;
  runningTotal: number;
}

export interface MembersOrdersGraphInterface {
  status: string;
  total: number;
}

export interface ParticipationInfoGraphInterface {
  totalMembers: number;
  participatingMembers: number;
}

export interface FundraiserStatusInterface {
  fundraiserClosed: boolean;
  hasReciprocityTrans: boolean;
}

export interface FundraiserTotalsInterface {
  dailyTotal: number;
  runningTotal: number;
  dateForDailyAndRunning: Date;
}

export interface ParticipationRateInterface {
  participationRate: number;
  comparisonFromYesterday: number;
}

export interface TopTransactionsInterface {
  order: number;
  processed: Date;
  amount: number;
  method: TransactionMethodEnum;
  memberId: number;
  member: string;
}

export enum TransactionMethodEnum {
  BillMe = "BillMe",
  Invoice = "INVOICE",
}

export interface TotalsRaisedInterface {
  totalFunds: number;
  totalFundsFromReciprocity: number;
  totalCharity: number;
  totalReciprocity: number;
}

export interface BasketSizeBreakdownInterface {
  total: number;
  basketSize: string;
}

export interface BasketInfoInterface {
  result: BasketInfoResultInterface;
  premiumBaskets: number | null;
  cardsEmails: number | null;
}

export interface BasketInfoResultInterface {
  delivery: number;
  shipping: number | null;
  shippingSummary: ShippingSummaryInterface[];
  personalUse: number;
  total: number;
}

export interface ShippingSummaryInterface {
  description: string;
  ordered: number;
}

export interface OrderItemsInterface {
  itemID: number;
  itemDescription: string;
  itemTotal: number;
}

export interface MemberSummaryInterface {
  totalMembers: number;
  membersLoggedIn: number;
  membersOnline: number;
  membersOnlineNames: string;
}





