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
        label="Export to Excel"
        color="primary"
        icon="import_export"
        @click="onExportToExcel"
        :loading="exportDisabled"
      />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table table-cursor-pointer-custom sticky-2-column-table"
        styles="height: 628px"
        :rows="baskets"
        :columns="columns"
        row-key="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'

import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import type { BasketReceivedInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'

const columns: QTableColumn<BasketReceivedInterface>[] = [
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
    field: 'phone',
    name: 'phone',
    label: 'Phone',
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
    field: 'route',
    name: 'route',
    label: 'Route',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'sendingTo',
    name: 'sendingTo',
    label: 'Sending To',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'receivingFrom',
    name: 'receivingFrom',
    label: 'Receiving From',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'displayName',
    name: 'displayName',
    label: 'Display Name',
    required: true,
    align: 'left',
    sortable: true,
  },
]

const { getBasketReceived_Co, downloadBasketReceived_Co } = useMember()

const baskets = ref<BasketReceivedInterface[]>([])
const exportDisabled = ref(false)

onMounted(() => {
  getBasketReceived_Co().then((resp) => {
    baskets.value = resp
  })
})

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadBasketReceived_Co()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './ReceivedBasketPage.scss';
</style>
