import type { RecipientDataInterface, RecipientMemberInterface, ReportDataInterface, SpecialReportInterface } from "../../interfaces/report.interface";
import type { NoneType } from "../../services/service-interfaces";


export interface reportStateInterface {
  basicReports: ReportDataInterface[];
  advancedReports: ReportDataInterface[];
  customReports: ReportDataInterface[];
  report: RecipientDataInterface | NoneType;
  selectedRecipients: RecipientMemberInterface[];
  recipientsFiltered: RecipientMemberInterface[];
  reportId: string | number;
  images: string[];
  tokens: string[];
  isCustom: boolean;
  advancedReportsSpecial: SpecialReportInterface[];
  customReportsSpecial: SpecialReportInterface[];
  isLoadingReportData: boolean
}
