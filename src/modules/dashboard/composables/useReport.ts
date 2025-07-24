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
        getCustomReports()
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




    async getViewReport(data: RecipientDataFormInterface) {

      const tokens = await getTokensByReportId(data.id, {
        loading: {
          message: 'Loading ...'
        }
      })

      $rStore.setTokens(tokens.ok ? tokens.data : [])

      await runSQLReportRecipientsByReportId(data.id, {
        dontRedirect: true,
        dontShowToast: true,
        loading: {
          message: 'Loading ...'
        }
      });

      const resp = await getReportRecipientsByReportId(data, {
        loading: {
          message: 'Loading ...'
        }
      })

      return resp.ok ? resp.data : undefined
    },
  }
};
