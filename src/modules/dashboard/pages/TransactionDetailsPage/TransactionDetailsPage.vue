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
        <TransactionComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import TransactionComponent from './components/TransactionComponent/TransactionComponent.vue'
// import { useOrderArchive } from 'src/modules/dashboard/composables/useOrderArchive'

// const { getOrdersAllOrderDetails } = useOrderArchive()
const $route = useRoute()
const isLoading = ref<boolean>(true)

onMounted(async () => {
  const transactionID = $route.params.transactionID
  console.log(transactionID)

  isLoading.value = false
  // getOrdersAllOrderDetails(Number(orderId)).finally(() => {
  //   isLoading.value = false
  // })
})
</script>

<style scoped lang="scss">
@import './TransactionDetailsPage.scss';
</style>
