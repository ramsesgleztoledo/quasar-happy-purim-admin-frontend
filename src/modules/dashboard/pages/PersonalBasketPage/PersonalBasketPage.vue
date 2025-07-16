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
        :rows="baskets"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <q-btn
                v-if="col.name === 'transactionID'"
                flat
                color="primary"
                :label="col.value"
                :to="{
                  name: 'dashboard-transactionDetailsPage',
                  params: { transactionID: props.row.transactionID },
                }"
              ></q-btn>

              <q-btn
                v-else-if="col.name === 'firstName'"
                flat
                color="primary"
                :label="col.value"
                :to="{
                  name: 'MemberLayout',
                  params: { memberId: props.row.memberID },
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
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { onMounted, ref } from 'vue'

// import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import type { MemberPersonalBasketInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'

const { getMemberPersonalBasket_Co, downloadMemberPersonalBasketCSV_Co } = useMember()

const columns: QTableColumn<MemberPersonalBasketInterface>[] = [
  {
    field: 'transactionID',
    name: 'transactionID',
    label: 'Order #',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'quantity',
    name: 'quantity',
    label: 'Quantity',
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
    field: 'phone',
    name: 'phone',
    label: 'Phone',
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
    field: 'email2',
    name: 'email2',
    label: 'Alternate Email',
    required: true,
    align: 'left',
    sortable: true,
  },
]

const baskets = ref<MemberPersonalBasketInterface[]>([])
const exportDisabled = ref(false)
const isFullScreen = ref(false)

onMounted(() => {
  getMemberPersonalBasket_Co().then((resp) => {
    baskets.value = resp
  })
})

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadMemberPersonalBasketCSV_Co()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './PersonalBasketPage.scss';
</style>
