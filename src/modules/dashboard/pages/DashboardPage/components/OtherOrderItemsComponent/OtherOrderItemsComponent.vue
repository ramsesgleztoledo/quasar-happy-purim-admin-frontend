<template>
  <p class="OtherOrderItemsComponent-basket-statistics q-mb-md">Other Order Items</p>
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
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore'
import type { ItemBasketInterface } from 'src/modules/dashboard/interfaces/item-interface'

const dStore = useDashboardStore()

const orderItems = computed<ItemBasketInterface[]>(() => [
  {
    label: 'Total Members',
    value: dStore.memberSummary?.totalMembers || 0,
  },
  {
    label: 'Member logged in',
    value: dStore.memberSummary?.membersLoggedIn || 0,
  },
  {
    label: 'Member online',
    value: dStore.memberSummary?.membersOnline || 0,
  },
  {
    label: 'Member online Names',
    value: 'show',
    color: '#3c5ce0',
    hover: `<p> ${dStore.memberSummary?.membersOnlineNames || ''} </p>`,
  },
  ...dStore.orderItems.map((item) => ({
    label: item.itemDescription,
    value: item.itemTotal,
  })),
])
</script>

<style scoped lang="scss">
@import './OtherOrderItemsComponent.scss';
</style>
