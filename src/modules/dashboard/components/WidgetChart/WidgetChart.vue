<template>
  <div class="WidgetChart-container" :class="{ fullscreen: isFullScreen }">
    <div class="row q-mb-sm" style="justify-content: flex-end">
      <q-btn
        flat
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="isFullScreen = !isFullScreen"
      />
    </div>
    <div class="row WidgetChart-first-row">
      <p>{{ title }}</p>
      <q-select
        v-model="range"
        :options="rangeOptions"
        label=""
        outlined
        @update:model-value="onRangeTypeChanged"
      />
    </div>
    <div class="row q-mt-lg">
      <div class="col-12 WidgetChart-earned">
        {{ preFix ? preFix : '' }}{{ convertWithCommas(charData[charData.length - 1]?.quantity)
        }}{{ subFix ? subFix : '' }}
      </div>
      <div class="col-12 WidgetChart-description">{{ charData[charData.length - 1]?.label }}</div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12 WidgetChart-graph" :style="{ height: isFullScreen ? '600px' : '80px' }">
        <BarChart showLabel :charData="charData" v-if="typeChart === 'bar'" />
        <LineChart showLabel :charData="charData" v-if="typeChart === 'line'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BarChart from 'src/modules/dashboard/components/ChartJs/BarChart/BarChart.vue'
import LineChart from 'src/modules/dashboard/components/ChartJs/LineChart/LineChart.vue'
import { parseISO, format, startOfWeek } from 'date-fns'
import { convertWithCommas } from 'src/helpers/convertWithCommas'

interface WidgetCharPropsInterface {
  typeChart: 'bar' | 'line'
  title: string
  preFix?: string
  subFix?: string
}
interface DataItem {
  value: number
  date: string
}
interface GroupedData {
  byMonth: { label: string; quantity: number }[]
  byYear: { label: string; quantity: number }[]
  byDay: { label: string; quantity: number }[]
  byWeek: { label: string; quantity: number }[]
}

defineProps<WidgetCharPropsInterface>()

const isFullScreen = ref<boolean>(false)
const range = ref('Monthly')
const rangeOptions = ref(['Monthly', 'Yearly', 'Weekly', 'Daily'])

const data: DataItem[] = [
  { value: 20, date: '2025-01-01' },
  { value: 30, date: '2025-01-01' },
  { value: 24, date: '2025-01-01' },
  { value: 15, date: '2025-01-03' },
  { value: 30, date: '2025-02-01' },
  { value: 10, date: '2025-01-01' },
  { value: 50, date: '2025-03-10' },
  { value: 40, date: '2025-03-15' },
  { value: 60, date: '2025-04-05' },
  { value: 25, date: '2025-04-07' },
  { value: 80, date: '2025-05-20' },
  { value: 90, date: '2025-05-25' },
  { value: 45, date: '2025-06-01' },
  { value: 35, date: '2025-06-15' },
  { value: 70, date: '2025-07-04' },
  { value: 85, date: '2025-07-14' },
  { value: 95, date: '2025-08-08' },
  { value: 100, date: '2025-08-20' },
  { value: 110, date: '2025-09-01' },
  { value: 120, date: '2025-09-10' },
  { value: 55, date: '2025-10-05' },
  { value: 65, date: '2025-10-15' },
  { value: 75, date: '2025-11-01' },
  { value: 85, date: '2025-11-25' },
  { value: 95, date: '2025-12-10' },
  { value: 105, date: '2025-12-20' },
  { value: 15, date: '2026-01-02' },
  { value: 25, date: '2026-01-05' },
  { value: 35, date: '2026-02-01' },
  { value: 45, date: '2026-02-10' },
  { value: 55, date: '2026-03-15' },
  { value: 65, date: '2026-03-20' },
  { value: 75, date: '2026-04-25' },
  { value: 85, date: '2026-04-30' },
  { value: 95, date: '2026-05-01' },
  { value: 105, date: '2026-05-20' },
  { value: 115, date: '2026-06-10' },
  { value: 125, date: '2026-06-15' },
  { value: 135, date: '2026-07-05' },
  { value: 145, date: '2026-07-20' },
  { value: 155, date: '2026-08-01' },
  { value: 165, date: '2026-08-15' },
  { value: 175, date: '2026-09-01' },
  { value: 185, date: '2026-09-25' },
  { value: 195, date: '2026-10-05' },
  { value: 205, date: '2026-10-20' },
  { value: 215, date: '2026-11-01' },
  { value: 225, date: '2026-11-15' },
  { value: 235, date: '2026-12-01' },
  { value: 245, date: '2026-12-20' },
  { value: 255, date: '2027-01-05' },
  { value: 354, date: '2027-01-15' },
]

const groupByTimePeriods = (data: DataItem[]): GroupedData => {
  const result: {
    byMonth: Record<string, number>
    byYear: Record<string, number>
    byDay: Record<string, number>
    byWeek: Record<string, number>
  } = {
    byMonth: {},
    byYear: {},
    byDay: {},
    byWeek: {},
  }

  data.forEach((item) => {
    const date = parseISO(item.date)
    const year = format(date, 'yyyy')
    const month = format(date, 'yyyy-MM')
    const day = format(date, 'yyyy-MM-dd')
    const weekStart = startOfWeek(date, { weekStartsOn: 1 })
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    const weekStartFormatted = format(weekStart, 'yyyy-MM-dd')
    const weekEndFormatted = format(weekEnd, 'yyyy-MM-dd')
    const weekRange = `${weekStartFormatted} ${weekEndFormatted}`

    result.byYear[year] = (result.byYear[year] || 0) + item.value
    result.byMonth[month] = (result.byMonth[month] || 0) + item.value
    result.byDay[day] = (result.byDay[day] || 0) + item.value
    result.byWeek[weekRange] = (result.byWeek[weekRange] || 0) + item.value
  })

  return {
    byMonth: Object.entries(result.byMonth).map(([date, value]) => ({
      label: date,
      quantity: value,
    })),
    byYear: Object.entries(result.byYear).map(([date, value]) => ({
      label: date,
      quantity: value,
    })),
    byDay: Object.entries(result.byDay).map(([date, value]) => ({ label: date, quantity: value })),
    byWeek: Object.entries(result.byWeek).map(([date, value]) => ({
      label: date,
      quantity: value,
    })),
  }
}

const charData = ref(groupByTimePeriods(data).byMonth)

const onRangeTypeChanged = () => {
  console.log('changing range')

  switch (range.value) {
    case 'Yearly':
      charData.value = groupByTimePeriods(data).byYear
      break
    case 'Weekly':
      charData.value = groupByTimePeriods(data).byWeek

      break
    case 'Daily':
      charData.value = groupByTimePeriods(data).byDay
      break
    default:
      charData.value = groupByTimePeriods(data).byMonth
      break
  }
}
</script>

<style scoped lang="scss">
@import './WidgetChart';
</style>
