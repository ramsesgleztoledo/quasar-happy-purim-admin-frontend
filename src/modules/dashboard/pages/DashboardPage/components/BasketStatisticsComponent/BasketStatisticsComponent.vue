<template>
  <p class="BasketStatisticsComponent-basket-statistics q-mb-md">Basket Statistics</p>

  <div v-if="dataArray.length" class="row" style="height: 200px">
    <div class="col-6" style="height: 100%">
      <PieChart deluxe-chart :char-data="[...dataArray]" />
    </div>
    <div class="col-6">
      <div class="BasketStatisticsComponent-chart-labels-container">
        <div class="row" v-for="(data, index) in dataArray" :key="index">
          <div class="col-12">
            <div class="BasketStatisticsComponent-chart-labels-info">
              <div
                class="q-mr-sm BasketStatisticsComponent-custom-square"
                :style="{ backgroundColor: data.color }"
              ></div>
              <p class="q-mr-sm q-mb-sm">{{ data.label }}</p>
              <b class="q-ml-sm">
                {{ data.quantity }}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-12">
      <div class="BasketStatisticsComponent-baskets-type-container">
        <DisplayItem
          total-label="Total Baskets Required:"
          :count-total="totalBaskets"
          :styles="{
            maxHeight: '250px',
            overflow: 'auto',
          }"
          :items="baskets"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore'
import PieChart from '../../../../components/ChartJs/PieChart/PieChart.vue'
import DisplayItem from '../../../../components/DisplayItem/DisplayItem.vue'
import { computed } from 'vue'
import { generateRandomColor } from 'src/helpers'
import type { ItemBasketInterface } from 'src/modules/dashboard/interfaces/item-interface'

interface DataArrayInterface {
  label: string
  quantity: number
  color: string
}

const dStore = useDashboardStore()

const dataArray = computed<DataArrayInterface[]>(() =>
  dStore.basketSizeBreakdown.map((item) => ({
    label: item.basketSize,
    quantity: item.total,
    color: generateRandomColor(),
  })),
)

const totalBaskets = computed(() => dStore.basketInfo?.result?.total || 0)

const baskets = computed(() => {
  let bks: ItemBasketInterface[] = []

  if (dStore.basketInfo?.result?.delivery !== null) {
    bks = [
      ...bks,
      {
        label: 'Baskets Required for Delivery:',
        value: dStore.basketInfo?.result?.delivery || 0,
        redirectTo: 'has',
        color: '#3c5ce0',
      },
    ]
  }
  if (dStore.basketInfo?.result?.personalUse !== null) {
    bks = [
      ...bks,
      {
        label: 'Baskets sold for Personal Use:',
        value: dStore.basketInfo?.result?.personalUse || 0,
        redirectTo: 'has',
        color: '#3c5ce0',
      },
    ]
  }

  if (dStore.basketInfo?.result?.shipping !== null) {
    bks = [
      ...bks,
      {
        label: 'Shipping Baskets',
        value: dStore.basketInfo?.result?.shipping || 0,
        redirectTo: 'has',
        color: '#3c5ce0',
      },
    ]
  }

  bks = [
    ...bks,
    ...(dStore.basketInfo?.result?.shippingSummary.map((item) => ({
      label: item.description,
      value: item.ordered,
      redirectTo: 'has',
      color: '#3c5ce0',
    })) || []),
  ]

  if (dStore.basketInfo?.premiumBaskets !== null) {
    bks = [
      ...bks,
      {
        label: 'Premium Baskets',
        value: dStore.basketInfo?.premiumBaskets || 0,
      },
    ]
  }
  if (dStore.basketInfo?.cardsEmails !== null) {
    bks = [
      ...bks,
      {
        label: 'Cards Emails',
        value: dStore.basketInfo?.cardsEmails || 0,
        redirectTo: 'has',
        color: '#3c5ce0',
      },
    ]
  }

  return bks
})
</script>

<style scoped lang="scss">
@import './BasketStatisticsComponent.scss';
</style>
