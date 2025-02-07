<template>
  <div class="row">
    <div class="col-12 top-title-col">
      <p class="CreateOrderPage-new-order">New Order</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
      <p>Quick Jump To: <a style="color: blue; cursor: pointer">ABCDEFGHJKLMNOPRSTWZ</a></p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 top-title-col">
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <p class="CreateOrderPage-title-3">Blumenfeld, George - <b>0 baskets selected.</b></p>
    </div>
  </div>
  <div class="row q-mt-sm q-mb-sm">
    <div class="col-12">
      <p>
        <b>Note:</b> Your own name will not appear on this list because you can not send to
        yourself.
      </p>
    </div>
  </div>
  <div class="row">
    <div
      class="q-mr-md q-mb-md"
      :class="{
        'col-12': isMobile,
        'item-width-200': !isMobile,
      }"
    >
      <q-select
        v-model="types"
        outlined
        :options="typesOptions"
        label="Show"
        option-label="label"
        option-value="value"
      />
    </div>
    <div
      :class="{
        'col-12': isMobile,
        'item-width-200': !isMobile,
      }"
    >
      <q-input v-model="search" outlined label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row">
    <div
      class="q-pa-lg"
      :class="{
        'col-3': !isMobile,
        'col-6': isMobile,
      }"
    >
      <div class="CreateOrderPage-options">
        <label><b> Options </b> </label>
        <div v-for="(item, index) in options" :key="index" class="row">
          <q-checkbox v-model="item.value" :label="item.label" />
        </div>
      </div>
      <div class="CreateOrderPage-send-to">
        <label>
          <b>Send to</b>
        </label>
        <div v-for="(item, index) in SendTo" :key="index" class="row">
          <q-checkbox v-model="item.value" :label="item.label" />
        </div>
      </div>
    </div>
    <div
      class="q-pa-lg"
      :class="{
        'col-3': !isMobile,
        'col-6': isMobile,
      }"
    >
      <CreateOrderLegend />
    </div>
    <div
      class="q-pa-lg"
      style="height: 460px"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-table
        style="height: 100%"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="rows"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top="props">
          <div class="q-table__title" style="padding: 2px">Items</div>

          <q-space />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:header-selection="scope">
          <q-checkbox v-model="scope.selected" />
        </template>

        <template v-slot:body-selection="scope">
          <q-checkbox
            :model-value="scope.selected"
            @update:model-value="
              (val, evt) => {
                ;(Object as any).getOwnPropertyDescriptor(scope, 'selected').set(val, evt)
              }
            "
          />
        </template>
      </q-table>
    </div>
  </div>
  <div class="row q-mt-lg cancel-save-btn-container">
    <div class="col-12">
      <q-btn
        outline
        label="CANCEL"
        class="q-mr-sm"
        style="color: #990000; border-color: #990000"
        @click="cancelOrderDialogFlag = true"
      />
      <q-btn class="q-mr-sm" label="SAVE FOR LATER" />
      <q-btn
        class="q-mr-sm"
        style="background: var(--happypurim); color: white"
        label="PLACE ORDER"
        @click="() => console.log('order ===>', { selected })"
      />
    </div>
  </div>
  <!--=============================== Dialogs =============================-->

  <!--* confirm cancel --->
  <DialogAlert
    @on-finish="(value) => console.log('on finish', { value })"
    msg="Are you sure you want to cancel this order?"
    v-model="cancelOrderDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import CreateOrderLegend from './components/CreateOrderLegend/CreateOrderLegend.vue'

import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'

import type { QTableColumn } from 'quasar'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

const { isMobile } = useUI()

const cancelOrderDialogFlag = ref(false)
const search = ref('')
const types = ref({ value: 0, label: 'Show All' })
const typesOptions = ref([{ value: 0, label: 'Show All' }])

const options = ref([
  { value: false, label: 'Reciprocity' },
  { value: false, label: 'Hidden' },
])
const SendTo = ref([
  { value: false, label: 'Send to All Board for $50' },
  { value: false, label: 'Send to Everyone for $180' },
  { value: false, label: 'Send to all Parents for $150' },
  { value: false, label: 'All Staff for $150' },
])

interface OrderItemInterface {
  id: number
  name: string
  amount: number
}

const columns = ref<QTableColumn[]>([
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
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
])
const rows = ref<OrderItemInterface[]>([
  {
    id: 1,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 2,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 3,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 4,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 5,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 6,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 7,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 8,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 9,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 10,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 11,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 12,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 13,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 14,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 15,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 16,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
  {
    id: 17,
    name: 'Cohen  Uri & Yael',
    amount: 3,
  },
])
const selected = ref([])
</script>

<style scoped lang="scss">
@import './CreateOrderPage';
</style>
