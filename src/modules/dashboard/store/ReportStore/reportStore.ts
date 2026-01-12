
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { reportStateInterface } from './report-store-interfaces';
import type { RecipientDataInterface, RecipientMemberInterface, ReportDataInterface, SpecialReportInterface, TokenInterface } from '../../interfaces/report.interface';
import type { NoneType } from '../../services/service-interfaces';


const initialState: reportStateInterface = {
  advancedReports: [],
  basicReports: [],
  customReports: [],
  report: undefined,
  selectedRecipients: [],
  recipientsFiltered: [],
  reportId: "",
  images: [],
  tokens: [],
  isCustom: false,
  advancedReportsSpecial: [],
  customReportsSpecial: [],
  isLoadingReportData: true,
}

export const useReportStore = defineStore('reportStore', {
  state: (): reportStateInterface => ({
    ...initialState
  }),

  getters: {
    getReportSelectedReportData(state: reportStateInterface) {
      const basic = state.basicReports.find(rp => rp.reportID == state.reportId)
      if (basic)
        return basic

      const advanced = state.advancedReports.find(rp => rp.reportID == state.reportId)
      if (advanced)
        return advanced

      const custom = state.customReports.find(rp => rp.reportID == state.reportId)
      if (custom)
        return custom

      return undefined

    },
    showExtraFilters(state: reportStateInterface) {
      return state.reportId == 2 || state.reportId == 3
    }
  },

  actions: {
    setAdvancedReports(advancedReports: ReportDataInterface[]) {
      this.advancedReports = advancedReports.map(item => ({ ...item }));
    },
    setAdvancedReportsSpecial(advancedReportsSpecial: SpecialReportInterface[]) {
      this.advancedReportsSpecial = advancedReportsSpecial.map(item => ({ ...item }));
    },
    setBasicReports(basicReports: ReportDataInterface[]) {
      this.basicReports = basicReports.map(item => ({ ...item }));
    },
    setCustomReports(customReports: ReportDataInterface[]) {
      this.customReports = customReports.map(item => ({ ...item }));
    },
    setCustomReportsSpecial(customReportsSpecial: SpecialReportInterface[]) {
      this.customReportsSpecial = customReportsSpecial.map(item => ({ ...item }));
    },
    setReport(report: RecipientDataInterface | NoneType) {
      this.report = report;
      this.selectedRecipients = []
    },
    setSelectedRecipients(selectedRecipients: RecipientMemberInterface[]) {
      this.selectedRecipients = selectedRecipients.map(item => ({ ...item }));
    },
    setRecipientsFiltered(recipientsFiltered: RecipientMemberInterface[]) {
      this.recipientsFiltered = recipientsFiltered.map(item => ({ ...item }));
    },
    setReportId(reportId: string | number) {
      this.reportId = reportId
    },
    setImages(images: string[]) {
      this.images = images.map(img => img)
    },

    setTokens(tokens: TokenInterface[]) {
      this.tokens = tokens.map(to => to)
    },
    setIsCustom(isCustom: boolean) {
      this.isCustom = isCustom
    },
    setIsLoadingReportData(isLoadingReportData: boolean) {
      this.isLoadingReportData = isLoadingReportData
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReportStore, import.meta.hot));
}
