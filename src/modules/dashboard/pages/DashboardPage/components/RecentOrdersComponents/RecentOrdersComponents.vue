<template>
  <div class="q-pa-md">
    <!-- <TableCustom
      class-name="table-sticky-header-column-table"
      flat
      bordered
      title="Recent Orders"
      :rows="rows"
      :columns="columns"
      row-key="id"
      styles="height: 360px"
      @onRowClick="onRowClick"
    /> -->
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
          title="Recent Orders"
          :style="{ height: isFullScreen ? '800px' : '400px' }"
          class="table-sticky-header-column-table"
          flat
          bordered
          ref="tableRef"
          :rows="rows"
          :columns="columns"
          row-key="id"
          styles="height: 360px"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <q-btn v-if="col.name === 'id'" flat color="primary" :label="col.value" :to="{}" />

                <q-btn
                  v-else-if="col.name === 'member'"
                  flat
                  color="primary"
                  :label="col.value"
                  :to="{
                    name: 'MemberLayout',
                    params: { memberId: props.row.memberId },
                  }"
                />

                <p v-else>
                  {{ col.value }}
                </p>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { convertWithCommas } from 'src/helpers/convertWithCommas'
// import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { computed, ref } from 'vue'

const dStore = useDashboardStore()

const isFullScreen = ref<boolean>(false)

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

const rows = computed(() => [
  ...dStore.topTransactions.map((order) => ({
    id: order.order,
    processed: new Date(order.processed).toISOString(),
    amount: order.amount,
    method: order.method,
    member: order.member,
    memberId: order.memberId,
  })),
])
</script>

<style lang="scss">
@import './RecentOrdersComponents.scss';
</style>
