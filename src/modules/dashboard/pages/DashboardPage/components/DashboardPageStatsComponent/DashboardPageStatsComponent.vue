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
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { generateRandomColor } from 'src/helpers'

interface DataArrayInterface {
  label: string
  quantity: number
  color: string
}

const dashboardStore = useDashboardStore()

const colors = ['#19c554', '#f08615', '#3c93e0']

const dataArray = computed<DataArrayInterface[]>(() => [
  ...dashboardStore.membersOrdersGraph.map((item, index) => ({
    label: item.status,
    quantity: item.total,
    color: colors[index] || generateRandomColor(),
  })),
])

const total = computed<number>(() =>
  dataArray.value.reduce((prev, current) => prev + current.quantity, 0),
)

const getPercent = (quantity: number) =>
  computed<number>(() => Number(((quantity * 100) / total.value).toFixed(2)))
</script>

<style scoped lang="scss">
@import './DashboardPageStatsComponent.scss';
</style>
