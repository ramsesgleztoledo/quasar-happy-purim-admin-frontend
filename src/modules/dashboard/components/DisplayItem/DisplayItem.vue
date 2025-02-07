<template>
  <div :style="{ ...styles }">
    <div class="row" v-for="(item, index) in items" :key="index">
      <div
        class="col-12 DisplayItem-item-container"
        :style="{
          backgroundColor: index % 2 === 0 ? '#F6F6F6' : 'white',
        }"
      >
        <p>{{ item.label }}</p>
        <p :style="{ color: item.color ? item.color : '#3c5ce0' }">{{ item.value }}</p>
      </div>
    </div>
  </div>
  <div class="row" v-if="countTotal">
    <div class="col-12 DisplayItem-item-container">
      <p>
        <b> {{ totalLabel ? totalLabel : 'Total' }} </b>
      </p>
      <p>
        <b> {{ total }} </b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNumber } from 'chart.js/helpers'
import { computed } from 'vue'

interface DisplayItemPropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any
  countTotal?: boolean
  totalLabel?: string
  items: {
    label: string
    value: number | string
    color?: string
  }[]
}

const $props = defineProps<DisplayItemPropsInterface>()

const total = computed<number>(() =>
  $props.items.reduce((pre, cur) => {
    if (!isNumber(cur.value)) return pre
    return pre + cur.value
  }, 0),
)
</script>

<style scoped lang="scss">
@import './DisplayItem.scss';
</style>
