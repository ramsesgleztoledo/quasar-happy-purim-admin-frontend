import { useTransactionService } from "../services/transaction.service";
import { useUI } from "src/modules/UI/composables";



export const useTransaction = () => {


  const { getTransactions, getDonations, downloadCharityCSV, getReciprocityCharges,
    downloadReciprocityChargesCSV, getTransactionsDetailsByTransactionId } = useTransactionService()
  const { downloadFile } = useUI()

  return {

    async getTransactions() {
      const transactions = await getTransactions({
        loading: {
          message: 'Loading transactions...'
        }
      })
      return {
        count: transactions.ok ? transactions.data.count : 0,
        transactions: transactions.ok ? transactions.data.transactions : [],
      }

    },
    async getDonations() {
      const donations = await getDonations({
        loading: {
          message: 'Loading donations...'
        }
      })
      return donations.ok ? donations.data : []

    },
    async downloadCharityCSV() {
      await downloadFile(downloadCharityCSV, {
        fileType: 'csv',
        fileName: 'charity-breakdown'
      })
    },
    async getReciprocityCharges() {
      const resp = await getReciprocityCharges({
        loading: {
          message: 'Loading reciprocity charges...'
        }
      })
      return resp.ok ? resp.data : []

    },
    async downloadReciprocityChargesCSV() {
      await downloadFile(downloadReciprocityChargesCSV, {
        fileType: 'csv',
        fileName: 'reciprocity-charge'
      })
    },
    async getTransactionsDetailsByTransactionId(id: number) {
      const resp = await getTransactionsDetailsByTransactionId(id, {
        goBackIn403: true,
        useCache: true,
        loading: {
          message: `Loading transaction detail for ${id}`
        }
      })

      return resp.ok ? resp.data : undefined
    },

  }
};
