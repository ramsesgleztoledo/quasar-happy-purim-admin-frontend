<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Order Archive</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="white-100-container" :class="{ fullscreen: isFullScreen }">
    <div class="row q-mb-sm" style="justify-content: space-between">
      <q-input outlined v-model="searchText" label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        flat
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="isFullScreen = !isFullScreen"
      />
    </div>
    <TableCustom
      class-name="table-sticky-header-column-table table-cursor-pointer-custom sticky-1-column-table"
      styles="height: 628px"
      :rows
      :columns="columns"
      row-key="id"
      @onRowClicked="
        ({ row }: any) => {
          $router.push({
            name: 'OrderArchivePage-orderDetails',
            params: {
              orderId: row.orderNum,
            },
          })
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { QTableColumn } from 'quasar'
import { convertToUSDate, convertWithCommas } from 'src/helpers'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useOrderArchive } from '../../../../composables/useOrderArchive'

const { getOrdersArchive, ordersArchiveState } = useOrderArchive()

const searchText = ref('')
const isFullScreen = ref(false)

const rows = computed(() =>
  ordersArchiveState.value.orders.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchText.value.toLowerCase()),
  ),
)

onMounted(() => getOrdersArchive())

const columns: QTableColumn[] = [
  {
    name: 'memberName',
    required: true,
    label: 'Member Name',
    align: 'left',
    field: 'memberName',
    sortable: true,
    style: 'max-width: 150px; overflow: hidden; text-overflow: ellipsis',
  },
  {
    name: 'orderNum',
    required: true,
    label: 'Order #',
    align: 'left',
    field: 'orderNum',
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
    name: 'numSent',
    field: 'numSent',
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
@import './OrderArchivePage.scss';
</style>
