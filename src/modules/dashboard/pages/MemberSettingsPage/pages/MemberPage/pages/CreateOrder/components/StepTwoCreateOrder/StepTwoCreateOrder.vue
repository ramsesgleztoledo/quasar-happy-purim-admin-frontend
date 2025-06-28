<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <div
        v-if="memberOrderState.orgSettings?.donateBasketOption"
        class="row StepTwoCreateOrder-donations"
      >
        <div class="col-12">
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm q-item-bordered">
              <div class="row text-h6 q-mb-sm">Donation To Charity</div>
              <div
                class="row"
                v-for="option in memberOrderState.additionalCharityOptions"
                :key="option.id"
              >
                <div v-html="option.message"></div>
              </div>
            </div>
          </div>
          <q-separator />
          <div v-for="charity in charities" :key="charity.id">
            <div class="row q-pa-sm q-mb-sm">
              <div class="col-12 q-pa-sm q-item-bordered">
                <div class="row q-mb-sm">
                  <b>
                    {{ charity.description }}
                  </b>
                </div>
                <div class="row justify-content-space-between">
                  <b class="q-pa-sm" style="color: var(--happypurim)"> I would like to donate</b>
                  <div class="row">
                    <q-input
                      type="number"
                      v-model="charity.value"
                      outlined
                      label="amount"
                      lazy-rules
                      :rules="[lazyRules.greaterThan(0, false)]"
                    />
                    <q-btn
                      :disable="donationDisable(charity)"
                      @click="() => donate(charity)"
                      class="q-mr-sm q-ml-md"
                      style="background: var(--happypurim); color: white; max-height: 10px"
                      label="Add"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-separator />
              </div>
            </div>
          </div>
        </div>
        <q-separator />
      </div>
      <div class="row q-pa-sm q-mb-sm">
        <div class="col-12 q-pa-sm q-item-bordered">
          <CustomShippingBasket />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules } from 'src/composables'

import { ref, watch } from 'vue'
import CustomShippingBasket from './components/CustomShippingBasket/CustomShippingBasket.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type { CharityType } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
const { memberOrderState, addOrRemoveDonation } = useMemberOrder()

const charities = ref<CharityType[]>([])

const donationDisable = (charity: CharityType) => {
  return (
    charity.value === undefined ||
    charity.value === null ||
    Number(charity.value) <= 0 ||
    !!memberOrderState.value.orderItems.find((oi) => oi.itemId === charity.id)
  )
}

const donate = async (charity: CharityType) => {
  await addOrRemoveDonation(true, charity)
}

watch(
  () => memberOrderState.value.charityOptions,
  () => {
    charities.value = memberOrderState.value.charityOptions.map((item) => ({
      ...item,
      value: memberOrderState.value.orderItems.find((oi) => oi.itemId === item.id)?.price || 0,
    }))
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
@import './StepTwoCreateOrder.scss';
</style>
