
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { reportStateInterface } from './report-store-interfaces';
import type { RecipientDataInterface, RecipientMemberInterface, ReportDataInterface, SpecialReportInterface, TokenInterface } from '../../interfaces/report.interface';
import type { NoneType } from '../../services/service-interfaces';


const initialState: reportStateInterface = {
  advancedReports: [],
  htcBasketReport: undefined,
  basicReports: [],
  customReports: [],
  report: undefined,
  selectedRecipients: [],
  recipientsFiltered: [],
  reportId: "",
  reportFieldId: "",
  images: [],
  tokens: [],
  isCustom: false,
  advancedReportsSpecial: [],
  customReportsSpecial: [],
  isLoadingReportData: true,
  filters: {
    basketSize: [],
    categories: [],
    donateBasket: '',
    routeCode: [],
    searchTerm: '',
    zipCode: [],
    yesOnly: false,
    hideNL: false,
  }

}

export const useReportStore = defineStore('reportStore', {
  state: (): reportStateInterface => ({
    ...initialState
  }),

  getters: {
    getReportSelectedReportData(state: reportStateInterface) {
      const basic = state.basicReports.filter(rp => {

        return rp.reportID == state.reportId
      })
      if (basic.length) {
        if (basic.length === 1)
          return basic[0]
        else
          return basic.find(re => `${re.fieldID}` === `${state.reportFieldId}`)
      }

      const advanced = state.advancedReports.filter(rp => rp.reportID == state.reportId)
      if (advanced.length) {
        if (advanced.length === 1)
          return advanced[0]
        else
          return advanced.find(re => `${re.fieldID}` === `${state.reportFieldId}`)
      }



      const custom = state.customReports.filter(rp => rp.reportID == state.reportId)





      if (custom.length) {
        if (custom.length === 1)
          return custom[0]
        else
          return custom.find(re => `${re.fieldID}` === `${state.reportFieldId}`)
      }


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
    setReportReportFieldIdId(reportFieldId: string | number) {
      this.reportFieldId = reportFieldId
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
