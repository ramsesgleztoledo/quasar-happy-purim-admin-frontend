<template>
  <div class="row">
    <h5 style="margin: 0px">
      <b> Transactions: </b>
    </h5>
  </div>
  <div class="q-pa-md" v-if="memberState.memberTransactions.length">
    <div class="row RecentOrders-container" :class="{ fullscreen: isFullScreen }">
      <div class="col-12">
        <div class="row">
          <div class="col-12 justify-content-end">
            <q-btn
              flat
              round
              color="primary"
              :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="isFullScreen = !isFullScreen"
            />
          </div>
        </div>
        <q-table
          :style="{ height: isFullScreen ? '800px' : '400px' }"
          class="table-sticky-header-column-table"
          flat
          bordered
          ref="tableRef"
          :rows="memberState.memberTransactions"
          :columns="columns"
          row-key="id"
          styles="height: 360px"
          :pagination="{
            rowsPerPage: 0,
          }"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <q-btn
                  v-if="col.name === 'tranId'"
                  flat
                  color="primary"
                  :label="col.value"
                  :to="{
                    name: 'dashboard-transactionDetailsPage',
                    params: { transactionID: col.value },
                  }"
                />

                <q-btn
                  v-else-if="col.name === 'sendEmail'"
                  size="sm"
                  color="primary"
                  label="send email"
                  @click="() => emailReceiptByTransactionId_Co(col.value)"
                />

                <div v-else>
                  {{ col.value }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <h6>No Transactions ...</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import type { MemberTransactionInterface } from 'src/modules/dashboard/interfaces/member-interfaces'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

const { memberState, emailReceiptByTransactionId_Co } = useMember()
const isFullScreen = ref(false)
// const $router = useRouter()

const columns: QTableColumn<MemberTransactionInterface>[] = [
  {
    field: 'tranId',
    name: 'sendEmail',
    label: '',
    required: true,
    align: 'left',
  },
  {
    field: 'tranId',
    name: 'tranId',
    label: 'Transaction',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'recordedBy',
    name: 'recordedBy',
    label: 'Recorded By',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'tranNameOnCard',
    name: 'tranNameOnCard',
    label: 'Name on Card',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'trancctype',
    name: 'trancctype',
    label: 'Type',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'tranPostedDate',
    name: 'tranPostedDate',
    label: 'Date',
    required: true,
    align: 'left',
    sortable: true,
    format: (date: string) => convertToUSDate(date),
  },
  {
    field: 'tranProcessedDate',
    name: 'tranProcessedDate',
    label: 'Date Processed',
    required: true,
    align: 'left',
    sortable: true,
    format: (date: string) => convertToUSDate(date),
  },
  {
    field: 'trantotalcharge',
    name: 'trantotalcharge',
    label: 'Order Total',
    required: true,
    align: 'left',
    sortable: true,
    format: (amount: number) => `$${convertWithCommas(amount)}`,
  },
  {
    field: 'paid',
    name: 'paid',
    label: 'Total Paid',
    required: true,
    align: 'left',
    sortable: true,
    format: (amount: number) => `$${convertWithCommas(amount)}`,
  },
  {
    field: 'balanceDue',
    name: 'balanceDue',
    label: 'Balance Due',
    required: true,
    align: 'left',
    sortable: true,
    format: (amount: number) => `$${convertWithCommas(amount)}`,
  },
]
</script>

<style lang="scss">
@import './OrderHistoryTable.scss';
</style>
