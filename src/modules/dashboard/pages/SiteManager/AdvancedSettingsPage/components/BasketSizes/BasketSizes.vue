<template>
  <div class="row BasketSizes-container q-pa-sm" :class="{ fullscreen: isFullScreen }">
    <div class="col-12">
      <div class="row">
        <div class="col-12 justify-content-space-between">
          <p>
            <b>Add Basket Size</b>
          </p>
          <q-btn
            flat
            round
            color="primary"
            :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="isFullScreen = !isFullScreen"
          />
        </div>
      </div>
      <div class="row q-gutter-sm q-mb-sm">
        <q-input
          outlined
          v-model="(realForm.rangeStart as FormField).value as string"
          lazy-rules
          :rules="[lazyRules.required()]"
          label="Range Start"
          type="number"
        />
        <q-input
          outlined
          v-model="(realForm.rangeEnd as FormField).value as string"
          lazy-rules
          :rules="[lazyRules.required()]"
          label="Range End"
          type="number"
        />
        <q-input
          outlined
          v-model="(realForm.basketSize as FormField).value as string"
          lazy-rules
          :rules="[lazyRules.required()]"
          label="Basket Size"
        />
        <q-btn
          :disable="!isValidForm()"
          style="background: var(--happypurim); color: white; height: 42px"
          icon="add"
          label="Add new item"
          @click="
            () => {
              // console.log('editor value', { dateValue, timeValue })
            }
          "
        />
      </div>
      <div class="row q-mt-sm" :style="{ height: isFullScreen ? '85%' : '600px' }">
        <div class="col-12">
          <q-table
            style="height: 100%"
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="name"
            class="table-sticky-header-column-table"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="rangeStart" :props="props">
                  {{ props.row.rangeStart }}
                </q-td>
                <q-td key="rangeEnd" :props="props">
                  {{ props.row.rangeEnd }}
                </q-td>
                <q-td key="basketSize" :props="props">
                  {{ props.row.basketSize }}
                </q-td>
                <q-td key="lastUpdate" :props="props">
                  {{ convertToUSDate(props.row.lastUpdate) }}
                </q-td>

                <q-td key="edit" :props="props">
                  <q-btn
                    flat
                    icon="delete"
                    style="background: var(--happypurim); color: white"
                    label="delete"
                    @click="() => console.log(props.row.id)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { convertToUSDate } from 'src/helpers'
import { ref } from 'vue'

const { realForm, isValidForm } = useForm({
  rangeStart: { value: '', validations: [validations.required] },
  rangeEnd: { value: '', validations: [validations.required] },
  basketSize: { value: '', validations: [validations.required] },
})

const isFullScreen = ref<boolean>(false)

const columns = ref<QTableColumn[]>([
  {
    name: 'rangeStart',
    required: true,
    label: 'Range Start',
    align: 'center',
    field: 'rangeStart',
    sortable: true,
  },
  {
    name: 'rangeEnd',
    required: true,
    label: 'Range End',
    align: 'center',
    field: 'rangeEnd',
  },
  {
    name: 'basketSize',
    required: true,
    label: 'Basket Size',
    align: 'center',
    field: 'basketSize',
  },
  {
    name: 'lastUpdate',
    required: true,
    label: 'Last Update',
    align: 'left',
    field: 'lastUpdate',
    format: (processed: string) => convertToUSDate(processed),
    sortable: true,
  },
  {
    name: 'edit',
    required: true,
    label: '',
    field: 'id',
  },
])

const rows = ref([
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
  {
    rangeStart: 33,
    rangeEnd: 333,
    basketSize: 'Card only',
    lastUpdate: new Date(),
    id: 1,
  },
])
</script>

<style scoped lang="scss">
@import './BasketSizes';
</style>
