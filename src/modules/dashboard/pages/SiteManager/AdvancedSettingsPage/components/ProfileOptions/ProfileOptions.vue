<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="updateDonationBasketEnabled"
        v-model="donateBasketFlag"
        title="Enable Donate basket to Charity/Card Only Option"
      >
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <p>
                The responses to the following question will automatically subtract from the basket
                total on the Home Page. It will NOT remove them from the 'Receiving From Report'
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input
                label="Question"
                v-model="donateValue"
                outlined
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="save"
                @click="
                  () => {
                    updateDonationBasketPrompt(donateValue)
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="updateTab1AlternativeDeliveryAddressEnabled"
        v-model="alternateDeliveryFlag"
        title="Enable Alternate Delivery Address"
      >
        <!--=============================== TODO: what goes here? =============================-->
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <q-input
                label="Question"
                v-model="alternateDeliveryValue"
                outlined
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                :disable="!alternateDeliveryValue"
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    updateTab1AlternativeDeliveryAddressPrompt(alternateDeliveryValue)
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm ProfileOptions-table-content" :class="{ fullscreen: isFullScreen }">
    <div class="col-12">
      <div class="row q-mb-sm justify-content-space-between">
        <p style="margin: 0px">Additional Profile Questions/Options</p>
        <q-btn
          flat
          round
          color="primary"
          :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="isFullScreen = !isFullScreen"
        />
      </div>
      <div class="row">
        <q-btn
          @click="onAddNewOption"
          style="background: white; color: var(--happypurim)"
          icon="add"
          label="add new options"
          :disable="rowEdit?.optId === -1"
        />
      </div>
      <div class="row q-mt-sm" :style="{ height: isFullScreen ? '85%' : '400px' }">
        <div class="col-12">
          <q-table
            :pagination="{
              rowsPerPage: 0,
            }"
            style="height: 100%"
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="name"
            class="table-sticky-header-column-table"
          >
            <template v-slot:body="props">
              <q-tr :props="props" v-if="rowEdit?.optId !== props.row.optId">
                <q-td key="option" :props="props">
                  <div>
                    {{ props.row.optionText }}
                  </div>
                </q-td>
                <q-td key="showOnFrontEnd" :props="props">
                  <q-checkbox disable v-model="props.row.display" />
                </q-td>
                <q-td key="saveResponses" :props="props">
                  <q-checkbox disable v-model="props.row.dontArchive" />
                </q-td>
                <q-td key="displayOrder" :props="props">
                  <q-badge color="primary">
                    {{ props.row.order }}
                  </q-badge>
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn
                    v-if="rowEdit?.optId !== props.row.optId"
                    flat
                    style="background: var(--happypurim); color: white"
                    label="Edit"
                    @click="() => (rowEdit = { ...props.row })"
                  />
                </q-td>
              </q-tr>
              <q-tr :props="props" v-else>
                <q-td key="option" :props="props">
                  <q-input
                    label="option"
                    v-model="rowEdit!.optionText"
                    outlined
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </q-td>
                <q-td key="showOnFrontEnd" :props="props">
                  <q-checkbox v-model="rowEdit!.display" />
                </q-td>
                <q-td key="saveResponses" :props="props">
                  <q-checkbox v-model="rowEdit!.dontArchive" />
                </q-td>
                <q-td key="displayOrder" :props="props">
                  <q-input
                    label="Display Order"
                    v-model="rowEdit!.order"
                    outlined
                    lazy-rules
                    type="number"
                    :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                  />
                </q-td>
                <q-td key="edit" :props="props">
                  <div class="row justify-content-end">
                    <q-btn
                      @click="onRowUpdated"
                      class="q-mr-sm"
                      dense
                      color="primary"
                      size="sm"
                      icon="save"
                      :disable="isRowEditInvalid()"
                    />
                    <q-btn
                      v-if="rowEdit?.optId !== -1"
                      @click="onDeleted"
                      class="q-mr-sm"
                      dense
                      style="background-color: red; color: white"
                      size="sm"
                      icon="delete"
                    />
                    <q-btn @click="onClose" class="q-mr-sm" dense size="sm" icon="close" />
                  </div>
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
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import { lazyRules } from 'src/composables'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'
import type { Tab1AdditionalProfileQuestionInterface } from 'src/modules/dashboard/interfaces/advanced-settings.interfaces'
import { onMounted, ref } from 'vue'

const {
  advancedSettingsState,
  updateDonationBasketEnabled,
  updateDonationBasketPrompt,
  updateTab1AlternativeDeliveryAddressEnabled,
  updateTab1AlternativeDeliveryAddressPrompt,
  updateTab1AdditionalProfileQuestion,
  deleteTab1AdditionalProfileQuestion,
  createTab1AdditionalProfileQuestion,
} = useAdvancedSettings()

const donateBasketFlag = ref(false)
const donateValue = ref('')

const alternateDeliveryFlag = ref(false)
const alternateDeliveryValue = ref('')

const isFullScreen = ref<boolean>(false)

const columns = ref<QTableColumn<Tab1AdditionalProfileQuestionInterface>[]>([
  {
    name: 'option',
    required: true,
    label: 'Option',
    align: 'left',
    field: 'optionText',
    sortable: true,
  },
  {
    name: 'showOnFrontEnd',
    required: true,
    label: 'Show on Front-End',
    align: 'center',
    field: 'display',
  },
  {
    name: 'saveResponses',
    required: true,
    label: 'Save Responses from Year to Year',
    align: 'center',
    field: 'dontArchive',
  },
  {
    name: 'displayOrder',
    required: true,
    label: 'Display Order',
    align: 'center',
    field: 'order',
    sortable: true,
  },
  {
    name: 'edit',
    required: true,
    label: '',
    field: 'optId',
  },
])

const rows = ref<Tab1AdditionalProfileQuestionInterface[]>([])

const rowEdit = ref<Tab1AdditionalProfileQuestionInterface | undefined>(undefined)

const resetDonateBasket = () => {
  donateBasketFlag.value = advancedSettingsState.value.donateBasket.donateBasketOption
  donateValue.value = advancedSettingsState.value.donateBasket.donateBasketOptionText
}
const resetAlternativeAddress = () => {
  alternateDeliveryFlag.value =
    advancedSettingsState.value.alternativeAddress.alternateDeliveryAddressEnabled
  alternateDeliveryValue.value =
    advancedSettingsState.value.alternativeAddress.alternateDeliveryAddressPrompt
}

const resetAdditionalProfileQuestion = () => {
  rows.value = [...advancedSettingsState.value.additionalProfileQuestions]
}

onMounted(() => {
  resetDonateBasket()
  resetAlternativeAddress()
  resetAdditionalProfileQuestion()
})

const onRowUpdated = async () => {
  if (rowEdit.value?.optId === -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newValue: any = {
      ...rowEdit.value,
    }
    delete newValue.optId

    const resp = await createTab1AdditionalProfileQuestion(newValue)
    if (resp.ok)
      // TODO: remove comment here
      console.log(resp.ok)
    // rows.value[0] = resp.data!
  } else {
    const resp = await updateTab1AdditionalProfileQuestion(rowEdit.value!)
    if (resp)
      rows.value = rows.value.map((item) => {
        if (item.optId === rowEdit.value?.optId) return rowEdit.value
        return item
      })
  }
  rowEdit.value = undefined
}

const onDeleted = async () => {
  const resp = await deleteTab1AdditionalProfileQuestion(rowEdit.value?.optId as number)
  if (resp) rows.value = rows.value.filter((item) => item.optId !== rowEdit.value?.optId)

  rowEdit.value = undefined
}

const onAddNewOption = () => {
  const value = {
    optId: -1,
    optionText: '',
    order: 0,
    display: true,
    dontArchive: true,
  }
  rowEdit.value = value

  rows.value = [value, ...rows.value]
}
const onClose = () => {
  if (rowEdit.value?.optId === -1) rows.value.shift()
  rowEdit.value = undefined
}

const isRowEditInvalid = () => {
  const value = rowEdit.value
  return (
    !value?.optionText ||
    value.order === undefined ||
    value.order === null ||
    String(value.order) === '' ||
    Number(value.order) < 0
  )
}
</script>

<style scoped lang="scss">
@import './ProfileOptions';
</style>
