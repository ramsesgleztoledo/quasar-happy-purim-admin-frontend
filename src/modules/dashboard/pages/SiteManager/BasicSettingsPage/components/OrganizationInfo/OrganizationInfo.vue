<template>
  <div class="row q-mb-sm">
    <div class="col-12">
      <b> Organization Information </b>
    </div>
  </div>
  <div class="row">
    <div class="col-12 q-pl-sm q-pr-sm q-mt-md">
      <q-input
        v-model="realForm.address.value"
        outlined
        label="Address *"
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
      <q-input v-model="realForm.address2.value" outlined label="Address 2" />
    </div>
    <div
      class="q-pl-sm q-pr-sm q-mt-md"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        v-model="realForm.city.value"
        outlined
        label="City *"
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
        v-model="realForm.zip.value"
        outlined
        label="Zip Code *"
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
        popup-content-class="q-menu-300"
        v-model="realForm.state.value"
        outlined
        :options="statesOptions"
        label="State *"
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
import { statesOptions } from 'src/modules/dashboard/data'
import type { OrganizationInformationFormInterface } from 'src/modules/dashboard/interfaces/basic-settings.interfaces'
import { useUI } from 'src/modules/UI/composables'
import { onMounted } from 'vue'

const { isMobile } = useUI()
const { basicSettingsState, updateOrganizationInformation } = useBasicSettings()

const { realForm, isValidForm, resetForm, getFormValue } = useForm({
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: {
    value: '',
    validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
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
  const data = getFormValue() as unknown as OrganizationInformationFormInterface

  await updateOrganizationInformation(data)
}
</script>

<style scoped lang="scss">
@import './OrganizationInfo';
</style>
