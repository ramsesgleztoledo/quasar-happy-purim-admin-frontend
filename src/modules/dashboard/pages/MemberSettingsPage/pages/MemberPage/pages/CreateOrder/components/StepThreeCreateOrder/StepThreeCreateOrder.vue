<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <div class="row q-pa-sm q-mb-sm q-item-bordered">
        <div class="col-12">
          <div class="row q-mb-sm">
            <div class="text-h6">Payment Options</div>
          </div>
          <div class="row">
            <q-radio class="q-mr-md" v-model="paymentType" :val="1">
              <div class="row">
                <div class="q-mr-sm">Credit Card</div>
                <q-icon name="credit_card" style="color: var(--happypurim); font-size: 23px" />
              </div>
            </q-radio>
            <q-radio class="q-mr-md" v-model="paymentType" :val="2">
              <div class="row">
                <div class="q-mr-sm">Pay Later</div>
                <q-icon name="receipt" style="color: var(--happypurim); font-size: 23px" />
              </div>
            </q-radio>
          </div>
        </div>
      </div>
      <q-separator class="q-mb-sm" />
      <div class="row q-mb-sm">
        <div class="col-12 q-pa-sm q-item-bordered">
          <div class="row q-mt-lg q-mb-sm">
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.firstName as FormField).value as string"
                outlined
                label="First Name"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.lastName as FormField).value as string"
                outlined
                label="Last Name"
                lazy-rules
                :rules="[lazyRules.required()]"
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
                mask="#### #### #### ####"
              />
            </div>
          </div>
          <div class="row q-mb-sm">
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.date as FormField).value as string"
                outlined
                mask="##/####"
                hint="mm/yyyy"
                lazy-rules
                :rules="[
                  lazyRules.required(),
                  lazyRules.minCharacters(7, 'Incorrect date mm/yyyy'),
                  ...creditFormDateRule,
                ]"
                label="Expiration Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        class="month-year-picker"
                        mask="MM/YYYY"
                        emit-immediately
                        default-view="Years"
                        minimal
                        :options="() => false"
                        v-model="(creditForm.date as FormField).value as string"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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

          <q-separator class="q-mb-sm" />
          <div class="row q-mb-sm align-items-center">
            <div class="q-mr-lg text-h6">Billing address</div>
            <q-checkbox v-model="sameAsProfile" label="Same As Profile" />
          </div>
          <div class="row q-mb-sm">
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.address as FormField).value as string"
                outlined
                label="Address"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.city as FormField).value as string"
                outlined
                label="City"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mb-sm">
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-select
                v-model="(creditForm.state as FormField).value as string"
                outlined
                :options="statesOptions"
                label="State"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pr-sm q-pl-sm">
              <q-input
                v-model="(creditForm.zipCode as FormField).value as string"
                outlined
                label="Zip Code"
                mask="#####"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(creditForm.phone as FormField).value as string"
                outlined
                label="Primary Telephone"
                mask="(###) - ### - ####"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
        </div>
      </div>
      <q-separator class="q-mb-sm" />
      <div class="row q-pa-sm q-mb-sm q-item-bordered">
        <div class="col-12">
          <div class="row q-mb-sm">
            <div class="text-h6">Email Receipt To</div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="emailReceiptTo"
                outlined
                label="Email"
                lazy-rules
                type="email"
                :rules="[lazyRules.required(), lazyRules.isEmail()]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import type { FormField } from 'src/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import { ref } from 'vue'

const paymentType = ref<number>(1)
const sameAsProfile = ref<boolean>(false)
const emailReceiptTo = ref<string>('')

const { realForm: creditForm } = useForm({
  firstName: {
    value: '',
    validations: [validations.required],
  },
  lastName: {
    value: '',
    validations: [validations.required],
  },
  date: { value: '', validations: [validations.required] },
  code: {
    value: '',
    validations: [validations.required, validations.minCharacters(3), validations.maxCharacters(4)],
  },
  number: { value: '', validations: [validations.required] },
  address: { value: '', validations: [validations.required] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zipCode: { value: '', validations: [validations.required] },
  phone: { value: '', validations: [validations.required] },
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

<style scoped lang="scss"></style>
