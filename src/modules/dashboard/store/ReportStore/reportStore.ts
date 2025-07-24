
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
  images: [],
  tokens: []
}

export const useReportStore = defineStore('reportStore', {
  state: (): reportStateInterface => ({
    ...initialState
  }),

  getters: {
    getReportSelectedName(state: reportStateInterface) {
      const basic = state.basicReports.find(rp => rp.reportID == state.reportId)
      if (basic)
        return basic.name

      const advanced = state.advancedReports.find(rp => rp.reportID == state.reportId)
      if (advanced)
        return advanced.name

      const custom = state.customReports.find(rp => rp.reportID == state.reportId)
      if (custom)
        return custom.name

      return "None-name"

    },
    showExtraFilters(state: reportStateInterface) {
      return state.reportId == 2 || state.reportId == 3
    }
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
    },

    setTokens(tokens: string[]) {
      this.tokens = tokens.map(to => to)
    }



  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReportStore, import.meta.hot));
}
