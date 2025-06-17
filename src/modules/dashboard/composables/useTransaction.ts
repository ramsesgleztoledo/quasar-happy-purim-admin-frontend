import { useTransactionService } from "../services/transaction.service";
import { useUI } from "src/modules/UI/composables";



export const useTransaction = () => {


  const { getTransactions, getDonations, downloadCharityCSV } = useTransactionService()
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
      await downloadFile(downloadCharityCSV, 'csv', 'charity-breakdown')
    },

  }
};
