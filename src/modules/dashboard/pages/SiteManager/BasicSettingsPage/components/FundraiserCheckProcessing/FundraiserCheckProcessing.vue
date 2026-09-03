<template>
  <div class="row q-mb-sm q-pl-sm">
    <div class="col-12">
      <b> HP Processing Users </b>
    </div>
  </div>
  <div class="row">
    <div class="q-pl-sm q-pr-sm q-mt-md col-12">
      <q-input
        v-model="realForm.payeeCheckName.value"
        outlined
        label="Payee Check Name"
        lazy-rules
        maxlength="50"
        readonly
        :hint="`${realForm.payeeCheckName.value.length}/50 characters`"
        :rules="[lazyRules.required(), lazyRules.maxCharacters(50)]"
      />
    </div>
    <div class="q-pl-sm q-pr-sm q-mt-md col-12">
      <q-input
        v-model="realForm.payeeEmail.value"
        outlined
        label="Payee Email"
        lazy-rules
        readonly
        :rules="[lazyRules.required(), lazyRules.isEmail()]"
      />
    </div>
  </div>

  <!-- <div class="row q-mt-sm">
    <div class="col-12 justify-content-end">
      <q-btn
        :disable="!isValidForm()"
        style="background: white; color: var(--happypurim)"
        icon="save"
        label="update"
        @click="onUpdate"
      />
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import { useBasicSettings } from 'src/modules/dashboard/composables/useBasicSettings'
// import type { FundraiserCheckProcessingFormInterface } from 'src/modules/dashboard/interfaces/basic-settings.interfaces'

import { onMounted } from 'vue'

const {
  basicSettingsState,
  // updateCheckProcessing
} = useBasicSettings()

const {
  realForm,
  // isValidForm,
  resetForm,
  // getFormValue
} = useForm({
  payeeCheckName: { value: '', validations: [validations.required, validations.maxCharacters(50)] },

  payeeEmail: { value: '', validations: [validations.required, validations.isEmail] },
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

// const onUpdate = async () => {
//   const data = getFormValue() as unknown as FundraiserCheckProcessingFormInterface

//   await updateCheckProcessing(data)
// }
</script>

<style scoped lang="scss">
@import './FundraiserCheckProcessing.scss';
</style>
