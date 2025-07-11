

import { computed } from "vue";
import { useOrderArchiveStore } from "../store/orderArchiveStore/orderArchiveStore";
import { useOrderArchiveService } from "../services/order.service";



export const useOrderArchive = () => {

  const $oStore = useOrderArchiveStore()
  const { getOrdersArchive, getOrderReceiptByOrderId, getItemTableByItemId } = useOrderArchiveService()



  return {
    ordersArchiveState: computed(() => $oStore.$state),

    async getOrdersArchive() {
      const orders = await getOrdersArchive({
        loading: {
          message: 'loading...'
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

      const
        resp
          = await getOrderReceiptByOrderId(orderId, {
            useCache: true,
            loading: {
              message: 'Loading...',
            }
          });
      $oStore.setSelectedOrderReceipt(resp.ok ? resp.data : undefined)

    },


  }
};
