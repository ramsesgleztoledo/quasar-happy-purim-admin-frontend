import { useQuasar } from "quasar";
import type { BasketToBeShippedUpdateInterface } from "../interfaces/shipment-interfaces";
import { useShipmentService } from "../services/shipment.service";
import { useUI } from "src/modules/UI/composables";



export const useShipment = () => {


  const { downloadBasketsToBeShippedCSV, getBasketsToBeShipped, UpdateBasketsToBeShipped } = useShipmentService()
  const { downloadFile } = useUI()
  const $q = useQuasar()

  return {

    async getBasketsToBeShipped() {
      const resp = await getBasketsToBeShipped({
        loading: {
          message: 'Loading baskets...'
        }
      })
      return resp.ok ? resp.data : []

    },
    async downloadBasketsToBeShippedCSV() {
      await downloadFile(downloadBasketsToBeShippedCSV, {
        fileType: 'csv',
        fileName: 'baskets-to-be-shipped'
      })
    },
    async UpdateBasketsToBeShipped(data: BasketToBeShippedUpdateInterface) {
      const resp = await UpdateBasketsToBeShipped(data, {
        dontRedirect: true
      })

      if (resp.ok)
        $q.notify({
          color: 'blue',
          textColor: 'black',
          icon: 'error',
          message: 'Shipment updated',
        })

      else
        $q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'error',
          message: `Something went wrong updating the shipment, please try again later`,
        })


      return resp.ok


    },

  }
};
