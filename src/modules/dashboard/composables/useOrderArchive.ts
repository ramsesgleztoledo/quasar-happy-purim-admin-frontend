/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed } from "vue";
import { useOrderArchiveStore } from "../store/orderArchiveStore/orderArchiveStore";
import { useOrderArchiveService } from "../services/order.service";
import { useQuasar } from "quasar";


export const useOrderArchive = () => {

  const $oStore = useOrderArchiveStore()
  const $q = useQuasar()
  const { getOrdersArchive, getOrderReceiptByOrderId, getItemTableByItemId } = useOrderArchiveService()



  return {
    ordersArchiveState: computed(() => $oStore.$state),

    async getOrdersArchive() {
      const orders = await getOrdersArchive({
        loading: {
          message: 'loading orders...'
        }
      })
      $oStore.setOrders(orders.ok ? orders.data : []);
    },
    async getItemTableByItemId(itemId: number) {
      const items = await getItemTableByItemId(itemId, {
        loading: {
          message: 'loading items...'
        }
      })
      $oStore.setItemDetails(items.ok ? items.data : []);
    },
    async getOrdersAllOrderDetails(orderId: number) {

      $q.loading.show({
        message: 'Loading order details ...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })

      const promises: Promise<any>[] = [
        getOrderReceiptByOrderId(orderId, {
          useCache: true
        })
      ]

      const [
        orderReceipt
      ]: any = await Promise.all(promises)

      $oStore.setSelectedOrderReceipt(orderReceipt)


      $q.loading.hide()
    },


  }
};
