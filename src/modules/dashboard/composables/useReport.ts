import { useUI } from "src/modules/UI/composables";
import { useReportsService } from "../services/report.service";
import { useReportStore } from "../store/ReportStore/reportStore";
import type { RecipientDataFormInterface, ReportDataInterface } from "../interfaces/report.interface";
import { useQuasar } from "quasar";
import { useMailMergeService } from "../services/mailMerge.service";

export const useReport = () => {

  const { getReportList, downloadReportExcelByReportId, getCustomReports, downloadCustomReportExcelByReportId,
    runSQLReportRecipientsByReportId, getReportRecipientsByReportId,
    getZipCodeFilters,
    getRouteCodeFilters,
    getBasketSizeFilters,
    getDonateFilters,
    runSQLReportRecipientsByReportIdCustom,
    getReportRecipientsByReportIdCustom,
    getCustomSpecialReports,
    getAdvancedSpecialReports,
  } = useReportsService()
  const { getTokensByReportId } = useMailMergeService()
  const $rStore = useReportStore()
  const { downloadFile, showLoading, stopLoading } = useUI()
  const $q = useQuasar()

  return {
    async getReportList() {
      $q.loading.show({
        message: 'Loading...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })
      const resp = await Promise.all([
        getReportList(),
        getCustomReports(),
        getCustomSpecialReports(),
        getAdvancedSpecialReports(),
      ])


      $rStore.$patch({
        advancedReports: resp[0].ok ? resp[0].data.advancedReports : [],

        basicReports: resp[0].ok ? resp[0].data.basicReports : [],

        customReports: resp[1].ok ? resp[1].data.map(re => ({
          reportID: `${re.reportId}`,
          name: re.reportName,
          summary: "",
          isCustom: true
        })) : [],
        advancedReportsSpecial: resp[2].ok ? resp[2].data : [],
        customReportsSpecial: resp[3].ok ? resp[3].data : [],

      })
      $q.loading.hide()
    },

    async downloadReportExcelByReportId(report: ReportDataInterface) {
      if (!report.isCustom)
        await downloadFile(async () => downloadReportExcelByReportId(report.reportID, {
          dontRedirect: true,
          loading: {
            message: 'Downloading report'
          }
        }), {
          fileType: 'excel',
          fileName: report.name,
          extension: 'xlsx',

        })

      else
        await downloadFile(async () => downloadCustomReportExcelByReportId(report.reportID, {
          dontRedirect: true,
          loading: {
            message: 'Downloading report'
          }
        }), {
          fileType: 'excel',
          fileName: report.name,
          extension: 'xlsx',

        })
    },


    async getFilterOptions() {
      showLoading()

      const resp = await Promise.all([
        getZipCodeFilters({
          dontRedirect: true,
          dontShowToast: true,
        }),
        getRouteCodeFilters({
          dontRedirect: true,
          dontShowToast: true,
        }),
        getBasketSizeFilters({
          dontRedirect: true,
          dontShowToast: true,
        }),
        getDonateFilters({
          dontRedirect: true,
          dontShowToast: true,
        }),
      ])

      stopLoading()

      return {
        zipCode: resp[0].ok ? resp[0].data : [],
        routeCode: resp[1].ok ? resp[1].data : [],
        basketSize: resp[2].ok ? resp[2].data : [],
        donate: resp[3].ok ? resp[3].data : [],
      }

    },

    setIsCustom(isCustom: boolean) {
      $rStore.setIsCustom(isCustom)
    },


    async getViewReport(data: RecipientDataFormInterface, isCustom: boolean) {
      let tokens = undefined
      let resp = undefined

      if (!isCustom) {
        await runSQLReportRecipientsByReportId(data.id, {
          dontRedirect: true,
          dontShowToast: true,
          loading: {
            message: 'Loading...'
          }
        });


        resp = await getReportRecipientsByReportId(data, {
          loading: {
            message: 'Loading ...'
          }
        })
      }

      else {
        await runSQLReportRecipientsByReportIdCustom(data.id, {
          dontRedirect: true,
          dontShowToast: true,
          loading: {
            message: 'Loading...'
          }
        });

        resp = await getReportRecipientsByReportIdCustom(data.id, {
          loading: {
            message: 'Loading ...'
          }
        })
      }

      tokens = await getTokensByReportId(data.id, {
        loading: {
          message: 'Loading ...'
        }
      })

      if (!tokens || !resp) return

      $rStore.setTokens(tokens.ok ? tokens.data : [])
      return resp.ok ? resp.data : undefined
    },


    async getReportData(data: RecipientDataFormInterface, isCustom: boolean) {
      let resp = undefined

      if (!isCustom)
        resp = await getReportRecipientsByReportId(data, {
          loading: {
            message: 'Loading ...'
          }
        })


      else
        resp = await getReportRecipientsByReportIdCustom(data.id, {
          loading: {
            message: 'Loading ...'
          }
        })


      if (!resp) return

      $rStore.setRecipientsFiltered(resp.data.members || [])
      return resp.ok ? resp.data : undefined
    },


  }
};
