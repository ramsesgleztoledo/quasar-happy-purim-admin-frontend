<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Items table</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div v-if="!!description" class="row q-mb-md">
    <div class="col-12 text-h5">
      <b> {{ description }} </b>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table table-cursor-pointer-custom"
        styles="height: 628px"
        :rows="ordersArchiveState.itemDetails"
        :columns="columns"
        row-key="orderNum"
        title="Items"
        @onRowClicked="
          ({ row }: any) => {
            $router.push({
              name: 'dashboard-transactionDetailsPage',
              params: {
                transactionID: row.orderNum,
              },
            })
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useOrderArchive } from '../../composables/useOrderArchive'
import { useRoute } from 'vue-router'
import type { QTableColumn } from 'quasar'
import type { ItemDetailsInterface } from '../../interfaces/order-interfaces'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'

const { getItemTableByItemId, ordersArchiveState } = useOrderArchive()
const $route = useRoute()
const description = ref<string>('')

console.log(ordersArchiveState)

onMounted(async () => {
  const itemId = $route.params.itemId
  description.value = $route.query.description as string
  getItemTableByItemId(Number(itemId))
})

const columns: QTableColumn<ItemDetailsInterface>[] = [
  {
    name: 'Qty',
    required: true,
    label: 'Qty#',
    align: 'left',
    field: 'quantity',
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
    name: 'orderNum',
    required: true,
    label: 'Order #',
    align: 'left',
    field: 'orderNum',
    sortable: true,
  },
  {
    name: 'lastName',
    field: 'lastName',
    label: 'Last Name',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'firstName',
    field: 'firstName',
    label: 'First Name',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'spouse',
    field: 'spouse',
    label: 'Spouse',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'address',
    field: 'address',
    label: 'Address',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'address2',
    field: 'address2',
    label: 'Address2',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'city',
    name: 'city',
    label: 'City',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'state',
    name: 'state',
    label: 'State',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'zip',
    name: 'zip',
    label: 'Zip Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'email',
    name: 'email',
    label: 'Email',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'phone',
    name: 'phone',
    label: 'Phone',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    field: 'displayName',
    name: 'displayName',
    label: 'Display Name',
    align: 'left',
    required: true,
    sortable: true,
  },
]
</script>

<style scoped lang="scss">
@import './ItemsPage.scss';
</style>
