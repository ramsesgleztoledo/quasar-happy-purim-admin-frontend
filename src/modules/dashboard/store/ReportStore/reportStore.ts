
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { reportStateInterface } from './report-store-interfaces';
import type { RecipientDataInterface, RecipientMemberInterface, ReportDataInterface } from '../../interfaces/report.interface';
import type { NoneType } from '../../services/service-interfaces';


const initialState: reportStateInterface = {
  advancedReports: [],
  basicReports: [],
  customReports: [],
  report: undefined,
  selectedRecipients: [],
  reportId: "",
  images: []
}

export const useReportStore = defineStore('reportStore', {
  state: (): reportStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setAdvancedReports(advancedReports: ReportDataInterface[]) {
      this.advancedReports = advancedReports.map(item => ({ ...item }));
    },
    setBasicReports(basicReports: ReportDataInterface[]) {
      this.basicReports = basicReports.map(item => ({ ...item }));
    },
    setCustomReports(customReports: ReportDataInterface[]) {
      this.customReports = customReports.map(item => ({ ...item }));
    },
    setReport(report: RecipientDataInterface | NoneType) {
      this.report = report;
      this.selectedRecipients = []
    },
    setSelectedRecipients(selectedRecipients: RecipientMemberInterface[]) {
      this.selectedRecipients = selectedRecipients.map(item => ({ ...item }));
    },
    setReportId(reportId: string | number) {
      this.reportId = reportId
    },
    setImages(images: string[]) {
      this.images = images.map(img => img)
    }



  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReportStore, import.meta.hot));
}
