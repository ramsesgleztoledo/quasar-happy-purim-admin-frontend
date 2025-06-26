
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { orderArchiveStateInterface } from './orderArchive-store-interfaces';
import type { ItemDetailsInterface, OrderArchiveInterface, OrderReceiptInterface } from '../../interfaces/order-interfaces';
import type { NoneType } from '../../services/service-interfaces';


const initialState: orderArchiveStateInterface = {
  orders: [],
  selectedOrder: undefined,
  selectedOrderReceipt: undefined,
  itemDetails: [],
}

export const useOrderArchiveStore = defineStore('orderArchiveStore', {
  state: (): orderArchiveStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setOrders(orders: OrderArchiveInterface[]) {
      this.orders = [...orders];
    },
    setItemDetails(items: ItemDetailsInterface[]) {
      this.itemDetails = [...items];
    },
    setSelectedOrder(order: OrderArchiveInterface) {
      this.selectedOrder = order;
    },
    setSelectedOrderReceipt(orderReceipt: OrderReceiptInterface | NoneType) {
      this.selectedOrderReceipt = orderReceipt;
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderArchiveStore, import.meta.hot));
}
