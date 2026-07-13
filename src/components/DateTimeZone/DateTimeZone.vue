<template>
  <div class="row q-mb-sm">
    <div
      class="q-pa-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        readonly
        v-model="value.dateValue"
        outlined
        mask="##/##/####"
        lazy-rules
        :rules="[...dateRules]"
        label="Date *"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <!-- :options="dateOptionsFn" -->
              <q-date v-model="value.dateValue" mask="MM/DD/YYYY">
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
        readonly
        outlined
        v-model="value.timeValue"
        label="Time *"
        mask="##:## a.a"
        lazy-rules
        :rules="[...timeRules]"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <!-- :options="timeOptionsFn" -->
              <q-time v-model="value.timeValue" mask="hh:mm aa">
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
  <div class="row q-mb-sm">
    <div class="row q-pa-sm" style="color: #ff00009c; font-weight: 100; font-style: italic">
      Please note: this date and time selection is base in your current location.
    </div>
    <div class="col-12 q-pa-sm">
      <q-select
        disable
        use-input
        v-model="value.timeZoneValue"
        outlined
        :options="filteredTimeZoneOptions"
        label="Time Zone *"
        lazy-rules
        :rules="[lazyRules.required()]"
        @filter="timeZoneFilterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results</q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.label.replace('_', ' ') }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:selected>
          {{ value.timeZoneValue?.replace('_', ' ') }}
        </template>
      </q-select>
    </div>
  </div>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { lazyRules } from 'src/composables'
import { isValidDate, isValidTime } from 'src/helpers'
// import { turnTimeAndDateUSA } from 'src/helpers/turnTimeAndDate'
import { useUI } from 'src/modules/UI/composables'
import {
  computed,
  ref,
  // watch
} from 'vue'
const { isMobile } = useUI()

interface DateTimeZonePropsInterface {
  modelValue: {
    dateValue: string
    timeValue: string
    timeZoneValue?: string
  }
}
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
const $props = withDefaults(defineProps<DateTimeZonePropsInterface>(), {
  modelValue: () => ({
    dateValue: '',
    timeValue: '',
    timeZoneValue: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  }),
})

const $emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const dateRules = [(value: string) => isValidDate(value) || 'Invalid date']
const timeRules = [
  (value: string) => {
    return isValidTime(value) || 'Invalid time'
  },
]
const filteredTimeZoneOptions = ref<string[]>(['', ''])
const timeZones: string[] = Intl.supportedValuesOf('timeZone') || []

const timeZoneFilterFn = (val: string, update: any) => {
  update(() => {
    const needle = val.toLowerCase()
    filteredTimeZoneOptions.value = timeZones.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

// watch(
//   value,
//   (re) => {
//     console.log(
//       turnTimeAndDateUSA({
//         dateValue: re.dateValue,
//         timeValue: re.timeValue,
//         timeZone: re.timeZoneValue!,
//       }),
//     )
//   },
//   { deep: true },
// )
</script>

<style scoped lang="scss" src="./DateTimeZone.scss" />
