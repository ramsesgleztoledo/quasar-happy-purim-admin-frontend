<template>
  <div class="row q-mb-sm q-pl-sm">
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
        v-model="realForm.contactName.value"
        outlined
        label="Contact Name *"
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
        v-model="realForm.bccReceiptsTo.value"
        outlined
        label="Bcc Receipts To"
        lazy-rules
        :rules="[]"
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
        v-model="realForm.contactEmail.value"
        outlined
        label="Contact Email *"
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
        v-model="realForm.replyTo.value"
        outlined
        label="Receipt Reply To *"
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
        v-model="realForm.contactPhone.value"
        outlined
        label="Contact Phone *"
        class="regular-number-input"
        type="number"
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
        @click="onUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import { useBasicSettings } from 'src/modules/dashboard/composables/useBasicSettings'
import type { FundraiserCoordinatorFormInterface } from 'src/modules/dashboard/interfaces/basic-settings.interfaces'
import { useUI } from 'src/modules/UI/composables'
import { onMounted } from 'vue'

const { isMobile } = useUI()
const { basicSettingsState, updateFundraiserCoordinator } = useBasicSettings()

const { realForm, isValidForm, resetForm, getFormValue } = useForm({
  contactName: { value: '', validations: [validations.required] },

  contactEmail: { value: '', validations: [validations.required, validations.isEmail] },

  bccReceiptsTo: { value: '' },

  replyTo: { value: '', validations: [validations.required] },

  contactPhone: {
    value: '',
    validations: [validations.required],
  },
})

onMounted(() => {
  resetForm(
    {
      ...basicSettingsState.value.settings,
    },
    {
      omitExtraFields: true,
    },
  )
})

const onUpdate = async () => {
  const data = getFormValue() as unknown as FundraiserCoordinatorFormInterface
  data.contact = getFormValue().contactName || ''

  await updateFundraiserCoordinator(data)
}
</script>

<style scoped lang="scss">
@import './FundraiserCoordinator.scss';
</style>
