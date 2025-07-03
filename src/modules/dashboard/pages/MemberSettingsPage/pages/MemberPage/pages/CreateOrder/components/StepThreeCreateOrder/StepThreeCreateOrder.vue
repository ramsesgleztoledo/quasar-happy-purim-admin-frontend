<template>
  <div class="row">
    <div class="col-12">
      <div class="row q-pa-sm q-mb-sm q-item-bordered">
        <div class="col-12">
          <div class="row q-mb-sm">
            <div class="text-h6">Payment Options</div>
          </div>
          <div class="row">
            <q-radio
              v-for="item in payments.filter((p) => p.visible)"
              :key="item.id"
              class="q-mr-md"
              v-model="$moStore.paymentForm.paymentType"
              :val="item.id"
            >
              <div class="row">
                <div class="q-mr-sm">{{ item.label }}</div>
                <q-icon :name="item.icon" style="color: var(--happypurim); font-size: 23px" />
              </div>
            </q-radio>
          </div>
        </div>
      </div>
      <div v-show="$moStore.paymentForm.paymentType == 1">
        <q-separator class="q-mb-sm" />
        <CreditCardPayment />
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
                v-model="$moStore.paymentForm.email"
                outlined
                label="Email *"
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
import { lazyRules } from 'src/composables'
import { computed, onMounted } from 'vue'
import CreditCardPayment from './components/CreditCardPayment.vue'
import { useMemberStore } from 'src/modules/dashboard/store/memberStore/memberStore'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'

const $mStore = useMemberStore()
const $moStore = useMemberOrderStore()

const payments = computed(() => [
  { id: 1, label: 'Credit Card', icon: 'credit_card', visible: true },
  { id: 2, label: 'PayPal', icon: 'monetization_on', visible: !!$moStore.orgSettings?.payPal },
  {
    id: 3,
    label: 'Pay Later',
    icon: 'request_quote',
    visible: !!$moStore.orgSettings?.payLaterOption,
  },
])

onMounted(() => {
  $moStore.paymentForm.email = $mStore.selectedMember?.email || ''
})
</script>

<style scoped lang="scss"></style>
