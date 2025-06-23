<template>
  <div class="row">
    <div class="col-12 justify-end d-flex">
      <q-btn label="Print Receipt" @click="printReceipt" color="primary" icon="print" />
    </div>
  </div>
  <div id="print-receipt-id" ref="printArea">
    <div class="row">
      <div class="col-12">
        <p class="text-h5">
          <b> Transaction Details </b>
        </p>
      </div>
    </div>
    <hr />
    <div class="row q-mb-sm">
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <b> Transaction #: </b>
          </div>
          <div class="col-6">123</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <b> Method of Payment: </b>
          </div>
          <div class="col-6">paypal</div>
        </div>
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <b> Sold to: </b>
          </div>
          <div class="col-6">pepe</div>
        </div>
      </div>
      <div class="col-6" v-if="false">
        <div class="row">
          <div class="col-6">
            <b> Last 4 digits on Card: </b>
          </div>
          <div class="col-6">4544</div>
        </div>
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <b> Approval #: </b>
          </div>
          <div class="col-6">XXDC</div>
        </div>
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col">
        <b> Transaction Details: </b>
      </div>
    </div>
    <div class="row q-pa-sm" style="background-color: #ef698287 !important">
      <div class="col">
        <b> Sending To: </b>
      </div>
    </div>
    <hr style="margin: 0px" />
    <div class="row q-mb-sm" v-for="(people, i) in [1, 1, 11, , 1, 1]" :key="i">
      <div class="col-12">{{ people }}</div>
    </div>
    <hr />
    <div class="row q-mb-sm">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <b>Total Recipients: </b>
          </div>
          <div class="col-6">33</div>
        </div>
      </div>
    </div>

    <hr />
    <div class="row q-mb-sm" v-for="(item, i) in [1, 1, 1, 1]" :key="i">
      <div class="col-2">{{ item }}</div>
      <div class="col-4">{{ item }}</div>
      <div class="col-6">
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">${{ convertWithCommas(0) }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row q-mb-sm">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="row q-mb-sm">
          <div class="col-6">
            <b>Settlement Amount: </b>
          </div>
          <div class="col-6">${{ convertWithCommas(0) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { printHelper } from 'src/helpers/printHelper'

import { ref } from 'vue'

const printArea = ref<HTMLElement | null | undefined>(null)

const printReceipt = () => {
  printHelper(printArea.value)
}
</script>

<style scoped lang="scss">
@import './TransactionComponent.scss';
</style>
