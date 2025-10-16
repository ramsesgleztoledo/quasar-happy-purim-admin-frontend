<template>
  <div v-if="!isLoading">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Transaction</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <TransactionComponent :transaction-details="transactionDetails" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import TransactionComponent from './components/TransactionComponent/TransactionComponent.vue'
import { useTransaction } from '../../composables/useTransaction'
import type { TransactionDetailsInterface } from '../../interfaces/transaction-interfaces'

const { getTransactionsDetailsByTransactionId } = useTransaction()

const $route = useRoute()
const isLoading = ref<boolean>(true)

const transactionDetails = ref<TransactionDetailsInterface | undefined>(undefined)

onMounted(async () => {
  const transactionID = $route.params.transactionID
  const resp = await getTransactionsDetailsByTransactionId(Number(transactionID))
  transactionDetails.value = resp
  isLoading.value = false
})
</script>

<style scoped lang="scss">
@import './TransactionDetailsPage.scss';
</style>
\
