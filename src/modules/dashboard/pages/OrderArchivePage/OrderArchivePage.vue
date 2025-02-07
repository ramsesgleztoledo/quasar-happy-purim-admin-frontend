<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Order Archive</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <q-input outlined v-model="searchText" label="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="row">
        <div class="col-12">
          <TableCustom
            class-name="table-sticky-header-column-table table-cursor-pinter-custom"
            styles="height: 628px"
            :rows="archive"
            :columns="columns"
            row-key="id"
            title="Archived"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { QTableColumn } from 'quasar'
import { convertToUSDate, convertWithCommas } from 'src/helpers'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'

const searchText = ref('')

const archive = [
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
  {
    id: 1,
    orderNumber: 13616548,
    date: new Date(),
    memberName: 'Jane',
    setNumber: 1315311,
    method: '-',
    total: 36.33,
    authCode: 10019,
    nameOnCard: 'John',
  },
]

const columns: QTableColumn[] = [
  {
    name: 'orderNumber',
    required: true,
    label: 'Order#',
    align: 'left',
    field: 'orderNumber',
    // format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Date Added',
    align: 'left',
    field: 'date',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },

  {
    name: 'memberName',
    required: true,
    label: 'Member Name',
    align: 'left',
    field: 'memberName',
    sortable: true,
  },
  {
    name: 'setNumber',
    field: 'setNumber',
    label: '#Sent',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'method',
    field: 'method',
    label: 'Method',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'total',
    field: 'total',
    label: 'Total',
    align: 'left',
    format: (total: number) => `$${convertWithCommas(total)}`,
    required: true,
    sortable: true,
  },
  {
    name: 'authCode',
    field: 'authCode',
    label: 'Auth Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'nameOnCard',
    field: 'nameOnCard',
    label: 'Name on Card',
    align: 'left',
    required: true,
    sortable: true,
  },
]
</script>

<style scoped lang="scss"></style>
