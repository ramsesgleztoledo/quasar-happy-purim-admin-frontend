<template>
  <div class="row q-mb-sm">
    <div class="col-12">
      <b> Payment Processing </b>
    </div>
  </div>
  <div class="row q-mb-md">
    <div class="col-12">
      <q-btn-toggle v-model="processingType" spread no-caps :options="processingTypeOptions" />
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <template v-if="processingType === 1">
        <div class="row">
          <div
            class="q-pl-sm q-pr-sm q-mt-md"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <q-input
              v-model="(realForm.paidToName as FormField).value as string"
              outlined
              label="Paid to Name"
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
              v-model="(realForm.paidToEmail as FormField).value as string"
              outlined
              label="Paid to Email"
              lazy-rules
              :rules="[lazyRules.required(), lazyRules.isEmail()]"
            />
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-12 justify-content-end">
            <q-btn
              :disable="!isValidForm()"
              style="background: white; color: var(--happypurim)"
              icon="save"
              label="save and confirm"
              @click="
                () => {
                  // console.log('editor value', { dateValue, timeValue })
                }
              "
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="row">
          <div class="col-12">
            <p>
              I agree to pay money owed to HP within
              <b> 15 days </b>
              of fundraiser's close or a
              <b> $150 penalty </b>
              will be incurred.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-checkbox v-model="agreement" label="I agree to this terms" />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-12 justify-content-end">
            <q-btn
              :disable="!agreement"
              style="background: white; color: var(--happypurim)"
              icon="save"
              label="save and confirm"
              @click="
                () => {
                  // console.log('editor value', { dateValue, timeValue })
                }
              "
            />
          </div>
        </div>
      </template>
      <InfoDialog v-model="agreementDialogFlag" title="Payment Processing" :innerHTML="innerHTML" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoDialog from 'src/components/InfoDialog/InfoDialog.vue'
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { useUI } from 'src/modules/UI/composables'
import { ref, watch } from 'vue'

const { isMobile } = useUI()

const agreementDialogFlag = ref(false)
const innerHTML = ref(`
<p>
              I agree to pay money owed to HP within
              <b> 15 days </b>
              of fundraiser's close or a
              <b> $150 penalty </b>
              will be incurred.
            </p>
`)
const agreement = ref(false)
const processingType = ref(1)
const processingTypeOptions = ref([
  { label: 'HP Processing', value: 1 },
  { label: 'Use Own Processing', value: 2 },
])

const { realForm, isValidForm } = useForm({
  paidToName: { value: '', validations: [validations.required] },
  paidToEmail: { value: '', validations: [validations.required, validations.isEmail] },
})

watch(agreement, (value) => {
  if (value) agreementDialogFlag.value = true
})
</script>

<style scoped lang="scss">
@import './PaymentProcessing';
</style>
