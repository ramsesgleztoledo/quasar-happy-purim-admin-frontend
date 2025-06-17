<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <CartItems />
    </div>
  </div>
  <q-separator />
  <div class="row q-mb-md">
    <div class="col-12">
      <CartBaskets />
    </div>
  </div>
  <q-separator />
  <div class="row q-mb-md">
    <div class="col-12">
      <CartIndividualSelection />
    </div>
  </div>
  <q-separator />
  <div class="row q-mb-md q-mt-sm q-pa-md">
    <div class="col-12" style="font-size: 12px">
      <div class="row w-full justify-content-space-between q-mb-sm">
        <b>TOTAL</b>
        <div style="color: #1863b0">${{ convertWithCommas(100) }}</div>
      </div>
      <div class="row w-full justify-content-space-between q-mb-sm d-flex">
        <div class="row cursor-pointer">
          <div class="q-mr-sm">10% Off</div>
          <q-icon name="contact_support" style="color: var(--happypurim)" />
          <q-tooltip
            style="background-color: var(--happypurim); font-size: 16px"
            transition-show="flip-right"
            transition-hide="flip-left"
            ><div>Donation to charity are included in discounted price</div>
          </q-tooltip>
        </div>

        <div style="color: #1863b0">${{ convertWithCommas(100) }}</div>
      </div>
      <q-separator class="q-mb-sm" />
      <div class="row w-full justify-content-space-between q-mb-sm" style="color: #cc0505">
        <b>ORDER TOTAL</b>
        <b>${{ convertWithCommas(100) }}</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import CartBaskets from './CartBaskets/CartBaskets.vue'
import CartIndividualSelection from './CartIndividualSelection/CartIndividualSelection.vue'
import CartItems from './CartItems/CartItems.vue'
</script>

<style scoped lang="scss"></style>
