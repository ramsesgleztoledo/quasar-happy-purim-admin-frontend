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
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
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

const $dStore = useDashboardStore()

const dataArray = computed<DataArrayInterface[]>(() =>
  $dStore.basketSizeBreakdown.map((item) => ({
    label: item.basketSize,
    quantity: item.total,
    color: generateRandomColor(),
  })),
)
const baskets = computed<ItemBasketInterface[]>(() =>
  $dStore.basketInfo.map((item) => ({
    label: item.label,
    value: item.value,
    redirectTo:
      typeof item.redirect === 'string' && item.redirect != 'undefined' ? item.redirect : undefined,
    color:
      typeof item.redirect === 'string' && item.redirect != 'undefined' ? '#3c5ce0' : undefined,
  })),
)
</script>

<style scoped lang="scss">
@import './BasketStatisticsComponent.scss';
</style>
