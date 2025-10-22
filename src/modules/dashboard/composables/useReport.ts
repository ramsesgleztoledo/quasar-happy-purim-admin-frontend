import { useUI } from "src/modules/UI/composables";
import { useReportsService } from "../services/report.service";
import { useReportStore } from "../store/ReportStore/reportStore";
import type { RecipientDataFormInterface, ReportDataInterface } from "../interfaces/report.interface";
import { useQuasar } from "quasar";
import { useMailMergeService } from "../services/mailMerge.service";

export const useReport = () => {

  const { getReportList, downloadReportExcelByReportId, getCustomReports, downloadCustomReportExcelByReportId,
    // runSQLReportRecipientsByReportId,
    getReportRecipientsByReportIdWithSQL,
    getReportRecipientsByReportIdCustomWithSQL,
    getReportRecipientsByReportId,
    getZipCodeFilters,
    getRouteCodeFilters,
    getBasketSizeFilters,
    getDonateFilters,
    downloadRouteReport,
    // runSQLReportRecipientsByReportIdCustom,
    // getReportRecipientsByReportIdCustom,
    getCustomSpecialReports,
    getAdvancedSpecialReports,
    getReportRecipientsByReportIdFilterOnly,
  } = useReportsService()
  const { getTokensByReportId, getCustomTokensByReportId } = useMailMergeService()
  const $rStore = useReportStore()
  const { downloadFile, showLoading, stopLoading } = useUI()
  const $q = useQuasar()

  return {
    async getReportList() {
      $q.loading.show({
        message: 'Loading ...',
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


      $rStore.setIsLoadingReportData(true)
      let tokens = undefined
      let resp = undefined



      if (!isCustom)
        tokens = await getTokensByReportId(data.id, {
          // loading: {
          //   message: 'Loading ...'
          // }
        })

      else
        tokens = await getCustomTokensByReportId({
          // loading: {
          //   message: 'Loading ...'
          // }
        })




      if (tokens)
        $rStore.setTokens(tokens.ok ? tokens.data : [])

      if (!isCustom) {
        // await runSQLReportRecipientsByReportId(data.id, {
        //   dontRedirect: true,
        //   dontShowToast: true,
        //   // loading: {
        //   //   message: 'Loading ...'
        //   // }
        // });


        resp = await getReportRecipientsByReportIdWithSQL(data, {
          // loading: {
          //   message: 'Loading ...'
          // }
        })
      }

      else {
        // await runSQLReportRecipientsByReportIdCustom(data.id, {
        //   dontRedirect: true,
        //   dontShowToast: true,
        //   // loading: {
        //   //   message: 'Loading ...'
        //   // }
        // });

        resp = await getReportRecipientsByReportIdCustomWithSQL(data, {
          // loading: {
          //   message: 'Loading ...'
          // }
        })
      }





      $rStore.setIsLoadingReportData(false)

      return resp?.ok ? resp.data : undefined
    },


    async getReportData(data: RecipientDataFormInterface, isCustom: boolean, isFirstTime?: boolean) {


      console.log({ data, isCustom, isFirstTime });


      let resp = undefined

      if (!isCustom) {
        if (!isFirstTime)
          resp = await getReportRecipientsByReportIdWithSQL(data, {
            // loading: {
            //   message: 'Loading ...'
            // }
          })
        else
          resp = await getReportRecipientsByReportIdFilterOnly(data, {
            // loading: {
            //   message: 'Loading ...'
            // }
          })

      }


      else {
        // resp = (await getReportRecipientsByReportIdCustomWithSQL(data.id, {
        //   // loading: {
        //   //   message: 'Loading ...'
        //   // }
        // }))
        // if (data.id == 12)
        //   resp = (await getReportRecipientsByReportIdCustom(data.id, {
        //     categories: (data.categories || []).join(', '),
        //     searchTerm: data.searchTerm || "",
        //   }, {
        //     loading: {
        //       message: 'Loading ...'
        //     }
        //   }))
        // else
          resp = await getReportRecipientsByReportIdCustomWithSQL(data, {
            // loading: {
            //   message: 'Loading ...'
            // }
          })



      }


      if (!resp) return

      $rStore.setRecipientsFiltered(resp.data.members || [])
      return resp.ok ? resp.data : undefined
    },

    async getFilteredRecipients(data: RecipientDataFormInterface) {

      const resp = await getReportRecipientsByReportId(data, {
        dontRedirect: true,
        dontShowToast: true,
        dontUseErrorAction: true,
        // loading: {
        //   message: 'Loading ...'
        // }
      })

      return resp.ok ? resp.data.members : []

    },
    async downloadRouteReport() {
      await downloadFile(async () => downloadRouteReport({
        dontRedirect: true,
        loading: {
          message: 'Downloading report'
        }
      }), {
        fileType: 'doc',
        fileName: 'RouteReport',
        extension: 'doc',
      })



    }


  }
};
