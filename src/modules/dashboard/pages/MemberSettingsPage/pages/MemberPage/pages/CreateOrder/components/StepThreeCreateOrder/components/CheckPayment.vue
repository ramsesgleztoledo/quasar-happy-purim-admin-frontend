<template>
  <div class="row q-pa-sm">
    <div class="text-h6">Payment Information</div>
  </div>
  <div class="row q-mb-sm">
    <div class="col-12 q-pa-sm">
      <div class="row q-mb-sm">
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.checkOrCCNumber.value"
            outlined
            label="Check Number *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.total.value"
            outlined
            label="Amount *"
            lazy-rules
            type="number"
            :rules="[lazyRules.required(), lazyRules.greaterThan(0, false)]"
          />
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.firstName.value"
            outlined
            label="Name on Check *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.phoneOrCheckDate.value"
            outlined
            mask="date"
            lazy-rules
            :rules="[lazyRules.required()]"
            label="Check Date"
            readonly
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    emit-immediately
                    v-model="paymentForm.realForm.value.phoneOrCheckDate.value"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules, useForm } from 'src/composables'
import type { PaymentCheckFormInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'

import { onMounted } from 'vue'

const $moStore = useMemberOrderStore()

const paymentForm = useForm<PaymentCheckFormInterface>({
  checkOrCCNumber: { value: '', required: true },
  total: { value: 0, required: true },
  firstName: { value: '', required: true },
  phoneOrCheckDate: { value: '', required: true },
})

onMounted(() => {
  $moStore.setCheckForm(paymentForm)
})
</script>

<style scoped lang="scss"></style>
