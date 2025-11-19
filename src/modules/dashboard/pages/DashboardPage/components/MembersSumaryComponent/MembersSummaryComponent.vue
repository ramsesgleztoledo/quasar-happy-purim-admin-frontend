<template>
  <p class="OtherOrderItemsComponent-basket-statistics q-mb-md">Members Summary</p>
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

const $dStore = useDashboardStore()

const membersOnline = computed(() => $dStore.memberSummary?.membersOnlineNames || [])

const orderItems = computed<ItemBasketInterface[]>(() => [
  {
    label: 'Total Members',
    value: $dStore.memberSummary?.totalMembers || 0,
  },
  {
    label: 'Members Logged In',
    value: $dStore.memberSummary?.membersLoggedIn || 0,
    color: '#3c5ce0',
    redirectTo: {
      name: 'dashboard-memberLoggedPage',
    },
  },
  {
    label: 'Members Currently Online',
    value: $dStore.memberSummary?.membersOnline || 0,
    color: '#3c5ce0',
    hover: membersOnline.value.length
      ? `
    <div class="row q-mb-sm">
    Members who have been online in the past 8 minutes:
    </div>
    <ul style="max-height: 120px; overflow: auto;">
    ${membersOnline.value.map(
        (name) =>
          `<li>${name}</li>
    `,
      )
      .join('')}

    </ul>`
      : undefined,
  },
])
</script>

<style scoped lang="scss">
@import './MembersSummaryComponent.scss';
</style>
