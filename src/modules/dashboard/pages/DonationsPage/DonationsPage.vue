<template>
  <!-- <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Charity Breakdown</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div> -->
  <div class="row">
    <div class="col-12 top-title-col justify-content-space-between">
      <div style="height: 100%; display: flex">
        <p class="page-main-title">Charity Breakdown</p>
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

  <!-- <div class="row q-mb-md" v-if="donations.length">
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
      <TableCustom
        v-if="donations.length"
        class-name="table-sticky-header-column-table table-cursor-pointer-custom"
        styles="height: 628px"
        :rows="donations"
        :columns="columns"
        row-key="id"
        @onRowClicked="
          ({ row }: any) => {
            $router.push({
              name: 'dashboard-transactionDetailsPage',
              params: {
                transactionID: row.orderNumber,
              },
            })
          }
        "
      />
      <div v-else>No Charity Donations</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'
import { useTransaction } from '../../composables/useTransaction'
import type { DonationInterface } from '../../interfaces/transaction-interfaces'
import { convertWithCommas } from 'src/helpers'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'

const isFullScreen = ref(false)

const columns: QTableColumn<DonationInterface>[] = [
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'amount',
    format: (amount: number) => `$${convertWithCommas(amount,{
              dontAllowZero: true
            })}`,
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'orderNumber',
    required: true,
    label: 'Order #',
    align: 'left',
    field: 'orderNumber',
    sortable: true,
  },

  {
    field: 'lastName',
    name: 'lastName',
    required: true,
    label: 'Last Name',
    align: 'left',
    sortable: true,
  },
  {
    field: 'firstName',
    name: 'firstName',
    required: true,
    label: 'First Name',
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
    field: 'email',
    name: 'email',
    label: 'E-mail',
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
]
const exportDisabled = ref(false)

const { getDonations, downloadCharityCSV } = useTransaction()

const donations = ref<DonationInterface[]>([])

onMounted(() => {
  getDonations().then((resp) => {
    donations.value = resp
  })
})

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadCharityCSV()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './DonationsPage.scss';
</style>
