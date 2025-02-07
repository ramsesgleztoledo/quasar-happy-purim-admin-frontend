<template>
  <div class="row q-mb-sm">
    <div class="col-12">
      <b> Fundraiser Coordinator </b>
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
        v-model="(realForm.contactName as FormField).value as string"
        outlined
        label="Contact Name"
        lazy-rules
        :rules="[lazyRules.required()]"
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
        v-model="(realForm.bccReceiptsTo as FormField).value as string"
        outlined
        label="Bcc Receipts To"
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
        v-model="(realForm.contactEmail as FormField).value as string"
        outlined
        label="Contact Email"
        lazy-rules
        :rules="[lazyRules.required(), lazyRules.isEmail()]"
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
        v-model="(realForm.receiptReplyTo as FormField).value as string"
        outlined
        label="Receipt Reply To"
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
        v-model="(realForm.contactPhone as FormField).value as string"
        outlined
        label="Contact Phone"
        mask="(###) - ### - ####"
        lazy-rules
        :rules="[lazyRules.required(), lazyRules.minCharacters(18, 'Invalid phone')]"
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
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()

const { realForm, isValidForm } = useForm({
  contactName: { value: '', validations: [validations.required] },
  bccReceiptsTo: { value: '', validations: [validations.required] },
  contactEmail: { value: '', validations: [validations.required, validations.isEmail] },
  receiptReplyTo: { value: '', validations: [validations.required] },
  contactPhone: { value: '', validations: [validations.required, validations.minCharacters(18)] },
})
</script>

<style scoped lang="scss">
@import './FundraiserCoordinator.scss';
</style>
