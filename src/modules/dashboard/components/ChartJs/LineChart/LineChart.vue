<template>
  <div class="white-100-container" :class="{ fullscreen: isFullScreen }">
    <div v-if="showFullScreenToggle" class="row q-mb-sm" style="justify-content: flex-end">
      <q-btn
        flat
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="isFullScreen = !isFullScreen"
      />
    </div>
    <VChart :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import VChart from 'vue-echarts'
interface BarChartPropsInterface {
  showFullScreenToggle?: boolean
  title?: string
  showLabel?: boolean
  showSeriesLabel?: boolean
  showAreaStyle?: boolean
  charData: {
    label: string
    color: string
    data: {
      label: string
      quantity: number
      color?: string
    }[]
  }[]
}

const isFullScreen = ref<boolean>(false)
const $props = defineProps<BarChartPropsInterface>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const option = ref<any>(undefined)

watch(
  () => [$props.showLabel, $props.charData],
  () => {
    option.value = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: $props.showLabel ? $props.charData[0]?.data.map((va) => va.label) || [] : [],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} - ({b}) : {c} ',
        z: 2147483647,
        confine: true,
      },
      series: [
        ...($props.charData?.map((data) => ({
          name: data.label,
          type: 'line',
          data:
            data.data.map((va) => ({
              value: va.quantity,
              name: va.label,
              itemStyle: {
                color: va.color ? va.color : '#ef6982',
              },
            })) || [],
          label: {
            show: !!$props.showSeriesLabel,
          },
          labelLine: {
            show: false,
          },
          lineStyle: {
            color: data.color ? data.color : '#ef6982',
          },
          areaStyle: $props.showAreaStyle ? { color: data.color } : undefined,
        })) || []),
      ],
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped lang="scss">
@import './LineChart.scss';
</style>
