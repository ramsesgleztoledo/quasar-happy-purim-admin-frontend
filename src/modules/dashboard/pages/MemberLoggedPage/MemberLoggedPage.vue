<template>
  <div v-if="!!dashboardState.membersLogged">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">List of members who have been logged in</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12 d-flex justify-content-space-between">
        <div class="text-h6">
          {{ dashboardState.membersLogged.totalOrdered }}/{{
            dashboardState.membersLogged.totalCount
          }}
          <b> have placed orders </b>
        </div>
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
          :rows="dashboardState.membersLogged.rows"
          :columns="columns"
          row-key="orderNum"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import type { MemberLoggedInterface } from '../../interfaces/member-interfaces'
import { useDashboard } from '../../composables/useDashboard'
import { useMember } from '../../composables/useMember'
import { ref } from 'vue'

const { dashboardState } = useDashboard()
const { downloadMembersLogged } = useMember()
const exportDisabled = ref(false)

const columns: QTableColumn<MemberLoggedInterface>[] = [
  {
    name: 'lastName',
    required: true,
    label: 'Last Name',
    align: 'left',
    field: 'lastName',
    sortable: true,
  },
  {
    name: 'firstName',
    required: true,
    label: 'First Name',
    align: 'left',
    field: 'firstName',
    sortable: true,
  },

  {
    name: 'spouse',
    required: true,
    label: 'Spouse',
    align: 'left',
    field: 'spouse',
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
    name: 'phone',
    field: 'phone',
    label: 'Phone',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'email',
    field: 'email',
    label: 'E-mail',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'orders',
    field: 'orders',
    label: 'Orders',
    align: 'left',
    required: true,
    sortable: true,
  },
]

const onExportToExcel = () => {
  exportDisabled.value = true
  downloadMembersLogged()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './MemberLoggedPage.scss';
</style>
