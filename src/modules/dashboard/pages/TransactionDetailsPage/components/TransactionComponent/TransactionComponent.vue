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
            <b> Transaction Details: </b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 justify-content-space-between">
          <p class="text-h5">
            <b>{{ RECEIPT_NAME }} </b>
          </p>
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
      <!--=============================== here =============================-->

      <div class="row q-mb-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Processed on: </b>
            </div>
            <div class="col-6">
              {{ convertToUSDate(transactionDetails.paymentInfo.tranPostedDate) }}
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
      <!--=========================== END OF SECTION ===========================-->

      <div class="row q-mb-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Sold to: </b>
            </div>
            <div class="col-6">
              {{ transactionDetails.summary.sendingFromName }}
              <br />
              {{ transactionDetails.summary.sendingFromAddress }}
            </div>
          </div>
        </div>
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
      <div class="row q-pa-sm" style="background-color: var(--happypurim) !important">
        <div class="col">
          <b> Sending To: </b>
        </div>
      </div>
      <hr style="margin: 0px" />
      <div class="row q-mb-sm" v-for="(people, i) in transactionDetails.recipients" :key="i">
        <div class="col-6">{{ people.sendingTo }}</div>
        <div class="col-6">
          {{ people.price ? '$' : '' }}{{ convertWithCommas(people.price || 0) }}
        </div>
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
      <template v-if="transactionDetails.additionalOrderItems.length">
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
              <div class="col-6">
                {{ item.price ? '$' : '' }}{{ convertWithCommas(item.price || 0) }}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </template>
      <div class="row q-mb-sm">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row q-mb-sm">
            <div class="col-6">
              <b>Settlement Amount: </b>
            </div>
            <div class="col-6">
              {{ transactionDetails.paymentInfo.charge ? '$' : ''
              }}{{ convertWithCommas(transactionDetails.paymentInfo.charge || 0) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertToUSDate, convertWithCommas } from 'src/helpers'
import { printElement } from 'src/helpers/printHelper'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import type { TransactionDetailsInterface } from 'src/modules/dashboard/interfaces/transaction-interfaces'
import { computed, ref } from 'vue'

const $aStore = useAuthStore()

interface TransactionComponentPropsInterface {
  transactionDetails: TransactionDetailsInterface | undefined
}

defineProps<TransactionComponentPropsInterface>()

const printArea = ref<HTMLElement | null | undefined>(null)

const printReceipt = () => {
  printElement('transaction-detail-to-print-id')
}

const RECEIPT_NAME = computed(() => process.env.RECEIPT_NAME || '')
</script>

<style scoped lang="scss">
@import './TransactionComponent.scss';
</style>
