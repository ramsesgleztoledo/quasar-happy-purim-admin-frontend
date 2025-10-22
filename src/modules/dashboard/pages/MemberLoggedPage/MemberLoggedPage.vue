<template>
  <div v-if="!!dashboardState.membersLogged">
    <div class="row">
      <div class="col-12 top-title-col justify-content-space-between">
        <div style="height: 100%; display: flex">
          <p class="page-main-title">Logged In Members</p>
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

    <div class="row">
      <div class="col-12 d-flex">
        <div class="text-h6">
          Out of the {{ dashboardState.membersLogged.rows.length }} members who have logged in,
          {{ dashboardState.membersLogged.totalOrdered }} have placed orders.
        </div>
      </div>
    </div>

    <div class="row white-container" :class="{ fullscreen: isFullScreen }">
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
          class-name="table-sticky-header-column-table table-cursor-pointer-custom"
          styles="height: 628px"
          :rows="dashboardState.membersLogged.rows"
          :columns="columns"
          row-key="orderNum"
          @onRowClicked="
            ({ row }: any) => {
              $router.push({
                name: 'MemberLayout',
                params: {
                  memberId: row.memberID,
                },
              })
            }
          "
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
const { downloadMembersLogged_Co } = useMember()
const exportDisabled = ref(false)
const isFullScreen = ref(false)

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
  downloadMembersLogged_Co()
    .catch(console.error)
    .finally(() => (exportDisabled.value = false))
}
</script>

<style scoped lang="scss">
@import './MemberLoggedPage.scss';
</style>
