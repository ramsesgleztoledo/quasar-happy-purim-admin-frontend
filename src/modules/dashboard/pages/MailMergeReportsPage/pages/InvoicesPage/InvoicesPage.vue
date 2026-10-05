<template>
  <div class="row">
    <div class="col-12 top-title-col justify-content-space-between">
      <div style="height: 100%; display: flex">
        <p class="page-main-title">
          Invoices ({{ `${reciprocity ? 'Reciprocal' : 'Non-Reciprocal'}` }})
        </p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>

      <q-btn label="Print" @click="printReceipt" color="primary" icon="print" />
    </div>
  </div>

  <div id="print-receipt-invoices-id" ref="printArea">
    <table v-for="invoice in invoices" :key="invoice.tranid">
      <tbody>
        <tr>
          <td>
            <span class="invoice-school">{{ $aStore.$state.shul?.shulName }}</span
            ><br />
            <span class="invoice-address" v-html="invoice.memberAddress" />
            <br /><br />

            <table class="invoice-table-2">
              <tbody>
                <tr>
                  <td>Invoice #</td>
                  <td>
                    <span class="invoice-weight-bold">{{ invoice.tranid }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Invoice Date:</td>
                  <td>
                    <span class="invoice-weight-bold">{{ new Date(invoice.tranPostedDate) }}</span>
                  </td>
                </tr>
                <tr v-if="!$aStore.$state.shul?.isHrhClient">
                  <td>Notes:</td>
                  <td>
                    <b
                      ><span id="rptInvoices_lblDescription2_0"
                        >Invoice for Mishloach Manot Order</span
                      >
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <br />Bill To:<br />
                    <span class="invoice-weight-bold" v-html="invoice.memberAddress"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td></td>
          <td style="text-align: right" valign="top">
            <span class="invoice-title">INVOICE</span><br />
            <span class="invoice-app">HappyPurim.com</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <hr />
            <table cellspacing="0" style="border-collapse: collapse">
              <tbody>
                <tr v-for="(recipient, index) in invoice.recipients" :key="recipient.m_id">
                  <td>
                    <span class="recipient-style">{{ index + 1 }}</span
                    >.
                    <span class="recipient-style"
                      >{{ recipient.m_LastName }}, {{ recipient.m_FName }}
                      {{ `${recipient.m_SFName ? `and ${recipient.m_SFName}` : ``}` }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <table style="font-size: 8pt; width: 100%; border-collapse: collapse" cellspacing="0">
              <tbody>
                <tr v-for="orderItem in invoice.orderItems" :key="orderItem.itemID">
                  <td>
                    <span>{{ orderItem.description }}:</span>
                    {{ orderItem.m_LastName }}, {{ orderItem.m_FName }}
                    {{ `${orderItem.m_SFName ? `and ${orderItem.m_SFName}` : ``}` }}
                  </td>

                  <td style="text-align: right; width: 200px">
                    {{ orderItem.quantity }}@ ${{ convertWithCommas(orderItem.price) }} .... ${{
                      convertWithCommas(orderItem.price * orderItem.quantity)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
          </td>
        </tr>
        <tr>
          <td colspan="3" align="right" style="font: normal 10pt arial; text-align: right">
            Total Amount Due:
            <span class="invoice-amount-due"
              ><span class="invoice-total"
                >${{ convertWithCommas(invoice.tranTotalCharge) }}</span
              ></span
            >
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div v-html="invoice.invoiceText" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { printElement } from 'src/helpers/printHelper'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import { useReport } from 'src/modules/dashboard/composables/useReport'
import type { InvoiceDataInterface } from 'src/modules/dashboard/interfaces/report.interface'
import { ref } from 'vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const { query } = useRoute()
const { getInvoices } = useReport()

const reciprocity = computed(() => {
  const re = (query.reciprocity as string) || ''
  return re.toLowerCase() === 'true'
})

const invoices = ref<InvoiceDataInterface[]>([])
const $aStore = useAuthStore()

const getInvoicesData = async (value: boolean) => {
  const resp = await getInvoices(value)
  invoices.value = resp
}

watch(
  reciprocity,
  (newVal) => {
    getInvoicesData(newVal).catch((err) => {
      console.error('Error fetching invoices:', err)
    })
  },
  { immediate: true },
)

const printReceipt = () => {
  printElement('print-receipt-invoices-id')
}
</script>

<style scoped lang="scss" src="./InvoicesPage.scss" />
