<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Email Campaign Detail</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row q-mt-md q-mb-md">
    <div class="col-12">
      <q-item class="EmailStatsCampaignPage-item">
        <q-item-section
          ><q-item-label> <b> Campaign ID </b> </q-item-label>
          <q-item-label caption> 14450 </q-item-label></q-item-section
        >
        <q-item-section
          ><q-item-label> <b> Date </b> </q-item-label>
          <q-item-label caption>
            {{ convertToUSDate(new Date().toISOString()) }}
          </q-item-label></q-item-section
        >
        <q-item-section
          ><q-item-label> <b> Subject </b> </q-item-label>
          <q-item-label caption> Welcome to our Fundraiser! </q-item-label></q-item-section
        >
        <q-item-section
          ><q-item-label> <b> From </b> </q-item-label>
          <q-item-label caption> ane Cohen (support@shaarei.org) </q-item-label></q-item-section
        >
      </q-item>
    </div>
  </div>
  <div class="row q-mb-sm">
    <div
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-btn-toggle
        v-model="tableView"
        spread
        no-caps
        :options="tableViewOption"
        style="height: 100%"
      />
    </div>

    <div
      class="justify-content-end"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
        'q-mt-sm': isMobile,
      }"
    >
      <q-input outlined v-model="searchText" label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table table-cursor-pinter-custom"
        styles="height: 628px"
        :rows="archive"
        :columns="columns"
        row-key="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { QTableColumn } from 'quasar'
import { convertToUSDate, convertWithCommas } from 'src/helpers'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()

const searchText = ref('')

const tableView = ref('1')
const tableViewOption = ref([
  { label: 'Delivered (20)', value: '1' },
  { label: 'Dropped (1)', value: '2' },
  { label: 'Deferred (44)', value: '3' },
  { label: 'Bounced (12)', value: '4' },
])

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

<style scoped lang="scss">
@import './EmailStatsCampaignPage.scss';
</style>
