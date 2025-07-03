<template>
  <div :style="styles">
    <q-table
      :class="className"
      flat
      bordered
      title="Recent Orders"
      :rows="rows"
      :columns="columns"
      :row-key="rowKey"
      style="height: 100%"
      :pagination="{
        rowsPerPage: 20,
      }"
      @row-click="
        (evt: Event, row: any, index: number) =>
          $emit('onRowClick', {
            evt,
            row,
            index,
          })
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
}

defineProps<TablePropsInterface>()
</script>

<style scoped lang="scss">
@import './TableCustom.scss';
</style>
