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
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { ref } from 'vue'
import VChart from 'vue-echarts'

interface DoughnutInterface {
  showFullScreenToggle?: boolean
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

const option = ref<ECBasicOption>({
  // title: {
  //   text: 'Traffic Sources',
  //   left: 'center',
  // },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
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
      // name: 'Traffic Sources',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,

      data:
        $props.charData?.map((va) => ({
          value: va.quantity,
          name: va.label,
          itemStyle: {
            color: va.color ? va.color : '#f36b09',
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
@import './HalfDoughnutChart.scss';
</style>
