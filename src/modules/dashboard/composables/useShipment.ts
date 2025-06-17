import { useShipmentService } from "../services/shipment.service";
import { useUI } from "src/modules/UI/composables";



export const useShipment = () => {


  const { downloadBasketsToBeShippedCSV, getBasketsToBeShipped } = useShipmentService()
  const { downloadFile } = useUI()

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
      await downloadFile(downloadBasketsToBeShippedCSV, 'csv', 'baskets-to-be-shipped')
    },

  }
};
