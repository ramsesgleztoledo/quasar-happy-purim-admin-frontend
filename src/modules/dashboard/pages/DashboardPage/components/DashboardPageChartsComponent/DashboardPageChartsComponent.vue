<template>
  <div
    class="q-pa-sm"
    :class="{
      'col-3': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidgetChart title="TOTAL REVENUE" typeChart="bar" preFix="$" />
  </div>
  <div
    class="q-pa-sm"
    :class="{
      'col-3': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidgetChart title="TOTAL REFUNDS" typeChart="line" preFix="$" />
  </div>
  <div
    class="q-pa-sm"
    :class="{
      'col-3': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidgetChart title="ACTIVE USERS" typeChart="bar" />
  </div>
  <div
    class="q-pa-sm"
    :class="{
      'col-3': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidgetChart title="ALL TIME ORDERS" typeChart="line" :data="orderTotalGraph" />
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import WidgetChart from '../../../../components/WidgetChart/WidgetChart.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore'
import { computed } from 'vue'
import type { DataItemInterface } from 'src/modules/dashboard/components/WidgetChart/widget-chart-interfaces'

const { isMobile } = useUI()
const dStore = useDashboardStore()

const orderTotalGraph = computed<DataItemInterface>(() => ({
  dates: [...dStore.orderTotalGraph.map((item) => `${item.date}`)],
  data: [
    {
      label: 'Total Raised',
      color: '#3cd856',
      data: [...dStore.orderTotalGraph.map((item) => item.totalRaised)],
    },
    {
      label: 'Running Total',
      color: '#5a65fa',
      data: [...dStore.orderTotalGraph.map((item) => item.runningTotal)],
    },
  ],
}))
</script>

<style scoped lang="scss">
@import './DashboardPageChartsComponent';
</style>
