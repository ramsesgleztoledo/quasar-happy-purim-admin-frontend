<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <div class="row StepTwoCreateOrder-donations">
        <div class="col-12">
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm q-item-bordered">
              <div class="row text-h6 q-mb-sm">Donation To Charity</div>
              <div class="row">
                <p>
                  If you would like to give an additional donation, in honor of Purim through our
                  organization, please enter a $ amount below. asd
                </p>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm q-item-bordered">
              <div class="row q-mb-sm">Tomchei Shabbos of South Florida</div>
              <div class="row">
                <!-- <b style="color: var(--happypurim)">I would like to donate</b> -->
                <q-input
                  type="number"
                  v-model="donate"
                  outlined
                  label="I would like to donate"
                  lazy-rules
                  :rules="[lazyRules.greaterThan(0, false)]"
                />
                <q-btn
                  class="q-mr-sm q-ml-md"
                  style="background: var(--happypurim); color: white; max-height: 10px"
                  label="Add"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator />
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

import { ref } from 'vue'
import CustomShippingBasket from './components/CustomShippingBasket/CustomShippingBasket.vue'

const donate = ref(0)
</script>

<style scoped lang="scss">
@import './StepTwoCreateOrder.scss';
</style>
