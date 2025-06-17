<template>
  <div>
    <div class="row q-mb-sm">
      <b>
        You can now send orders to friends/fmaily/colleagues outside our list! choose from our below
        options!
      </b>
    </div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.recipient as FormField).value as string"
          outlined
          label="Recipient *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.address as FormField).value as string"
          outlined
          label="Address *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.address2 as FormField).value as string"
          outlined
          label="Address 2"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.city as FormField).value as string"
          outlined
          label="City *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-select
          v-model="(realForm.state as FormField).value as string"
          outlined
          :options="statesOptions"
          label="State *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.zipCode as FormField).value as string"
          outlined
          label="Zip Code *"
          mask="#####"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.phone as FormField).value as string"
          outlined
          label="Phone *"
          mask="(###) - ### - ####"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.minCharacters(18, 'Invalid phone number')]"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="(realForm.email as FormField).value as string"
          outlined
          label="Email Address *"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.isEmail()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12 q-pl-sm q-pr-sm">
        <q-input
          type="textarea"
          v-model="(realForm.message as FormField).value as string"
          outlined
          label="Notes"
          lazy-rules
          :rules="[lazyRules.maxCharacters(255)]"
          :hint="`${((realForm.message as FormField).value as string).length}/255 character limit`"
        />
      </div>
    </div>

    <div class="row q-mt-md basket-img-row-container">
      <div
        :class="{
          'col-4': !isMobile,
          'col-6': isMobile,
        }"
        class="q-pa-sm q-mb-sm basket-img-container q-item-bordered"
        v-for="(item, i) in [1, 1, 1, 1, 11]"
        :key="i"
        style=""
      >
        <BasketImg />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col-12 d-flex justify-content-end">
        <q-btn :disable="!isValidForm()" color="primary" icon="check" label="ADD TO ORDER" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import BasketImg from '../BasketImg/BasketImg.vue'
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()

const { realForm, isValidForm } = useForm({
  recipient: { value: '', validations: [] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zipCode: { value: '', validations: [validations.required] },
  phone: { value: '', validations: [validations.required] },
  email: { value: '', validations: [validations.isEmail] },
  message: { value: '', validations: [] },
})
</script>

<style scoped lang="scss">
@import './CustomShippingBasket.scss';
</style>
