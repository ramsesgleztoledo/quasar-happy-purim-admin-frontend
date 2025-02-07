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
    <Doughnut
      v-if="!deluxeChart"
      id="doughnut-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    <VChart v-else :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import VChart from 'vue-echarts'

interface DoughnutInterface {
  showFullScreenToggle?: boolean
  deluxeChart?: boolean
  title?: string
  showLabel?: boolean
  charData: {
    label: string
    quantity: number
    color?: string
  }[]
}

const isFullScreen = ref<boolean>(false)
const $props = defineProps<DoughnutInterface>()

const chartData = ref({
  labels: $props.showLabel ? $props.charData?.map((va) => va.label) || [] : [],

  datasets: [
    {
      label: $props.title,
      data: $props.charData?.map((va) => va.quantity) || [],
      backgroundColor: $props.charData?.map((va) => (va.color ? va.color : '#ef6982')) || [],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
})

const option = ref<ECBasicOption>({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
    z: 2147483647,
    confine: true,
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: $props.showLabel ? $props.charData?.map((va) => va.label) || [] : [],
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
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
})
</script>

<style scoped lang="scss">
@import './DoughnutChart.scss';
</style>
