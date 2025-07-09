<template>
  <div v-if="isReady">
    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn-toggle v-model="pageView" spread no-caps :options="pageOption" />
      </div>
    </div>

    <div v-if="pageView === '1'">
      <q-table
        :style="{ height: '628px' }"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="pendingUpdateData"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
        :pagination="{
          rowsPerPage: 0,
        }"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width>
              <q-btn
                size="sm"
                dense
                label="Keep All Old Values"
                icon="check"
                style="width: 150px; background-color: white; color: var(--happypurim)"
              />
            </q-th>
            <q-th v-for="col in props.cols" :key="`${col.name}`" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="primary"
                dense
                label="Show Changes"
                icon="visibility"
                style="width: 130px; margin-right: 5px"
              />
              <q-btn
                size="sm"
                color="primary"
                dense
                label="Keep Old Values"
                icon="check"
                style="width: 130px"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="`${col.name}_${props.row.id}`">
              {{ props.row[col.name] }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-if="pageView === '2'">
      <q-table
        :style="{ height: '628px' }"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="pendingAdditionData"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
        :pagination="{
          rowsPerPage: 0,
        }"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width>
              <q-btn
                size="sm"
                dense
                label="Remove All"
                icon="delete"
                style="width: 100px; background-color: white; color: var(--happypurim)"
              />
            </q-th>
            <q-th v-for="col in props.cols" :key="`${col.name}`" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="primary"
                dense
                label="Remove"
                icon="delete"
                style="width: 100px"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="`${col.name}_${props.row.id}`">
              {{ props.row[col.name] }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-if="pageView === '3'">
      <q-table
        :style="{ height: '628px' }"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="pendingDeletionData"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
        :pagination="{
          rowsPerPage: 0,
        }"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width>
              <q-btn
                size="sm"
                dense
                label="Keep All"
                icon="add"
                style="width: 100px; background-color: white; color: var(--happypurim)"
              />
            </q-th>
            <q-th v-for="col in props.cols" :key="`${col.name}`" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="primary" dense label="Keep" icon="add" style="width: 100px" />
            </q-td>
            <q-td v-for="col in props.cols" :key="`${col.name}_${props.row.id}`">
              {{ props.row[col.name] }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-if="pageView === '4'">
      <q-table
        :style="{ height: '628px' }"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="unchangedMembersData"
        :columns="columns"
        row-key="id"
        styles="height: 360px"
        :pagination="{
          rowsPerPage: 0,
        }"
      />
    </div>
  </div>

  <!-- dialog info -->
  <q-dialog v-model="showSummary" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Upload Preview Summary</p>
        </div>
      </div>
      <q-card-section>
        <div class="row q-mb-sm">
          <h6 style="margin: 0px">{{ data?.summary.updatedCount || 0 }} Members Will be Updated</h6>
        </div>
        <div class="row q-mb-sm">
          <h6 style="margin: 0px">{{ data?.summary.addedCount || 0 }} Members Will be Added</h6>
        </div>
        <div class="row q-mb-sm">
          <h6 style="margin: 0px">{{ data?.summary.deletedCount || 0 }} Members Will be Deleted</h6>
        </div>
        <div class="row q-mb-sm">
          <h6 style="margin: 0px">
            {{ data?.summary.unchangedCount || 0 }} Members Will Remain Unchanged
          </h6>
        </div>
      </q-card-section>
      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          label="Ok"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { useUploadList } from 'src/modules/dashboard/composables/useUploadList'
import type { DataSummaryResponseInterface } from 'src/modules/dashboard/interfaces/upload-list.interfaces'
import { computed, onMounted, ref } from 'vue'

const { compareDataGetSummary } = useUploadList()

const data = ref<DataSummaryResponseInterface | undefined>(undefined)
const isReady = ref(false)
const showSummary = ref(true)

const pageView = ref('1')

const pageOption = computed(() => [
  { label: `Pending Updates (${data.value?.summary.updatedCount || 0})`, value: '1' },
  { label: `Pending Addition (${data.value?.summary.addedCount || 0})`, value: '2' },
  { label: `Pending Deletion (${data.value?.summary.deletedCount || 0})`, value: '3' },
  { label: `Unchanged Members (${data.value?.summary.unchangedCount || 0})`, value: '4' },
])

const columns = computed<QTableColumn[]>(() => {
  return (
    data.value?.colHeaders.map((item) => ({
      field: item,
      name: item,
      label: item,
      required: true,
      align: 'left',
      sortable: true,
    })) || []
  )
})

const pendingUpdateData = computed(
  () =>
    data.value?.tables.updated.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(columns.value.map((key, i) => [key.name, row.cellValues[i]])),
    })) || [],
)
const pendingAdditionData = computed(
  () =>
    data.value?.tables.added.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(columns.value.map((key, i) => [key.name, row.cellValues[i]])),
    })) || [],
)

const pendingDeletionData = computed(
  () =>
    data.value?.tables.deleted.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(columns.value.map((key, i) => [key.name, row.cellValues[i]])),
    })) || [],
)
const unchangedMembersData = computed(
  () =>
    data.value?.tables.unchanged.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(columns.value.map((key, i) => [key.name, row.cellValues[i]])),
    })) || [],
)

onMounted(() => {
  compareDataGetSummary().then((resp) => {
    data.value = resp
    isReady.value = true
  })
})
</script>

<style scoped lang="scss"></style>
