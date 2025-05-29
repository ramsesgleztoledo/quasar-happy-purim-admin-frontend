<template>
  <div
    class="WidgetChart-container"
    :class="{ fullscreen: isFullScreen }"
    style="display: flex; flex-direction: column"
  >
    <div class="row q-mb-sm" style="justify-content: flex-end">
      <q-btn
        style="font-size: 10px"
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

    <div class="row" v-for="(dataAux, i) in charData" :key="i">
      <div class="col-12 WidgetChart-earned" :style="{ color: dataAux.color }">
        <div class="row">
          <p>{{ dataAux.label }}</p>
          <p>
            ({{ preFix ? preFix : ''
            }}{{ convertWithCommas(dataAux.data[dataAux.data.length - 1]?.quantity)
            }}{{ subFix ? subFix : '' }})
          </p>
        </div>
      </div>
      <div class="col-12 WidgetChart-description">
        {{ dataAux.data[dataAux.data.length - 1]?.label }}
      </div>
    </div>
    <div class="row" style="flex: 1; align-items: flex-end">
      <div class="col-12 WidgetChart-graph" :style="{ height: isFullScreen ? '600px' : '' }">
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
import { generateRandomColor } from 'src/helpers'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import type {
  DataItemInterface,
  DataType,
  GroupedDataInterface,
  WidgetCharPropsInterface,
} from './widget-chart-interfaces'

const $props = withDefaults(defineProps<WidgetCharPropsInterface>(), {
  data: () => ({
    dates: [
      '2025-01-01',
      '2025-01-01',
      '2025-01-01',
      '2025-01-03',
      '2025-02-01',
      '2025-01-01',
      '2025-03-10',
      '2025-03-15',
      '2025-04-05',
      '2025-04-07',
      '2025-05-20',
      '2025-05-25',
      '2025-06-01',
      '2025-06-15',
      '2025-07-04',
      '2025-07-14',
      '2025-08-08',
      '2025-08-20',
      '2025-09-01',
      '2025-09-10',
      '2025-10-05',
      '2025-10-15',
      '2025-11-01',
      '2025-11-25',
      '2025-12-10',
      '2025-12-20',
      '2026-01-02',
      '2026-01-05',
      '2026-02-01',
      '2026-02-10',
      '2026-03-15',
      '2026-03-20',
      '2026-04-25',
      '2026-04-30',
      '2026-05-01',
      '2026-05-20',
      '2026-06-10',
      '2026-06-15',
      '2026-07-05',
      '2026-07-20',
      '2026-08-01',
      '2026-08-15',
      '2026-09-01',
      '2026-09-25',
      '2026-10-05',
      '2026-10-20',
      '2026-11-01',
      '2026-11-15',
      '2026-12-01',
      '2026-12-20',
      '2027-01-05',
      '2027-01-15',
      '2029-01-15',
    ],
    data: [
      {
        label: 'label 1',
        color: generateRandomColor(),
        data: [
          20, 30, 24, 15, 30, 10, 50, 40, 60, 25, 80, 90, 45, 35, 70, 85, 95, 10, 11, 12, 55, 65,
          75, 85, 95, 10, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25, 35, 400,
        ],
      },
      {
        label: 'label 2',
        color: generateRandomColor(),
        data: [
          0, 10, 0, 0, 30, 10, 50, 40, 60, 25, 80, 90, 45, 35, 0, 85, 95, 10, 11, 12, 55, 0, 75, 85,
          0, 10, 15, 400, 35, 45, 55, 65, 75, 85, 95, 0, 11, 12, 0, 14, 123, 16, 17, 18, 300, 20,
          21, 22, 23, 24, 25, 35, 20,
        ],
      },
      {
        label: 'label 3',
        color: generateRandomColor(),
        data: [
          0, 10, 0, 0, 30, 10, 50, 40, 60, 25, 80, 90, 45, 35, 0, 85, 95, 10, 11, 12, 55, 0, 75, 85,
          0, 10, 343, 400, 232, 45, 343, 65, 75, 85, 95, 0, 11, 12, 0, 14, 123, 16, 17, 18, 300, 43,
          21, 22, 23, 24, 25, 35, 677,
        ],
      },
    ],
  }),
})

const isFullScreen = ref<boolean>(false)
const range = ref('Monthly')
const rangeOptions = ref(['Monthly', 'Yearly', 'Weekly', 'Daily'])

const groupByTimePeriods = (data: DataItemInterface): GroupedDataInterface[] => {
  const finalResult: GroupedDataInterface[] = []
  const labels = data.dates

  for (let i = 0; i < data.data.length; i++) {
    const dataAux = data.data[i]!

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
    dataAux.data.forEach((item, index) => {
      const date = parseISO(labels[index]!)
      const year = format(date, 'yyyy')
      const month = format(date, 'yyyy-MM')
      const day = format(date, 'yyyy-MM-dd')
      const weekStart = startOfWeek(date, { weekStartsOn: 1 })
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      const weekStartFormatted = format(weekStart, 'yyyy-MM-dd')
      const weekEndFormatted = format(weekEnd, 'yyyy-MM-dd')
      const weekRange = `${weekStartFormatted} ${weekEndFormatted}`

      result.byYear[year] = (result.byYear[year] || 0) + item
      result.byMonth[month] = (result.byMonth[month] || 0) + item
      result.byDay[day] = (result.byDay[day] || 0) + item
      result.byWeek[weekRange] = (result.byWeek[weekRange] || 0) + item
    })

    finalResult.push({
      byMonth: Object.entries(result.byMonth).map(([date, value]) => ({
        label: date,
        quantity: value,
        color: dataAux.color,
      })),
      byYear: Object.entries(result.byYear).map(([date, value]) => ({
        label: date,
        quantity: value,
        color: dataAux.color,
      })),
      byDay: Object.entries(result.byDay).map(([date, value]) => ({
        label: date,
        quantity: value,
        color: dataAux.color,
      })),
      byWeek: Object.entries(result.byWeek).map(([date, value]) => ({
        label: date,
        quantity: value,
        color: dataAux.color,
      })),
      color: dataAux.color,
      label: dataAux.label,
    })
  }

  return finalResult
}

const getDataBy = (data: DataItemInterface, type: DataType) => {
  return groupByTimePeriods(data).map((item) => ({
    data: item[type],
    color: item.color,
    label: item.label,
  }))
}

const charData = ref(getDataBy($props.data, 'byMonth'))

const onRangeTypeChanged = () => {
  console.log('changing range')

  switch (range.value) {
    case 'Yearly':
      charData.value = getDataBy($props.data, 'byYear')
      break
    case 'Weekly':
      charData.value = getDataBy($props.data, 'byWeek')

      break
    case 'Daily':
      charData.value = getDataBy($props.data, 'byDay')
      break
    default:
      charData.value = getDataBy($props.data, 'byMonth')
      break
  }
}
</script>

<style scoped lang="scss">
@import './WidgetChart';
</style>
