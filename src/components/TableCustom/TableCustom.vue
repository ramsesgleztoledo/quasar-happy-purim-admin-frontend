<template>
  <div :style="styles">
    <q-table
      :class="className"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      :row-key="rowKey"
      :table-row-style-fn="tableRowStyleFn"
      style="height: 100%"
      :pagination="{
        rowsPerPage: rowsPerPage ? rowsPerPage : 0,
      }"
      @row-click="
        (evt: Event, row: any, index: number) => {
          $emit('onRowClicked', {
            evt,
            row,
            index,
          })
        }
      "
    >
      <template v-slot:top="props">
        <div class="q-table__title" style="padding: 2px">{{ title }}</div>

        <q-space />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'

interface TablePropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: readonly any[]
  columns: QTableColumn[]
  className?: string
  styles?: string
  rowKey: string
  title?: string
  rowsPerPage?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableRowStyleFn?: ((row: any) => string) | undefined
}

defineEmits(['onRowClicked'])

defineProps<TablePropsInterface>()
</script>

<style scoped lang="scss">
@import './TableCustom.scss';
</style>
