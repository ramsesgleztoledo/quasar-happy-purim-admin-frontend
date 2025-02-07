<template>
  <div class="q-pa-md">
    <TableCustom
      class-name="table-sticky-header-column-table"
      flat
      bordered
      title="Recent Orders"
      :rows="rows"
      :columns="columns"
      row-key="id"
      styles="height: 360px"
    />
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'

const columns: QTableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'Order #',
    align: 'left',
    field: 'id',
    // format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'processed',
    required: true,
    label: 'Processed',
    align: 'left',
    field: 'processed',
    format: (processed: string) => convertToUSDate(processed),
    sortable: true,
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'amount',
    format: (amount: number) => `$${convertWithCommas(amount)}`,
    sortable: true,
  },
  {
    name: 'method',
    required: true,
    label: 'Method',
    align: 'left',
    field: 'method',
    sortable: true,
  },
  {
    name: 'member',
    required: true,
    label: 'Member',
    align: 'left',
    field: 'member',
    sortable: true,
  },
]

const rows = [
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
  {
    id: 8219430,
    processed: new Date().toISOString(),
    amount: 24400.82,
    method: 'Credit Card',
    member: 'Green, Ari',
  },
]
</script>

<style lang="scss">
@import './RecentOrdersComponents.scss';
</style>
