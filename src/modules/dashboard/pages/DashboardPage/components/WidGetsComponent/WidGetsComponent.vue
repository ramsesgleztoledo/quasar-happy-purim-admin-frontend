<template>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="discount"
      :first-p="`$${convertWithCommas(dailyTotal.total)}`"
      second-p="Daily Total:"
      :third-p="`${convertToTextDate(dailyTotal.date)}`"
      icon-color="#3cd856"
      background-color="#dcfce7"
    />
  </div>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="signal_cellular_alt"
      :first-p="`$${convertWithCommas(runningTotal.total)}`"
      second-p="Running Total:"
      :third-p="`${convertToTextDate(runningTotal.date)}`"
      icon-color="#5A65FA"
      background-color="#E2EAFF"
    />
  </div>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="group_add"
      :first-p="`${convertWithCommas(participationRate.today)}%`"
      second-p="Participation Rate"
      :third-p="`${convertWithCommas(participationRate.yesterday)}%`"
      icon-color="#BF83FF"
      background-color="#F3E8FF"
    />
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import WidGet from '../../../../components/widget/WidGet.vue'
import { convertToTextDate, convertWithCommas } from 'src/helpers'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { computed } from 'vue'
const { isMobile } = useUI()

const dashboardStore = useDashboardStore()

const participationRate = computed(() => ({
  today: dashboardStore.participationRate?.participationRate || 0,
  yesterday: dashboardStore.participationRate?.comparisonFromYesterday || 0,
}))

const dailyTotal = computed(() => ({
  total: dashboardStore.fundraiserTotals?.dailyTotal || 0,
  date: dashboardStore.fundraiserTotals?.dateForDailyAndRunning,
}))

const runningTotal = computed(() => ({
  total: dashboardStore.fundraiserTotals?.runningTotal || 0,
  date: dashboardStore.fundraiserTotals?.dateForDailyAndRunning,
}))
</script>

<style scoped lang="scss">
@import './WidGetsComponent.scss';
</style>
