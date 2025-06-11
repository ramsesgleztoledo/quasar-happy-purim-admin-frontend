<template>
  <div v-if="!isLoading">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Order Details</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ReceiptComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ReceiptComponent from './components/ReceiptComponent/ReceiptComponent.vue'
import { useRoute } from 'vue-router'
import { useOrderArchive } from 'src/modules/dashboard/composables/useOrderArchive'

const { getOrdersAllOrderDetails } = useOrderArchive()
const $route = useRoute()
const isLoading = ref<boolean>(true)

onMounted(async () => {
  const orderId = $route.params.orderId
  getOrdersAllOrderDetails(Number(orderId)).finally(() => {
    isLoading.value = false
  })
})
</script>

<style scoped lang="scss">
@import './OrderDetailPage.scss';
</style>
