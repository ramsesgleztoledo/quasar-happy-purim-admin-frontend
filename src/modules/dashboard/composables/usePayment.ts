import type { RecordCCPaymentFormInterface, RecordCheckPaymentFormInterface, UnPaidOrdersInterface } from "../interfaces/payment-interface";
import { usePaymentService } from "../services/payment.service";
import { useUI } from '../../UI/composables/useUI';



export const usePayment = () => {


  const { getUnPaidOrdersByMemberId, recordCheckPayment, recordCCPayment, recordCreditPayment } = usePaymentService()

  const { showToast } = useUI()


  const showPaymentResult = (ok: boolean) => {
    showToast(ok, 'Payment Recorded', 'something went wrong recording the payment')
  }



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


    async recordCheckPayment(memberId: number, data: RecordCheckPaymentFormInterface) {
      const resp = await recordCheckPayment(memberId, data);

      showPaymentResult(resp.ok)
    },
    async recordCreditPayment(memberId: number, data: RecordCheckPaymentFormInterface) {
      const resp = await recordCreditPayment(memberId, data);

      showPaymentResult(resp.ok)
    },
    async recordCCPayment(memberId: number, data: RecordCCPaymentFormInterface) {
      const resp = await recordCCPayment(memberId, data);
      showPaymentResult(resp.ok)
    }

  }





};
