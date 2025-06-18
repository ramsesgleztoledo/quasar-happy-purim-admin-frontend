<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Baskets</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>

  <div class="row q-mb-md">
    <div class="col-12 d-flex justify-content-end">
      <q-btn
        :disable="exportDisabled"
        label="Export to CSV"
        color="primary"
        icon="import_export"
        @click="onExportToExcel"
      />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table table-cursor-pinter-custom"
        styles="height: 628px"
        :rows="baskets"
        :columns="columns"
        row-key="id"
        @onRowClick="
          ({ row }) => {
            basketEdit = { ...row }
            ediBasketDialogFlag = true
          }
        "
      />
    </div>
  </div>
  <q-dialog ref="dialogEditBasketToBeShippedComponentRef" v-model="ediBasketDialogFlag" persistent>
    <EditBasketToBeShippedComponent
      :basket="basketEdit!"
      :dialogRef="dialogEditBasketToBeShippedComponentRef"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import type { QDialog, QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useShipment } from '../../composables/useShipment'
import type { BasketToBeShippedInterface } from '../../interfaces/shipment-interfaces'
import { convertToUSDate } from 'src/helpers'
import EditBasketToBeShippedComponent from './components/EditBasketToBeShippedComponent/EditBasketToBeShippedComponent.vue'

const columns: QTableColumn<BasketToBeShippedInterface>[] = [
  {
    field: 'transactionID',
    name: 'transactionID',
    label: 'Inv #',
    required: true,
    align: 'left',
    sortable: true,
  },
  // {
  //   field: 'type',
  //   name: 'type',
  //   label: 'Type',
  //   required: true,
  //   align: 'left',
  //   sortable: true,
  // },
  {
    field: 'sendTo',
    name: 'sendTo',
    label: 'Send To',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'address',
    name: 'address',
    label: 'Address',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'address2',
    name: 'address2',
    label: 'Address 2',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'city',
    name: 'city',
    label: 'City',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'state',
    name: 'state',
    label: 'State',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'zip',
    name: 'zip',
    label: 'Zip Code',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'message',
    name: 'message',
    label: 'Message',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'phone',
    name: 'phone',
    label: 'Phone',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'sendingFrom',
    name: 'sendingFrom',
    label: 'Sending From',
    required: true,
    align: 'left',
    sortable: true,
  },

  {
    field: 'route',
    name: 'route',
    label: 'Route',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'misc',
    name: 'misc',
    label: 'Misc',
    required: true,
    align: 'left',
    sortable: true,
  },

  {
    field: 'orderSubmitted',
    name: 'orderSubmitted',
    label: 'Date Submitted',
    format: (date: string) => convertToUSDate(date),
    required: true,
    align: 'left',
    sortable: true,
  },
]

const { downloadBasketsToBeShippedCSV, getBasketsToBeShipped } = useShipment()

const baskets = ref<BasketToBeShippedInterface[]>([])
const exportDisabled = ref(false)
const ediBasketDialogFlag = ref(false)
const basketEdit = ref<BasketToBeShippedInterface | undefined>(undefined)
const dialogEditBasketToBeShippedComponentRef = ref<QDialog | undefined>(undefined)

onMounted(() => {
  getBasketsToBeShipped().then((resp) => {
    baskets.value = resp
  })
})

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadBasketsToBeShippedCSV()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './BasketsToBeShipPage.scss';
</style>
