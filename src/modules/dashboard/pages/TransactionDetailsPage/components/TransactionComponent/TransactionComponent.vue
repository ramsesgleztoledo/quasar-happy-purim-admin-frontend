<template>
  <div>
    <div class="row">
      <div class="col-12 justify-end d-flex">
        <q-btn
          :disable="!transactionDetails"
          label="Print Receipt"
          @click="printReceipt"
          color="primary"
          icon="print"
        />
      </div>
    </div>

    <div v-if="!!transactionDetails" id="transaction-detail-to-print-id" ref="printArea">
      <div class="row">
        <div class="col-12">
          <p class="text-h5">
            <b> Transaction Details </b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 justify-content-end">
          <p class="text-h5">
            <b>{{ $aStore.$state.shul?.shulName }} </b>
          </p>
        </div>
      </div>
      <hr />
      <div class="row q-mb-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Invoice #: </b>
            </div>
            <div class="col-6">{{ transactionDetails.paymentInfo.tranId }}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Method of Payment: </b>
            </div>
            <div class="col-6">{{ transactionDetails.paymentInfo.method }}</div>
          </div>
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Sold to: </b>
            </div>
            <div class="col-6">
              {{ transactionDetails.summary.sendingFromName }},
              {{ transactionDetails.summary.sendingFromAddress }}
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Payment info: </b>
            </div>
            <div class="col-6">{{ transactionDetails?.paymentInfo.last4OrCheckNo }}</div>
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
            <div class="col-6">{{ transactionDetails.paymentInfo.approvalCode }}</div>
          </div>
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col">
          <b> Transaction Details: </b>
        </div>
      </div>
      <div class="row q-pa-sm" style="background-color: #f36b09 !important">
        <div class="col">
          <b> Sending To: </b>
        </div>
      </div>
      <hr style="margin: 0px" />
      <div class="row q-mb-sm" v-for="(people, i) in transactionDetails.recipients" :key="i">
        <div class="col-6">{{ people.sendingTo }}</div>
        <div class="col-6">${{ convertWithCommas(people.price || 0) }}</div>
      </div>
      <hr />
      <div class="row q-mb-sm">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b>Total Recipients: </b>
            </div>
            <div class="col-6">{{ transactionDetails.recipients.length }}</div>
          </div>
        </div>
      </div>

      <hr />
      <div
        class="row q-mb-sm"
        v-for="(item, i) in transactionDetails.additionalOrderItems"
        :key="i"
      >
        <div class="col-2">{{ item.quantity }}</div>
        <div class="col-4">{{ item.itemName }}</div>
        <div class="col-6">
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6">${{ convertWithCommas(item.price || 0) }}</div>
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
            <div class="col-6">
              ${{ convertWithCommas(transactionDetails.paymentInfo.charge || 0) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { printElement } from 'src/helpers/printHelper'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import type { TransactionDetailsInterface } from 'src/modules/dashboard/interfaces/transaction-interfaces'
import { ref } from 'vue'

const $aStore = useAuthStore()

interface TransactionComponentPropsInterface {
  transactionDetails: TransactionDetailsInterface | undefined
}

defineProps<TransactionComponentPropsInterface>()

const printArea = ref<HTMLElement | null | undefined>(null)

const printReceipt = () => {
  printElement('transaction-detail-to-print-id')
}
</script>

<style scoped lang="scss">
@import './TransactionComponent.scss';
</style>
