<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <b> Gift Basket Program </b>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <b>Date and Time</b>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p style="color: #797979">Last date/time your members can login to place orders.</p>
    </div>
  </div>
  <div v-if="!basicSettingsState.settings?.hasCustomPricing">
    <div class="row">
      <div class="col-12 q-pl-sm q-pr-sm q-mt-md">
        <q-input
          v-model="realForm.costPerPerson.value"
          outlined
          label="Cost Per Person $"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          type="number"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-pl-sm q-pr-sm q-mt-md">
        <q-input
          v-model="realForm.maximumCharge.value"
          outlined
          label="Maximum Charge $"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          type="number"
          hint="(0 = no limit)"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-pl-sm q-pr-sm q-mt-md">
        <q-input
          v-model="realForm.reciprocityCharge.value"
          outlined
          label="Reciprocity Price $"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
          type="number"
          :hint="`$${realForm.reciprocityCharge.value} per Greeting/Person`"
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div
      class="q-pa-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        v-model="dateValue"
        outlined
        mask="date"
        lazy-rules
        :rules="[...dateRules]"
        label="Date"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dateValue">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div
      class="q-pa-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        outlined
        v-model="timeValue"
        label="Time"
        mask="##:## a.a"
        lazy-rules
        :rules="[...timeRules]"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeValue" mask="hh:mm aa">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
  <div class="row q-mt-sm q-mb-sm">
    <div class="col-12">
      <label> <b>Select Options</b></label>
      <div class="q-mt-md">
        <div v-for="(item, index) in options" :key="index" class="row q-mb-sm">
          <q-checkbox v-model="item.value" :label="item.label" />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 GBProgram-btn-container justify-content-space-between">
      <q-btn
        flat
        style="background: white; color: var(--happypurim)"
        label="Advanced Pricing Options"
      />
      <q-btn
        :disable="!isValidData"
        style="background: white; color: var(--happypurim)"
        icon="save"
        label="update"
        @click="onUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import { isValidDate, isValidTime } from 'src/helpers'
import { getTimeAndDate } from 'src/helpers/getTimeAndDate'
import { turnTimeAndDate } from 'src/helpers/turnTimeAndDate'
import { useBasicSettings } from 'src/modules/dashboard/composables/useBasicSettings'
import type { GiftBasketProgramFormInterface } from 'src/modules/dashboard/interfaces/basic-settings.interfaces'
import { useUI } from 'src/modules/UI/composables'
import { computed, onMounted, ref } from 'vue'

const { isMobile } = useUI()
const { basicSettingsState, updatePricingSettings } = useBasicSettings()

const dateValue = ref('')
const timeValue = ref('')
const options = ref([
  {
    value: false,
    label: `Show Last Year's Selections`,
  },
  { value: false, label: 'Enable Send To All' },
  { value: false, label: 'Enable Reciprocity' },
])

const dateRules = [(value: string) => isValidDate(value) || 'Invalid date']
const timeRules = [
  (value: string) => {
    return isValidTime(value) || 'Invalid time'
  },
]

const isValidData = computed<boolean>(() => {
  const custom = !!basicSettingsState.value.settings?.hasCustomPricing

  return (
    isValidTime(timeValue.value) &&
    isValidDate(dateValue.value) &&
    (custom || (!custom && !!isValidForm()))
  )
})

const { realForm, getFormValue, isValidForm, resetForm } = useForm({
  costPerPerson: {
    value: 0,
    validations: [validations.required, validations.greaterThan(0, true)],
  },
  maximumCharge: {
    value: 0,
    validations: [validations.required, validations.greaterThan(0, true)],
  },
  reciprocityCharge: {
    value: 0,
    validations: [validations.required, validations.greaterThan(0, true)],
  },
})

onMounted(() => {
  setOptions()
  setDateAndTime()
  resetForm(
    {
      ...basicSettingsState.value.settings,
    },
    {
      omitExtraFields: true,
      original: true,
    },
  )
})

const setOptions = () => {
  options.value[0]!.value = !!basicSettingsState.value.settings?.displayLastYears
  options.value[1]!.value = !!basicSettingsState.value.settings?.selectAllByDefault
  options.value[2]!.value = !!basicSettingsState.value.settings?.reciprocityEnabled
}

const setDateAndTime = () => {
  const date = getTimeAndDate(basicSettingsState.value.settings?.endDateTime || '')
  dateValue.value = date.dateValue
  timeValue.value = date.timeValue
}

const onUpdate = async () => {
  const date = turnTimeAndDate({
    dateValue: dateValue.value,
    timeValue: timeValue.value,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formData = getFormValue() as unknown as any

  const data: GiftBasketProgramFormInterface = {
    endDateTime: date as unknown as Date,
    displayLastYearsOrders: options.value[0]!.value,
    selectAllByDefault: options.value[1]!.value,
    reciprocityEnabled: options.value[2]!.value,
    ...formData,
  }
  await updatePricingSettings(data)
}
</script>

<style scoped lang="scss">
@import './GBProgram';
</style>
