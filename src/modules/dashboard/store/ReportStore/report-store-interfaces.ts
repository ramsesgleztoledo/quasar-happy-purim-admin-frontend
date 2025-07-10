import type { RecipientDataInterface, RecipientMemberInterface, ReportDataInterface } from "../../interfaces/report.interface";
import type { NoneType } from "../../services/service-interfaces";


export interface reportStateInterface {
  basicReports: ReportDataInterface[];
  advancedReports: ReportDataInterface[];
  customReports: ReportDataInterface[];
  report: RecipientDataInterface | NoneType;
  selectedRecipients: RecipientMemberInterface[];
  reportId: string | number;
  images: string[]
}
