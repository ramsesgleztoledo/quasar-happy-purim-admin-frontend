<template>
  <div class="row q-mt-sm">
    <div
      class="q-mb-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-btn-toggle v-model="listView" spread no-caps :options="listViewOptions" />
    </div>
    <div
      class="q-mb-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="row" style="justify-content: flex-end">
        <q-btn label="View Member change" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table"
        flat
        bordered
        :title="currentView ? currentView.label : ''"
        :rows="rows"
        :columns="columns"
        row-key="id"
        styles="height: 440px"
      />
    </div>
  </div>

  <!--=============================== dialogs =============================-->

  <q-dialog v-model="contentDialogFlag">
    <q-card class="">
      <div class="row dialog-header">
        <div class="col-12">
          <p>Member Update</p>
        </div>
      </div>

      <q-card-section class="q-pt-none" style="padding: 50px">
        <div class="row">
          <p><b>16 </b> Members will be updated</p>
        </div>
        <div class="row">
          <p><b>16 </b> Members will be updated</p>
        </div>
        <div class="row">
          <p><b>16 </b> Members will be updated</p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import { useUI } from 'src/modules/UI/composables'
const { isMobile } = useUI()

const contentDialogFlag = ref(true)
const listView = ref(1)
const listViewOptions = ref([
  { label: 'View Updated Members (16)', value: 1 },
  { label: 'View Added Members (3)', value: 2 },
  { label: 'View Deleted Members (4)', value: 3 },
])

const currentView = computed(() =>
  listViewOptions.value.find((lvo) => lvo.value === listView.value),
)

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

<style scoped lang="scss">
@import './PreviewList';
</style>
