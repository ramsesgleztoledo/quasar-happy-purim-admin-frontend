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
      :first-p="`$${convertWithCommas(dailyTotal.total, true)}`"
      second-p="Daily Total:"
      :third-p="`${convertToTextDate(dailyTotal.date)}`"
      icon-color="#3cd856"
      background-color="#dcfce7"
    />
  </div>
  <div
    class="q-mb-sm justify-content-center"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      class-name="justify-content-center"
      icon="signal_cellular_alt"
      :first-p="`$${convertWithCommas(runningTotal.total, true)}`"
      second-p="Running Total:"
      :third-p="`${dashboardStore.percentageRunningTotal?.percentageIncrease || 0}% Up From Yesterday`"
      icon-color="#5A65FA"
      background-color="#E2EAFF"
    />
  </div>
  <div
    class="q-mb-sm justify-content-end"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      class-name="justify-content-end  w-full"
      icon="group_add"
      :first-p="`${participationRate.today}%`"
      second-p="Participation Rate: "
      :third-p="`${participationRate.yesterday}% From Yesterday`"
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
