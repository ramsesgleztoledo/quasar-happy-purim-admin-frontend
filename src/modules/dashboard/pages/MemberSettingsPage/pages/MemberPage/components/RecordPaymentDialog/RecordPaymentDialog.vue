<template>
  <q-card>
    <div class="row dialog-header">
      <div class="col-12">
        <p>Record Payment</p>
      </div>
    </div>
    <q-card-section class="row items-center">
      <div class="row">
        <div class="col-12"><b> Payment Type </b></div>
        <div class="col-12 q-mt-sm">
          Payment Use this feature to record payments against prior invoices.
        </div>
      </div>
      <div class="RecordPaymentDialog-container">
        <div class="row q-mt-md">
          <div class="col-12" style="display: flex; justify-content: center">
            <q-btn-toggle
              v-model="paymentType"
              push
              glossy
              toggle-color="primary"
              :options="[
                { label: 'Check', value: 0, icon: 'credit_score' },
                { label: 'Credit Card', value: 1, icon: 'credit_card' },
                { label: 'Credit/Other', value: 2, icon: 'payments' },
              ]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <template v-if="paymentType === 0">
              <div class="row q-mt-lg q-mb-sm">
                <div class="col-12 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(checkForm.number as FormField).value as string"
                    outlined
                    label="Check Number"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(checkForm.date as FormField).value as string"
                    outlined
                    mask="date"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                    label="Check Date"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="(checkForm.date as FormField).value as string">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <!-- <q-input
                    type="date"
                    v-model="(checkForm.date as FormField).value as string"
                    outlined
                    label="Check Date"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  /> -->
                </div>
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    type="number"
                    v-model="(checkForm.amount as FormField).value as string"
                    outlined
                    label="Check Amount"
                    lazy-rules
                    :rules="[lazyRules.required(), lazyRules.greaterThan(0, false)]"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-12 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(checkForm.memo as FormField).value as string"
                    outlined
                    label="memo"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
              </div>
            </template>
            <template v-if="paymentType === 1">
              <div class="row q-mt-lg q-mb-sm">
                <div class="col-12 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(creditForm.holder as FormField).value as string"
                    outlined
                    label="Card Holder"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(creditForm.date as FormField).value as string"
                    outlined
                    label="Expiration Date"
                    lazy-rules
                    :rules="[
                      lazyRules.required(),
                      lazyRules.minCharacters(7, 'Incorrect date mm/yyyy'),
                      ...creditFormDateRule,
                    ]"
                    mask="##/####"
                    hint="mm/yyyy"
                  />
                </div>
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(creditForm.code as FormField).value as string"
                    outlined
                    label="Code"
                    lazy-rules
                    :rules="[
                      lazyRules.required(),
                      lazyRules.maxCharacters(4),
                      lazyRules.minCharacters(3),
                    ]"
                    mask="####"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-12 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(creditForm.number as FormField).value as string"
                    outlined
                    label="Card Number"
                    lazy-rules
                    :rules="[
                      lazyRules.required(),
                      lazyRules.minCharacters(19, 'card number needs to be 16 digits'),
                    ]"
                    mask="####-####-####-####"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        outline
        label="Cancel"
        class="q-mr-sm q-mt-sm"
        style="color: #990000; border-color: #990000"
        v-close-popup
      />
      <q-btn
        class="q-mr-sm q-mt-sm"
        style="background: var(--happypurim); color: white"
        label="save"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { ref } from 'vue'

//* payment 0,1,2
const paymentType = ref<number>(0)

const { realForm: checkForm } = useForm({
  number: { value: '', validations: [validations.required] },
  date: { value: '', validations: [validations.required] },
  amount: { value: '0', validations: [validations.required, validations.greaterThan(0)] },
  memo: { value: '', validations: [validations.required] },
})
const { realForm: creditForm } = useForm({
  holder: { value: '', validations: [validations.required] },
  date: { value: '', validations: [validations.required] },
  code: {
    value: '',
    validations: [validations.required, validations.minCharacters(3), validations.maxCharacters(4)],
  },
  number: { value: '', validations: [validations.required] },
})

const creditFormDateRule = [
  (value: string) => {
    try {
      console.log('date value ', { value })
      if (value.length !== 7) return true

      const year = Number(value.slice(-4))
      const month = Number(value.slice(0, 2)) - 1

      if (month < 0 || month > 11) return 'Incorrect month (1-12)'

      const currentDay = new Date().getTime()
      const date = new Date(year, month).getTime()

      if (currentDay > date) return 'card expired'

      return true
    } catch (error) {
      console.warn(error)
      return 'Incorrect date'
    }
  },
]
</script>

<style scoped lang="scss">
@import './RecordPaymentDialog';
</style>
