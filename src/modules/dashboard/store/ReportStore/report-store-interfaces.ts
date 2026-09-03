/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HTCBasketReport, RecipientDataInterface, RecipientMemberInterface, ReportDataInterface, SpecialReportInterface, TokenInterface } from "../../interfaces/report.interface";
import type { NoneType } from "../../services/service-interfaces";


export interface reportStateInterface {
  basicReports: ReportDataInterface[];
  htcBasketReport: HTCBasketReport | undefined;
  advancedReports: ReportDataInterface[];
  customReports: ReportDataInterface[];
  report: RecipientDataInterface | NoneType;
  selectedRecipients: RecipientMemberInterface[];
  recipientsFiltered: RecipientMemberInterface[];
  reportId: string | number;
  reportFieldId: string | number;
  images: string[];
  tokens: TokenInterface[];
  isCustom: boolean;
  advancedReportsSpecial: SpecialReportInterface[];
  customReportsSpecial: SpecialReportInterface[];
  isLoadingReportData: boolean
  filters: {
    basketSize: any[];
    categories: any[];
    donateBasket: string;
    routeCode: any[];
    searchTerm: string;
    zipCode: any[];
    yesOnly: boolean;
    hideNL: boolean;
  }
}
