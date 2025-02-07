<template>
  <p class="BasketStatisticsComponent-basket-statistics q-mb-md">Basket Statistics</p>

  <div class="row" style="height: 200px">
    <div class="col-6" style="height: 100%">
      <PieChart deluxe-chart :char-data="[...dataArray]" />
    </div>
    <div class="col-6">
      <div class="BasketStatisticsComponent-chart-labels-container">
        <div class="row" v-for="(data, index) in dataArray" :key="index">
          <div class="col-12">
            <div class="BasketStatisticsComponent-chart-labels-info">
              <div
                class="q-mr-sm BasketStatisticsComponent-custom-square"
                :style="{ backgroundColor: data.color }"
              ></div>
              <p class="q-mr-sm q-mb-sm">{{ data.label }}</p>
              <b class="q-ml-sm">
                {{ data.quantity }}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-12">
      <div class="BasketStatisticsComponent-baskets-type-container">
        <DisplayItem
          total-label="Total Baskets Required:"
          count-total
          :styles="{
            maxHeight: '250px',
            overflow: 'auto',
          }"
          :items="baskets"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PieChart from '../../../../components/ChartJs/PieChart/PieChart.vue'
import DisplayItem from '../../../../components/DisplayItem/DisplayItem.vue'

interface DataArrayInterface {
  dataArray?: {
    label: string
    quantity: number
    color: string
  }[]
}

// const $props =
withDefaults(defineProps<DataArrayInterface>(), {
  dataArray: () => [
    {
      label: 'Card Only',
      quantity: 214,
      color: '#387BE3',
    },
    {
      label: 'Small Basket',
      quantity: 17,
      color: '#F75656',
    },
  ],
})

const baskets = [
  {
    label: 'Baskets Required for Delivery:',
    value: 231,
  },
  {
    label: 'Baskets sold for Personal Use:',
    value: 144,
  },
  {
    label: 'Deluxe Coffee Basket ($55):',
    value: 10,
  },
  {
    label: 'Health Theme Basket ($55):',
    value: 1,
  },
  {
    label: 'Israel Theme Basket ($45)',
    value: 1,
  },
  {
    label: 'Regular Coffee Basket ($30):',
    value: 4,
  },
]
</script>

<style scoped lang="scss">
@import './BasketStatisticsComponent.scss';
</style>
