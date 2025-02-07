<template>
  <div class="row q-mb-sm">
    <div class="col-12">
      <b> Organization Information </b>
    </div>
  </div>
  <div class="row">
    <div class="col-12 q-pl-sm q-pr-sm q-mt-md">
      <q-input
        v-model="(realForm.address as FormField).value as string"
        outlined
        label="Address"
        lazy-rules
        :rules="[lazyRules.required()]"
      />
    </div>
  </div>
  <div class="row">
    <div
      class="q-pl-sm q-pr-sm q-mt-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        v-model="(realForm.address2 as FormField).value as string"
        outlined
        label="Address 2"
      />
    </div>
    <div
      class="q-pl-sm q-pr-sm q-mt-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        v-model="(realForm.city as FormField).value as string"
        outlined
        label="City"
        lazy-rules
        :rules="[lazyRules.required()]"
      />
    </div>
  </div>
  <div class="row">
    <div
      class="q-pl-sm q-pr-sm q-mt-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        v-model="(realForm.zipCode as FormField).value as string"
        outlined
        label="Zip Code"
        mask="#####"
        lazy-rules
        :rules="[lazyRules.required(), lazyRules.maxCharacters(5), lazyRules.minCharacters(5)]"
      />
    </div>
    <div
      class="q-pl-sm q-pr-sm q-mt-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-select
        v-model="(realForm.state as FormField).value as string"
        outlined
        :options="statesOptions"
        label="State"
        lazy-rules
        :rules="[lazyRules.required()]"
      />
    </div>
  </div>
  <div class="row q-mt-sm">
    <div class="col-12 justify-content-end">
      <q-btn
        :disable="!isValidForm()"
        style="background: white; color: var(--happypurim)"
        icon="save"
        label="update"
        @click="
          () => {
            // console.log('editor value', { dateValue, timeValue })
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()

const { realForm, isValidForm } = useForm({
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zipCode: {
    value: '',
    validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
  },
})
</script>

<style scoped lang="scss">
@import './OrganizationInfo';
</style>
