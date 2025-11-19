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

              <!-- <q-btn
                v-if="!(props.row.id as string).toLocaleLowerCase().startsWith('c_')"
                @click="() => onKeepOldValue(props.row.id)"
                size="sm"
                color="primary"
                dense
                label="Keep Old Values"
                icon="check"
                style="width: 130px"
              /> -->

              <q-checkbox
                v-model="isNotInUnchanged(props.row.id).value"
                v-if="!(props.row.id as string).toLocaleLowerCase().startsWith('c_')"
                @click="() => onKeepOldValue(props.row.id)"
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
              <!-- <q-btn
                @click="() => onRemove(props.row.id)"
                size="sm"
                color="primary"
                dense
                label="Remove"
                icon="delete"
                style="width: 100px"
              /> -->

              <q-checkbox
                v-model="props.row.selected"
                @update:model-value="
                  (value: boolean) => {
                    if (!value)
                      $q.notify({
                        type: 'success',
                        message: 'Row Removed',
                        color: 'blue',
                        textColor: 'black',
                      })
                    else
                      $q.notify({
                        type: 'success',
                        message: 'Row Restored',
                        color: 'blue',
                        textColor: 'black',
                      })
                  }
                "
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
              <!-- <q-btn
                @click="() => onKeep(props.row.id)"
                size="sm"
                color="primary"
                dense
                label="Keep"
                icon="add"
                style="width: 100px"
              /> -->
              <q-checkbox
                v-model="isNotInUnchanged(props.row.id).value"
                @click="() => onKeep(props.row.id)"
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
          class-name="table-sticky-header-column-table table-cursor-pointer-custom"
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
import { computed, onMounted, ref, watch } from 'vue'

const { compareDataGetSummary, getDetailedChanges_co } = useUploadList()

const data = ref<DataSummaryResponseInterface | undefined>(undefined)
const isReady = ref(false)
const showSummary = ref(false)
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
    data.value?.colHeaders
      .filter((item) => item != 'MemberID')
      .map((item) => ({
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
      ...Object.fromEntries(
        (data.value?.colHeaders || []).map((key, i) => [key, row.cellValues[i]]),
      ),
    })) || [],
)
const pendingAdditionData = ref(
  data.value?.tables.added.rows.map((row) => ({
    id: row.rowKey,
    selected: true,
    ...Object.fromEntries((data.value?.colHeaders || []).map((key, i) => [key, row.cellValues[i]])),
  })) || [],
)

watch(
  () => data.value?.tables.added.rows,
  () => {
    pendingAdditionData.value =
      data.value?.tables.added.rows.map((row) => ({
        id: row.rowKey,
        selected: true,
        ...Object.fromEntries(
          (data.value?.colHeaders || []).map((key, i) => [key, row.cellValues[i]]),
        ),
      })) || []
  },
)

const pendingDeletionData = computed(
  () =>
    data.value?.tables.deleted.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(
        (data.value?.colHeaders || []).map((key, i) => [key, row.cellValues[i]]),
      ),
    })) || [],
)
const unchangedMembersData = computed(() => {
  const result =
    data.value?.tables.unchanged.rows.map((row) => ({
      id: row.rowKey,
      ...Object.fromEntries(
        (data.value?.colHeaders || []).map((key, i) => [key, row.cellValues[i]]),
      ),
    })) || []

  return result
})

onMounted(() => {
  compareDataGetSummary().then((resp) => {
    data.value = resp
    showSummary.value = true
    isReady.value = true
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduceArrayToObject = (arr: any[]) => {
  return arr.reduce(
    (acc, member) => {
      const memberAux = { ...member }
      delete memberAux.id
      acc[member.id] = memberAux
      return acc
    },
    {} as Record<string, (typeof pendingUpdateData.value)[number]>,
  )
}

// const onRemove = (id: string) => {
//   if (!pendingAdditionData.value.length) return
//   // data.value.tables.added.rows = data.value.tables.added.rows.filter((row) => row.rowKey != id)
// $q.notify({
//   type: 'success',
//   message: 'Row Removed',
// })
// }

const onRemoveAll = () => {
  if (!pendingAdditionData.value.length) return
  pendingAdditionData.value = pendingAdditionData.value.map((item) => ({
    ...item,
    selected: false,
  }))
  $q.notify({
    type: 'success',
    message: 'All Rows Removed',
    color: 'blue',
    textColor: 'black',
  })
}

const onKeeAll = () => {
  if (!data.value) return
  data.value.tables.unchanged.rows = [
    ...data.value.tables.deleted.rows,
    ...data.value.tables.unchanged.rows,
  ]

  $q.notify({
    type: 'success',
    message: 'All Rows Kept',
    color: 'blue',
    textColor: 'black',
  })
}

const onKeep = (id: string) => {
  if (!data.value) return

  const unchanged = isNotInUnchanged(id).value

  if (unchanged) {
    const found = data.value?.tables?.deleted?.rows?.find((row) => row.rowKey == id)
    if (found) data.value!.tables.unchanged.rows = [found, ...data.value!.tables.unchanged.rows]

    $q.notify({
      type: 'success',
      message: 'Row Kept',
      color: 'blue',
      textColor: 'black',
    })
  } else {
    data.value.tables.unchanged.rows = data.value!.tables.unchanged.rows.filter(
      (row) => row.rowKey != id,
    )

    $q.notify({
      type: 'success',
      message: 'Row Restored',
      color: 'blue',
      textColor: 'black',
    })
  }
}

const detailChangesFlag = ref(false)
const detailRows = ref<DetailedKeyInterface[]>([])

const onShowChanges = async (id: string) => {
  const resp = await getDetailedChanges_co(id, true)
  detailRows.value = resp.filter((item) => item.fieldName != 'MemberID')
  detailChangesFlag.value = true
}

const onKeepOldValue = async (id: string) => {
  if (!data.value) return

  const unchanged = isNotInUnchanged(id).value

  // data.value.tables.updated.rows = data.value.tables.updated.rows.filter((row) => row.rowKey != id)

  if (unchanged) {
    const resp = await getDetailedChanges_co(id, true)

    const result = resp.map((member) => member.oldValue)

    data.value.tables.unchanged.rows = [
      { rowKey: id, cellValues: result },
      ...data.value.tables.unchanged.rows,
    ]
    $q.notify({
      type: 'success',
      message: 'Old Row Value Kept',
      color: 'blue',
      textColor: 'black',
    })
  } else {
    data.value.tables.unchanged.rows = data.value.tables.unchanged.rows.filter(
      (row) => row.rowKey != id,
    )
    $q.notify({
      type: 'success',
      message: 'New Row Value Kept',
      color: 'blue',
      textColor: 'black',
    })
  }
}
const onKeepAllOldValue = async () => {
  if (!data.value) return
  $q.loading.show({
    message: 'Loading',
    spinnerColor: '#f36b09',
    messageColor: '#f36b09',
  })

  const dataToProcess = data.value.tables.updated.rows.filter(
    (row) => isNotInUnchanged(row.rowKey).value,
  )

  const resp = await Promise.all(
    dataToProcess.map((row) => getDetailedChanges_co(row.rowKey, false)),
  )

  data.value.tables.unchanged.rows = [
    ...dataToProcess.map((row, i) => ({
      rowKey: row.rowKey,
      cellValues: resp[i]!.map((member) => member.oldValue),
    })),
    ...data.value.tables.unchanged.rows,
  ]
  // data.value.tables.updated.rows = []
  $q.loading.hide()

  if (dataToProcess.length)
    $q.notify({
      type: 'success',
      message: 'All Old Rows Value Kept',
      color: 'blue',
      textColor: 'black',
    })
  else
    $q.notify({
      type: 'success',
      message: 'All Old Row Values Kept',
      color: 'blue',
      textColor: 'black',
    })
}

const getDataNotInUnchanged = (array: { id: string }[]) =>
  computed(() => {
    return array.filter(
      (row) => !data.value?.tables?.unchanged?.rows?.find((row2) => row2.rowKey == row.id),
    )
  })

const onSave = () => {
  return {
    updateMembers: reduceArrayToObject(getDataNotInUnchanged(pendingUpdateData.value).value),
    addMembers: reduceArrayToObject(
      pendingAdditionData.value
        .filter((item) => item.selected)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ selected, ...itemAux }) => itemAux),
    ),
    deleteMembers: reduceArrayToObject(getDataNotInUnchanged(pendingDeletionData.value).value),
    unchangedMembers: reduceArrayToObject(unchangedMembersData.value),
  }
}

const isNotInUnchanged = (id: string) =>
  computed(() => {
    const found = !!unchangedMembersData.value.find((row) => row.id == id)
    return !found
  })

defineExpose({
  onSave,
})
</script>

<style scoped lang="scss" />
