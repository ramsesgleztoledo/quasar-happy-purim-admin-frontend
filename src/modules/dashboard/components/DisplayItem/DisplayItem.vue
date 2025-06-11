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

        <p
          @click="() => onItemCLicked(item)"
          :style="{
            color: item.color ? item.color : 'black',
            cursor: item.redirectTo || item.hover ? 'pointer' : '',
          }"
        >
          {{ item.value }}
          <q-tooltip v-if="item.hover" transition-show="flip-right" transition-hide="flip-left"
            ><div v-html="item.hover"></div>
          </q-tooltip>
        </p>
      </div>
    </div>
  </div>
  <div class="row" v-if="countTotal != null">
    <div class="col-12 DisplayItem-item-container">
      <p>
        <b> {{ totalLabel ? totalLabel : 'Total' }} </b>
      </p>
      <p>
        <b> {{ countTotal }} </b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ItemBasketInterface } from '../../interfaces/item-interfaces'

interface DisplayItemPropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any
  countTotal?: number
  totalLabel?: string
  items: ItemBasketInterface[]
}

const $router = useRouter()

defineProps<DisplayItemPropsInterface>()

const onItemCLicked = (item: ItemBasketInterface) => {
  if (!item.redirectTo) return
  return $router.push(item.redirectTo)
}
</script>

<style scoped lang="scss">
@import './DisplayItem.scss';
</style>
