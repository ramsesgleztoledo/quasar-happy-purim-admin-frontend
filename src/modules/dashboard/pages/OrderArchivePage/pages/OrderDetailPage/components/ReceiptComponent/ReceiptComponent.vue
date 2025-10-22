<template>
  <div v-if="receipt">
    <div class="row">
      <div class="col-12 justify-end d-flex">
        <q-btn label="Print Receipt" @click="printReceipt" color="primary" icon="print" />
      </div>
    </div>
    <div id="print-receipt-id" ref="printArea">
      <div class="row">
        <div class="col-12">
          <p class="text-h5"><b> Order Receipt: </b></p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 justify-content-space-between">
          <p class="text-h5">
            <b>
              {{ RECEIPT_NAME }}
            </b>
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
              <b> Order #: </b>
            </div>
            <div class="col-6">{{ receipt.transactionNumber }}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Method of Payment: </b>
            </div>
            <div class="col-6">{{ receipt.paymentMethod }}</div>
          </div>
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Sold to: </b>
            </div>
            <div class="col-6">{{ receipt.soldTo }}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b> Last 4 digits on Card: </b>
            </div>
            <div class="col-6">{{ receipt.last4DigitsOfCard }}</div>
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
            <div class="col-6">{{ receipt.authCode }}</div>
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
      <div class="row q-mb-sm" v-for="(people, i) in receipt.sendingToPeople" :key="i">
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
            <div class="col-6">{{ receipt.totalRecipients }}</div>
          </div>
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b>Total Due From Baskets: </b>
            </div>
            <div class="col-6">
              {{ receipt.dueFromBaskets ? '$' : '' }}
              {{ convertWithCommas(receipt.dueFromBaskets || 0) }}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row q-mb-sm" v-for="(item, i) in receipt.orderItems" :key="i">
        <div class="col-2">{{ item.quantity }}</div>
        <div class="col-4">{{ item.description }}</div>
        <div class="col-6">
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
              {{ item.totalPrice ? '$' : '' }}{{ convertWithCommas(item.totalPrice || 0) }}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row q-mb-sm">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row q-mb-sm">
            <div class="col-6">
              <b>Total Amount Due: </b>
            </div>
            <div class="col-6">{{ convertWithCommas(receipt.amountDue || 0) }}</div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row q-mb-sm">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b>Total Amount Paid: </b>
            </div>
            <div class="col-6">
              {{ receipt.totalAmountPaid ? '$' : '' }}
              {{ convertWithCommas(receipt.totalAmountPaid || 0) }}
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
import { useOrderArchive } from 'src/modules/dashboard/composables/useOrderArchive'
import { computed, ref } from 'vue'

const { ordersArchiveState } = useOrderArchive()
const $aStore = useAuthStore()

const receipt = computed(() => ordersArchiveState.value.selectedOrderReceipt)

const printArea = ref<HTMLElement | null | undefined>(null)

const printReceipt = () => {
  printElement('print-receipt-id')
}

const RECEIPT_NAME = computed(() => process.env.RECEIPT_NAME || '')
</script>

<style scoped lang="scss">
@import './ReceiptComponent.scss';
</style>
