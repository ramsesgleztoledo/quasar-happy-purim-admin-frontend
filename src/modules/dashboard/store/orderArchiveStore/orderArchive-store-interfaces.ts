import type { ItemDetailsInterface, OrderArchiveInterface, OrderReceiptInterface } from "../../interfaces/order-interfaces";


export interface orderArchiveStateInterface {
  orders: OrderArchiveInterface[];
  selectedOrder: OrderArchiveInterface | undefined | null;
  selectedOrderReceipt: OrderReceiptInterface | undefined | null;
  itemDetails: ItemDetailsInterface[]
}
