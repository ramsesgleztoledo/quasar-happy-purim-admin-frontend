<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <CartItems />
    </div>
  </div>

  <div class="row q-mb-md">
    <div class="col-12">
      <CartBaskets />
    </div>
  </div>

  <div class="row q-mb-md">
    <div class="col-12">
      <CartIndividualSelection />
    </div>
  </div>
  <q-separator />
  <div class="row q-mb-md q-mt-sm q-pa-md">
    <div class="col-12" style="font-size: 12px">
      <!-- total -->
      <div class="row w-full justify-content-space-between q-mb-sm">
        <b>TOTAL</b>
        <div style="color: #1863b0">$ {{ convertWithCommas(data.totalBefore || 0) }}</div>
      </div>

      <div v-if="data.totalBefore">
        <!-- discounts  -->
        <div v-if="data.discount" class="row w-full justify-content-space-between q-mb-sm d-flex">
          <div class="row cursor-pointer">
            <div class="row">
              <div class="col-12 q-mr-sm">{{ data.discount.name }}</div>
              <!-- <div v-if="discount.description" class="col-12 q-mr-sm mini-text">
              ( {{ discount.description }} )
            </div> -->
            </div>

            <div>
              <q-icon size="large" name="contact_support" style="color: var(--happypurim)" />
              <q-tooltip
                style="background-color: var(--happypurim); font-size: 16px"
                transition-show="flip-right"
                transition-hide="flip-left"
                ><div>
                  Donation to charity are
                  {{ `${data.discount.excludeCharity ? 'exclude' : 'include'}` }} in discounted
                  price
                </div>
              </q-tooltip>
            </div>
          </div>

          <div style="color: green">$ -{{ convertWithCommas(data.discount.value) }}</div>
        </div>
        <!-- fee percent -->
        <div
          v-if="$moStore.getFee"
          class="row w-full justify-content-space-between q-mb-sm d-flex"
          style="color: var(--happypurim)"
        >
          <div class="row cursor-pointer">
            <div class="q-mr-sm">
              <b> {{ $moStore.getFee.description }} </b>
            </div>
          </div>

          <div>$ +{{ convertWithCommas(data.fee) }}</div>
        </div>
        <!-- fee per transaction -->
        <div
          v-if="$moStore.getFee?.perTransactionFee"
          class="row w-full justify-content-space-between q-mb-sm d-flex"
          style="color: var(--happypurim)"
        >
          <div class="row cursor-pointer">
            <div class="q-mr-sm">
              <b> Fee per transaction </b>
            </div>
          </div>

          <div>$ +{{ convertWithCommas($moStore.getFee?.perTransactionFee) }}</div>
        </div>
      </div>

      <q-separator class="q-mb-sm" />
      <!-- final total -->
      <div
        v-if="data.totalBefore"
        class="row w-full justify-content-space-between q-mb-sm"
        style="color: #cc0505"
      >
        <b>ORDER TOTAL</b>
        <b>$ {{ convertWithCommas(data.finalTotal) }}</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import CartBaskets from './CartBaskets/CartBaskets.vue'
import CartIndividualSelection from './CartIndividualSelection/CartIndividualSelection.vue'
import CartItems from './CartItems/CartItems.vue'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'
const $moStore = useMemberOrderStore()
const data = computed(() => $moStore.getCartData)
</script>

<style scoped lang="scss"></style>
