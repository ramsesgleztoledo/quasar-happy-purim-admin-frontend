<template>
  <div class="q-pa-md">
    <TableCustom
      class-name="table-sticky-header-column-table"
      flat
      bordered
      title="Transactions"
      :rows="memberState.memberTransactions"
      :columns="columns"
      row-key="id"
      styles="height: 500px"
    />
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import type { MemberTransactionInterface } from 'src/modules/dashboard/interfaces/member-interfaces'
import { useMember } from 'src/modules/dashboard/composables/useMember'

const { memberState } = useMember()

const columns: QTableColumn<MemberTransactionInterface>[] = [
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
