import { useUI } from "src/modules/UI/composables";
import { useReportsService } from "../services/report.service";
import { useReportStore } from "../store/ReportStore/reportStore";
import type { RecipientDataFormInterface, ReportDataInterface } from "../interfaces/report.interface";

export const useReport = () => {

  const { getReportList, downloadReportExcelByReportId, getCustomReports, downloadCustomReportExcelByReportId,
    runSQLReportRecipientsByReportId, getReportRecipientsByReportId
  } = useReportsService()
  const $rStore = useReportStore()
  const { downloadFile } = useUI()


  return {
    async getReportList() {
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


    async getViewReport(data: RecipientDataFormInterface) {

      await runSQLReportRecipientsByReportId(data.id, {
        dontRedirect: true,
        dontShowToast: true,
        loading: {
          message: 'running sql'
        }
      });

      const resp = await getReportRecipientsByReportId(data, {
        loading: {
          message: 'loading'
        }
      })

      return resp.ok ? resp.data : undefined
    },
  }
};
