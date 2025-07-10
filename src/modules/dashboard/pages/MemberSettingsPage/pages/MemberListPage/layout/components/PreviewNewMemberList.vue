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
                @click="onKeepAllOldValue"
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
                @click="() => onShowChanges(props.row.id)"
              />
              <q-btn
                @click="() => onKeepOldValue(props.row.id)"
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
                @click="onRemoveAll"
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
                @click="() => onRemove(props.row.id)"
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
                @click="onKeeAll"
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
                @click="() => onKeep(props.row.id)"
                size="sm"
                color="primary"
                dense
                label="Keep"
                icon="add"
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

  <!-- detailed data -->
  <q-dialog v-model="detailChangesFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Member Changes</p>
        </div>
      </div>
      <q-card-section>
        <TableCustom
          :tableRowStyleFn="
            (row: DetailedKeyInterface) => (row.isUpdated ? `background-color: #a5a0a0` : '')
          "
          class-name="table-sticky-header-column-table table-cursor-pinter-custom"
          styles="height: 628px"
          :rows="detailRows"
          :columns="detailColumns"
          row-key="fieldName"
        />
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
import { useQuasar, type QTableColumn } from 'quasar'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useUploadList } from 'src/modules/dashboard/composables/useUploadList'
import type {
  DataSummaryResponseInterface,
  DetailedKeyInterface,
} from 'src/modules/dashboard/interfaces/upload-list.interfaces'
import { computed, onMounted, ref } from 'vue'

const { compareDataGetSummary, getDetailedChanges_co } = useUploadList()

const data = ref<DataSummaryResponseInterface | undefined>(undefined)
const isReady = ref(false)
const showSummary = ref(true)
const $q = useQuasar()

const pageView = ref('1')

const pageOption = computed(() => [
  { label: `Pending Updates (${data.value?.tables.updated.rows.length || 0})`, value: '1' },
  { label: `Pending Addition (${data.value?.tables.added.rows.length || 0})`, value: '2' },
  { label: `Pending Deletion (${data.value?.tables.deleted.rows.length || 0})`, value: '3' },
  { label: `Unchanged Members (${data.value?.tables.unchanged.rows.length || 0})`, value: '4' },
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

const detailColumns: QTableColumn<DetailedKeyInterface>[] = [
  {
    field: 'fieldName',
    name: 'fieldName',
    label: 'Column Name',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'oldValue',
    name: 'oldValue',
    label: 'Old Value',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'newValue',
    name: 'newValue',
    label: 'New Value',
    required: true,
    align: 'left',
    sortable: true,
  },
]

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduceArrayToObject = (arr: any[]) => {
  return arr.reduce(
    (acc, member) => {
      acc[member.id] = member
      return acc
    },
    {} as Record<string, (typeof pendingUpdateData.value)[number]>,
  )
}

const onRemove = (id: string) => {
  if (!data.value) return
  data.value.tables.added.rows = data.value.tables.added.rows.filter((row) => row.rowKey != id)
  $q.notify({
    type: 'success',
    message: 'Row Removed',
  })
}

const onRemoveAll = () => {
  if (!data.value) return
  data.value.tables.added.rows = []
  $q.notify({
    type: 'success',
    message: 'All Row Removed',
  })
}

const onKeeAll = () => {
  if (!data.value) return
  data.value.tables.unchanged.rows = [
    ...data.value.tables.deleted.rows,
    ...data.value.tables.unchanged.rows,
  ]
  data.value.tables.deleted.rows = []

  $q.notify({
    type: 'success',
    message: 'All Rows Kept',
  })
}

const onKeep = (id: string) => {
  if (!data.value) return
  data.value.tables.deleted.rows = data.value?.tables.deleted.rows.filter((row) => {
    const found = row.rowKey == id
    if (!found) return true
    data.value!.tables.unchanged.rows.push(row)
    return false
  })
  $q.notify({
    type: 'success',
    message: 'Row Kept',
  })
}

const detailChangesFlag = ref(false)
const detailRows = ref<DetailedKeyInterface[]>([])

const onShowChanges = async (id: string) => {
  const resp = await getDetailedChanges_co(id, true)
  detailRows.value = resp
  detailChangesFlag.value = true
}

const onKeepOldValue = async (id: string) => {
  if (!data.value) return
  data.value.tables.updated.rows = data.value.tables.updated.rows.filter((row) => row.rowKey != id)

  const resp = await getDetailedChanges_co(id, true)

  const result = resp.map((member) => member.oldValue)

  data.value.tables.unchanged.rows = [
    { rowKey: id, cellValues: result },
    ...data.value.tables.unchanged.rows,
  ]
  $q.notify({
    type: 'success',
    message: 'Old Row Value Kept',
  })
}
const onKeepAllOldValue = async () => {
  if (!data.value) return
  $q.loading.show({
    message: 'Loading',
    spinnerColor: '#f36b09',
    messageColor: '#f36b09',
  })

  const resp = await Promise.all(
    data.value.tables.updated.rows.map((row) => getDetailedChanges_co(row.rowKey, false)),
  )

  data.value.tables.unchanged.rows = [
    ...data.value.tables.updated.rows.map((row, i) => ({
      rowKey: row.rowKey,
      cellValues: resp[i]!.map((member) => member.oldValue),
    })),
    ...data.value.tables.unchanged.rows,
  ]
  data.value.tables.updated.rows = []
  $q.loading.hide()

  $q.notify({
    type: 'success',
    message: 'All Old Row Value Kept',
  })
}

const onSave = () => {
  return {
    updateMembers: reduceArrayToObject(pendingUpdateData.value),
    addMembers: reduceArrayToObject(pendingAdditionData.value),
    deleteMembers: reduceArrayToObject(pendingDeletionData.value),
    unchangedMembers: reduceArrayToObject(unchangedMembersData.value),
  }
}

defineExpose({
  onSave,
})
</script>

<style scoped lang="scss"></style>
