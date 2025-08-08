<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Charges</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>

  <div class="row q-mb-md">
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
  </div>

  <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
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
        :pagination="{
          rowsPerPage: 0,
        }"
        :style="{ height: isFullScreen ? '800px' : '400px' }"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="charges"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <q-btn
                v-if="col.name === 'orderId'"
                flat
                color="primary"
                :label="col.value"
                :to="{
                  name: 'dashboard-transactionDetailsPage',
                  params: { transactionID: props.row.orderId },
                }"
              ></q-btn>

              <q-btn
                v-else-if="col.name === 'lastName'"
                flat
                color="primary"
                :label="col.value"
                :to="{
                  name: 'MemberLayout',
                  params: { memberId: props.row.memberId },
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
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'
import { useTransaction } from '../../composables/useTransaction'
import type { ReciprocityChargeInterface } from '../../interfaces/transaction-interfaces'
import { convertWithCommas } from 'src/helpers'

const { downloadReciprocityChargesCSV, getReciprocityCharges } = useTransaction()

const columns: QTableColumn<ReciprocityChargeInterface>[] = [
  {
    field: 'orderId',
    name: 'orderId',
    label: 'Order ID',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'type',
    name: 'type',
    label: 'Type',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'lastName',
    name: 'lastName',
    label: 'Last Name',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'firstName',
    name: 'firstName',
    label: 'First Name',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'spouse',
    name: 'spouse',
    label: 'Spouse',
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
    field: 'reciprocatingToCount',
    name: 'reciprocatingToCount',
    label: 'Reciprocating To',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'orderTotal',
    name: 'orderTotal',
    label: 'Order Total',
    required: true,
    align: 'left',
    sortable: true,
    format: (amount: number) => `$${convertWithCommas(amount)}`,
  },
]

const charges = ref<ReciprocityChargeInterface[]>([])
const exportDisabled = ref(false)
const isFullScreen = ref(false)

onMounted(() => {
  getReciprocityCharges().then((resp) => {
    charges.value = resp
  })
})

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadReciprocityChargesCSV()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './ReciprocityChargePage.scss';
</style>
