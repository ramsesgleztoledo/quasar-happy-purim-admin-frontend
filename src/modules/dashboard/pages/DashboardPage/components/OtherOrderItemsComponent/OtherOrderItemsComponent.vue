<template>
  <p class="OtherOrderItemsComponent-basket-statistics q-mb-md">Other Order Items</p>
  <div class="row q-mt-md">
    <div class="col-12">
      <div class="BasketStatisticsComponent-baskets-type-container">
        <DisplayItem
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
import DisplayItem from '../../../../components/DisplayItem/DisplayItem.vue'

const baskets = [
  {
    label: 'Members logged in:',
    value: 19,
  },
  {
    label: 'Members Currently Online:',
    value: 0,
  },
  {
    label: 'Send to all board for $50:',
    value: '$100.00',
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
@import './OtherOrderItemsComponent.scss';
</style>
