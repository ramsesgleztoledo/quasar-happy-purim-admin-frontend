<template>
  <div class="row">
    <div class="col-12 top-title-col justify-content-space-between">
      <div style="height: 100%; display: flex">
        <p class="page-main-title">Baskets</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
      <q-btn
        :disable="exportDisabled"
        label="Export to Excel"
        color="primary"
        icon="import_export"
        @click="onExportToExcel"
        :loading="exportDisabled"
      />
    </div>
  </div>

  <!-- <div class="row q-mb-md">
    <div class="col-12 d-flex justify-content-end">
      <q-btn
        :disable="exportDisabled"
        label="Export to Excel"
        color="primary"
        icon="import_export"
        @click="onExportToExcel"
        :loading="exportDisabled"
      />
    </div>
  </div> -->
  
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
          :style="{ height: isFullScreen ? '800px' : '628px' }"
          class="table-sticky-header-column-table"
          flat
          bordered
          ref="tableRef"
          :rows="baskets"
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
                  v-if="col.name === 'edit'"
                  icon="edit"
                  flat
                  color="primary"
                  @click="
                    () => {
                      basketEdit = { ...props.row }
                      ediBasketDialogFlag = true
                    }
                  "
                />
                <q-btn
                  v-else-if="col.name === 'transactionID'"
                  flat
                  color="primary"
                  :label="col.value"
                  :to="{
                    name: 'dashboard-transactionDetailsPage',
                    params: { transactionID: props.row.transactionID },
                  }"
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


  <q-dialog ref="dialogEditBasketToBeShippedComponentRef" v-model="ediBasketDialogFlag" persistent>
    <EditBasketToBeShippedComponent
      @onValueUpdated="onValueUpdated"
      :basket="basketEdit!"
      :dialogRef="dialogEditBasketToBeShippedComponentRef"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import type { QDialog, QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'
import { useShipment } from '../../composables/useShipment'
import type {
  BasketToBeShippedInterface,
  BasketToBeShippedUpdateInterface,
} from '../../interfaces/shipment-interfaces'
import { convertToUSDate } from 'src/helpers'
import EditBasketToBeShippedComponent from './components/EditBasketToBeShippedComponent/EditBasketToBeShippedComponent.vue'

const isFullScreen = ref(false)

const columns: QTableColumn<BasketToBeShippedInterface>[] = [
  {
    field: 'transactionID',
    name: 'edit',
    label: '',
    required: true,
    align: 'left',
  },
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

const onValueUpdated = (value: BasketToBeShippedUpdateInterface) => {
  baskets.value = baskets.value.map((basket) => {
    if (basket.shippingID === value.shippingID)
      return {
        ...basket,
        ...value,
      }
    return basket
  })
}
</script>

<style scoped lang="scss">
@import './BasketsToBeShipPage.scss';
</style>
