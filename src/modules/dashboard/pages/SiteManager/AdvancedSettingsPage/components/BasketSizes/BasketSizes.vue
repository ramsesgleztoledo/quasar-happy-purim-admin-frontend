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
          v-model="realForm.rangeStart.value"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          label="Range Start"
          type="number"
        />
        <q-input
          outlined
          v-model="realForm.rangeEnd.value"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          label="Range End"
          type="number"
        />
        <q-input
          outlined
          v-model="realForm.basketSize.value"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          label="Basket Size"
        />
        <q-btn
          :disable="!isValidForm()"
          style="background: var(--happypurim); color: white; height: 42px"
          icon="add"
          label="Add new item"
          @click="onAddBasketSize"
        />
      </div>
      <div class="row q-mt-sm" :style="{ height: isFullScreen ? '85%' : '600px' }">
        <div class="col-12">
          <q-table
            style="height: 100%"
            flat
            bordered
            :rows="advancedSettingsState.basketSize"
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
                  {{ convertToUSDate(props.row.lastUpdated) }}
                </q-td>

                <q-td key="edit" :props="props">
                  <q-btn
                    flat
                    icon="delete"
                    style="background: var(--happypurim); color: white"
                    label="delete"
                    @click="() => deleteTab3BasketSize(props.row.id)"
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
import { lazyRules, useForm, validations } from 'src/composables'
import { convertToUSDate } from 'src/helpers'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'
import type {
  Tab3BasketSizeFormInterface,
  Tab3BasketSizeInterface,
} from 'src/modules/dashboard/interfaces/advanced-settings.interfaces'
import { ref } from 'vue'

const { advancedSettingsState, createTab3BasketSize, deleteTab3BasketSize } = useAdvancedSettings()

const { realForm, isValidForm, getFormValue, resetForm } = useForm({
  rangeStart: { value: '', validations: [validations.required, validations.greaterThan(0, true)] },
  rangeEnd: { value: '', validations: [validations.required, validations.greaterThan(0, true)] },
  basketSize: { value: '', validations: [validations.required, validations.greaterThan(0, true)] },
})

const isFullScreen = ref<boolean>(false)

const columns = ref<QTableColumn<Tab3BasketSizeInterface>[]>([
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
    field: 'lastUpdated',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },
  {
    name: 'edit',
    required: true,
    label: '',
    field: 'id',
  },
])

const onAddBasketSize = async () => {
  const data = getFormValue() as unknown as Tab3BasketSizeFormInterface
  await createTab3BasketSize(data)
  resetForm()
}
</script>

<style scoped lang="scss">
@import './BasketSizes';
</style>
