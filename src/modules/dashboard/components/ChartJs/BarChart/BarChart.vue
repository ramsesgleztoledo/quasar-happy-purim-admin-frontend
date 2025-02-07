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
// import type { ECBasicOption } from 'echarts/types/dist/shared'
import { ref, watch } from 'vue'

import VChart from 'vue-echarts'

interface BarChartPropsInterface {
  showFullScreenToggle?: boolean
  title?: string
  showLabel?: boolean
  charData: {
    label: string
    quantity: number
    color?: string
  }[]
}

const $props = defineProps<BarChartPropsInterface>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const option = ref<any>(undefined)
const isFullScreen = ref<boolean>(false)

watch(
  () => [$props.showLabel, $props.charData],
  () => {
    option.value = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: $props.showLabel ? $props.charData?.map((va) => va.label) || [] : [],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ',
        z: 2147483647,
        confine: true,
      },
      series: [
        {
          type: 'bar',
          data:
            $props.charData?.map((va) => ({
              value: va.quantity,
              name: va.label,
              itemStyle: {
                color: va.color ? va.color : '#ef6982',
              },
            })) || [],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      ],
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped lang="scss">
@import './BarChart.scss';
</style>
