import { useUI } from "src/modules/UI/composables";
import { useLabelsAndOrdersheetService } from "../services/labelsAndOrdersheet.service";

export const useLabelsAndOrdersheet = () => {

  const { getLabelOption, downloadOrderSheet,
    downloadOrderSheetByCategory,
    downloadNameLabels,
    downloadMailingLabels, } = useLabelsAndOrdersheetService()
  const { downloadFile } = useUI()

  return {
    async getLabelOption() {
      const resp = await getLabelOption({
        loading: {
          message: 'Loading...'
        }
      })
      return resp.ok ? resp.data : []
    },

    async downloadNameLabels(id: number) {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fetch: any = undefined
      let name = ''

      switch (id) {
        case 1:
          fetch = downloadOrderSheet
          name = 'Order-Sheet'
          break;
        case 2:
          fetch = downloadOrderSheetByCategory
          name = 'Order-Sheet-By-Category'
          break;
        case 3:
          fetch = downloadMailingLabels
          name = 'Mailing-Labels'
          break;
        case 4:
          fetch = downloadMailingLabels
          name = 'Mailing-Labels'
          break;
        default:
          fetch = downloadNameLabels
          name = 'Name-Labels'
          break;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docData: any = {
        fileType: 'doc',
        fileName: name,
        extension: 'docx'
      }


      if (id === 3)
        await downloadFile(async () => await fetch('Regular', {
          dontRedirect: true,
          loading: {
            message: 'Downloading'
          }
        }), {
          ...docData,
          fileName: docData.fileName + '-Regular'
        })

      else if (id === 4)
        await downloadFile(async () => await fetch('Alternate', {
          dontRedirect: true,
          loading: {
            message: 'Downloading'
          }
        }), {
          ...docData,
          fileName: docData.fileName + '-Alternate'
        })

      else
        await downloadFile(async () => await fetch({
          dontRedirect: true,
          loading: {
            message: 'Downloading'
          }
        }), {
          ...docData
        })


    }

  }
};
