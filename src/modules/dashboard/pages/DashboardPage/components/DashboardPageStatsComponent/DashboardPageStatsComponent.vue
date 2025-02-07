<template>
  <div class="row">
    <div class="col-4 DashboardPageStatsComponent-chart-container">
      <HalfDoughnutChart :char-data="[...dataArray]" />
    </div>

    <div class="col-8 q-pt-md">
      <div class="row">
        <div class="col-12">
          <b class="DashboardPageStatsComponent-members">Members:</b>
        </div>
      </div>
      <div class="DashboardPageStatsComponent-labels-container">
        <div class="row q-mt-sm" v-for="(data, index) in dataArray" :key="index">
          <div class="col-10">
            <div class="DashboardPageStatsComponent-left-description-container">
              <div
                class="DashboardPageStatsComponent-custom-circle"
                :style="{ backgroundColor: data.color }"
              ></div>
              <p class="DashboardPageStatsComponent-description">
                {{ data.label }}
              </p>
            </div>
          </div>
          <div class="col-2">
            <p class="DashboardPageStatsComponent-number">{{ getPercent(data.quantity).value }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HalfDoughnutChart from '../../../../components/ChartJs/HalfDoughnutChart/HalfDoughnutChart.vue'

interface DataArrayInterface {
  dataArray?: {
    label: string
    quantity: number
    color: string
  }[]
}

const $props = withDefaults(defineProps<DataArrayInterface>(), {
  dataArray: () => [
    {
      label: 'Without orders who have not logged in',
      quantity: 70,
      color: '#19c554',
    },
    {
      label: 'Without orders who have not logged in',
      quantity: 111,
      color: '#f08615',
    },
    {
      label: 'Without orders who have not logged in',
      quantity: 30,
      color: '#3c93e0',
    },
  ],
})

const total = computed<number>(() =>
  $props.dataArray.reduce((prev, current) => prev + current.quantity, 0),
)

const getPercent = (quantity: number) =>
  computed<number>(() => Number(((quantity * 100) / total.value).toFixed(2)))
</script>

<style scoped lang="scss">
@import './DashboardPageStatsComponent.scss';
</style>
