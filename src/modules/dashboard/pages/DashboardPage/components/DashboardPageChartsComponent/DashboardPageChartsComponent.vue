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
    <WidgetChart title="ALL TIME ORDERS" typeChart="line" />
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import WidgetChart from '../../../../components/WidgetChart/WidgetChart.vue'

const { isMobile } = useUI()
</script>

<style scoped lang="scss">
@import './DashboardPageChartsComponent';
</style>
