import type { UnPaidOrdersInterface } from "../interfaces/payment-interface";
import { usePaymentService } from "../services/payment.service";



export const usePayment = () => {


  const { getUnPaidOrdersByMemberId } = usePaymentService()
  return {

    async getUnPaidOrdersByMemberId(memberId: number) {
      const unpaidOrders = await getUnPaidOrdersByMemberId(memberId, {
        loading: {
          message: 'Loading Unpaid Orders...'
        }
      })
      if (unpaidOrders.ok)
        return unpaidOrders.data

      else {
        const uOrders: UnPaidOrdersInterface = {
          invoices: [],
          totalDue: 0
        }
        return uOrders;
      }

    },

  }
};
