<template>
  <div class="row">
    <div class="col-12 top-title-col">
      <p class="CreateOrderPage-new-order">New Order by Code</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 top-title-col">
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <p class="CreateOrderPage-title-3">Blumenfeld, George - <b>3 baskets selected.</b></p>
    </div>
  </div>

  <div class="row q-mt-md">
    <q-input v-model="search" outlined label="Code Number" />
    <q-btn
      class="q-ml-sm"
      style="background: var(--happypurim); color: white"
      label="add order"
      @click="() => console.log('order ===>', { selected })"
    />
  </div>

  <div class="row">
    <div class="col-12 q-pa-lg" style="height: 460px">
      <q-table
        style="height: 100%"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:top="props">
          <div class="q-table__title" style="padding: 2px">Orders</div>

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

        <template v-slot:body-cell-delete="props">
          <q-td style="display: flex; justify-content: flex-end">
            <q-btn
              color="red"
              icon="delete"
              flat
              dense
              @click="
                () => {
                  console.log(props.row.id)
                  deleteOrderDialogFlag = true
                }
              "
            />
          </q-td>
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

      <q-btn
        class="q-mr-sm"
        style="background: var(--happypurim); color: white"
        label="PLACE ORDER"
        @click="() => console.log('order ===>', { selected })"
      />
    </div>
  </div>
  <!--=============================== Dialogs =============================-->
  <!--* confirm delete --->
  <DialogAlert
    @on-finish="(value) => console.log('on finish', { value })"
    msg="Are you sure you want to delete this order?"
    v-model="deleteOrderDialogFlag"
  />
  <!--* confirm cancel --->
  <DialogAlert
    @on-finish="(value) => console.log('on finish', { value })"
    msg="Are you sure you want to cancel this order?"
    v-model="cancelOrderDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
import { ref } from 'vue'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'

const search = ref('')
const deleteOrderDialogFlag = ref(false)
const cancelOrderDialogFlag = ref(false)

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
  {
    name: 'delete',
    required: true,
    label: '',
    align: 'left',
    field: 'delete',
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
])
const selected = ref([])
</script>

<style scoped lang="scss">
@import './CreateOrderByCode';
</style>
