<template>
  <div class="row">
    <div class="col-12">
      <div class="row q-pa-sm q-mb-sm StepsCreateOrder-bordered q-mb-lg">
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
      <div class="StepsCreateOrder-bordered q-mb-lg" v-show="$moStore.paymentForm.paymentType == 1">
        <CreditCardPayment />
      </div>
      <div class="StepsCreateOrder-bordered q-mb-lg" v-show="$moStore.paymentForm.paymentType == 2">
        <CheckPayment />
      </div>

      <div class="row q-pa-sm q-mb-sm StepsCreateOrder-bordered q-mb-lg">
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
import CheckPayment from './components/CheckPayment.vue'

const $mStore = useMemberStore()
const $moStore = useMemberOrderStore()

const payments = computed(() => [
  { id: 1, label: 'Credit Card', icon: 'credit_card', visible: true },
  { id: 2, label: 'Check', icon: 'local_atm', visible: true },
  {
    id: 3,
    label: 'Invoice',
    icon: 'request_quote',
    visible: true,
    // visible: !!$moStore.orgSettings?.payLaterOption,
  },
])

onMounted(() => {
  $moStore.paymentForm.email = $mStore.selectedMember?.email || ''
})
</script>

<style scoped lang="scss"></style>
