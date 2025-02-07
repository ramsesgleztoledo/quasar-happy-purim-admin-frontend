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
        @click="
          () => {
            console.log('editor value', { dateValue, timeValue })
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isValidDate, isValidTime } from 'src/helpers'
import { useUI } from 'src/modules/UI/composables'
import { computed, ref } from 'vue'

const { isMobile } = useUI()

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
    console.log('is valid the time?', {
      value,
      isValid: isValidTime(value),
    })

    return isValidTime(value) || 'Invalid time'
  },
]

const isValidData = computed<boolean>(
  () => isValidTime(timeValue.value) && isValidDate(dateValue.value),
)
</script>

<style scoped lang="scss">
@import './GBProgram';
</style>
