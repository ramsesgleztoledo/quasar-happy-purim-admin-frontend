import { useUI } from "src/modules/UI/composables/useUI";
import { useReportFunctionsService } from "../services/reportFunctions.service";
import type { ReportFunctionsInterface } from "../interfaces/report-functions.interface";


export const useReportFunctions = () => {

  const { getReportFunctions, downloadFunctionReportById } = useReportFunctionsService()
  const { downloadFile } = useUI()

  return {
    async getReportFunctions() {
      const resp = await getReportFunctions({
        dontRedirect: true,
        dontShowToast: true,
        dontUseErrorAction: true,
      })

      return resp.ok ? resp.data : []
    },
    async downloadReportFunctions(report: ReportFunctionsInterface) {

      const date = new Date().toISOString().split('T')[0]

      await downloadFile(async () => downloadFunctionReportById(report.id, {
        dontRedirect: true,
        loading: {
          message: 'Loading...'
        }
      }), {
        fileType: 'excel',
        fileName: `${report.rName}(custom-report)_${date}`,
        extension: 'xlsx',
      })

    },


  }
};
