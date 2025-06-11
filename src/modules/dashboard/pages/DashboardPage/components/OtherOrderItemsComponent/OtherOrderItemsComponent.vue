<template>
  <p class="OtherOrderItemsComponent-basket-statistics q-mb-md">Other Orders Items</p>
  <div class="row q-mt-md">
    <div class="col-12">
      <div class="BasketStatisticsComponent-baskets-type-container">
        <DisplayItem
          :styles="{
            maxHeight: '250px',
            overflow: 'auto',
          }"
          :items="orderItems"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DisplayItem from '../../../../components/DisplayItem/DisplayItem.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import type { ItemBasketInterface } from 'src/modules/dashboard/interfaces/item-interfaces'
import { convertWithCommas } from 'src/helpers'

const dStore = useDashboardStore()

const orderItems = computed<ItemBasketInterface[]>(() => [
  ...dStore.orderItems.map((item) => ({
    label: item.itemDescription,
    value: `$${convertWithCommas(item.itemTotal)}`,
    redirectTo: {
      name: 'dashboard-itemDetailsPage',
      params: {
        itemId: item.itemID,
      },
      query: {
        description: item.itemDescription,
      },
    },
    color: '#3c5ce0',
  })),
])
</script>

<style scoped lang="scss">
@import './OtherOrderItemsComponent.scss';
</style>
