<template>
  <div class="row q-pa-sm">
    <div class="text-h6">Payment Information</div>
  </div>
  <div class="row q-mb-sm">
    <div class="col-12 q-pa-sm">
      <div class="row q-mt-lg q-mb-sm">
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.firstName.value"
            outlined
            label="First Name *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.lastName.value"
            outlined
            label="Last Name *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-12 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.checkOrCCNumber.value"
            outlined
            label="Card Number *"
            lazy-rules
            @update:model-value="(value) => formatCardNumber(value ? `${value}` : '')"
            :rules="[
              lazyRules.required(),
              minCharacters(12, 'Card number needs to be 12 digits min'),
              ...cardNumberRules,
            ]"
          />
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            v-model="paymentForm.realForm.value.date.value"
            outlined
            mask="##/####"
            hint="mm/yyyy"
            lazy-rules
            :rules="[
              lazyRules.required(),
              lazyRules.minCharacters(7, 'Incorrect date mm/yyyy'),
              ...creditFormDateRule,
            ]"
            label="Expiration Date *"
            readonly
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
                    :navigation-min-year-month="getCurrentYearMonth"
                    v-model="paymentForm.realForm.value.date.value"
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
            v-model="paymentForm.realForm.value.cardCode.value"
            outlined
            label="Code *"
            lazy-rules
            :rules="[lazyRules.required(), lazyRules.maxCharacters(4), lazyRules.minCharacters(3)]"
            mask="####"
          />
        </div>

        <div v-if="memberOrderState.paymentMethodTypes.length" class="row q-mt-md q-pa-sm">
          <div class="col-12">
            <div class="row q-mb-sm" style="color: var(--happypurim); font-weight: 600">
              Acceptable Credit Cards
            </div>
            <div class="row">
              <div
                v-for="item in memberOrderState.paymentMethodTypes"
                :key="item.methodId"
                class="q-ma-sm payment-img-container"
                v-html="paymentImgArray(cardImg(item).value).value.html"
              />
            </div>
          </div>
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
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billAddress1.value"
            outlined
            label="Address *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billAddress2.value"
            outlined
            label="Address 2"
            lazy-rules
            :rules="[]"
          />
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billCity.value"
            outlined
            label="City *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="col-6 q-pr-sm q-pl-sm">
          <q-input
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billState.value"
            outlined
            label="State *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
          <!-- <q-select
            popup-content-class="q-menu-300"
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billState.value"
            outlined
            :options="statesOptions"
            label="State *"
            lazy-rules
            :rules="[lazyRules.required()]"
          /> -->
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-6 q-pl-sm q-pr-sm">
          <q-input
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.billZip.value"
            outlined
            label="Zip Code *"
            class="regular-number-input"
            lazy-rules
            :rules="[lazyRules.required(), lazyRules.minCharacters(5)]"
          />
        </div>
        <div class="col-6 q-pl-sm q-pr-sm">
          <q-input
            :disable="sameAsProfile"
            v-model="paymentForm.realForm.value.phoneOrCheckDate.value"
            outlined
            label="Primary Telephone *"
            class="regular-number-input"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import { getCardType } from 'src/helpers/getCardType'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
// import { statesOptions } from 'src/modules/dashboard/data'
import type { PaymentMethodTypeInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { useMemberStore } from 'src/modules/dashboard/store/memberStore/memberStore'
import { computed, onMounted, ref, watch } from 'vue'
import { paymentImg } from '../../../../../../../../../data/payment-img'

const $mStore = useMemberStore()
const $moStore = useMemberOrderStore()
const { memberOrderState } = useMemberOrder()

const sameAsProfile = ref<boolean>(false)

const paymentImgArray = (name: string) =>
  computed(
    () =>
      paymentImg.find((img) => img.name == name) || {
        name: 'none',
        html: `
        <div style="margin-right: 10px;">
                unknown
        </div>
        `,
      },
  )

const cardTypeValidation = ({ value }: { value: string }) => {
  const cardType = getCardType(value)

  const cardTypes = memberOrderState.value.paymentMethodTypes.map((ca) => ca.methodDescription)

  const found = cardTypes.find((item) => item == cardType)

  if (found) return null
  else
    return {
      invalidCard: `Incorrect card, we only accept: ${cardTypes.join(', ')}`,
    }
}

const formatCardNumber = (val: string) => {
  const numbers = val.replace(/\D/g, '')
  let replaced = numbers.replace(/\s+/g, '')
  if (replaced.length > 19) replaced = replaced.slice(0, 19)
  const formatted = replaced.replace(/(.{4})/g, '$1 ').trim()
  paymentForm.realForm.value.checkOrCCNumber.value = formatted
}

const minCharactersCardForm =
  (min: number) =>
  ({ value }: { value: string }) => {
    if (!value) return null
    const stringValue = `${value}`.replace(/\s+/g, '')
    if (stringValue.length >= min) {
      return null
    } else {
      return { minCharacters: min }
    }
  }

const paymentForm = useForm({
  firstName: { value: '', validations: [validations.required] },
  lastName: { value: '', validations: [validations.required] },
  date: { value: '', validations: [validations.required, validations.isValidDate] },
  cardCode: {
    value: '',
    validations: [validations.required, validations.minCharacters(3), validations.maxCharacters(4)],
  },
  checkOrCCNumber: {
    value: '',
    validations: [validations.required, minCharactersCardForm(12), cardTypeValidation],
  },
  billAddress1: { value: '', validations: [validations.required] },
  billAddress2: { value: '', validations: [] },
  billCity: { value: '', validations: [validations.required] },
  billState: { value: '', validations: [validations.required] },
  billZip: { value: '', validations: [validations.required, validations.minCharacters(5)] },
  phoneOrCheckDate: {
    value: '',
    validations: [validations.required],
  },
})

const isValidDate = (value: string) => {
  try {
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
}

const creditFormDateRule = [isValidDate]

watch(sameAsProfile, (value) => {
  const member = $mStore.selectedMember
  const current = paymentForm.getFormValue()

  const data = {
    billAddress1: !value ? '' : member?.address || '',
    billAddress2: !value ? '' : member?.address2 || '',
    billCity: !value ? '' : member?.city || '',
    billState: !value ? '' : member?.state || '',
    billZip: !value ? '' : member?.zip || '',
    phoneOrCheckDate: !value ? '' : member?.phone || '',
  }

  paymentForm.resetForm(
    {
      ...current,
      ...data,
    },
    {
      omitExtraFields: true,
    },
  )
})

const cardImg = (type: PaymentMethodTypeInterface) =>
  computed(() => {
    switch (type.methodDescription) {
      case 'MasterCard':
        return 'mastercard'
      case 'American Express':
        return 'amex'
      case 'Discover':
        return 'discover'
      case 'Visa':
        return 'visa'
      default:
        return ''
    }
  })

const minCharacters = (min: number, msg: string) => (value: string) => {
  return value.replace(/\s+/g, '').length >= min || msg
}

const cardNumberRules = ref([
  (value: string) => {
    const cardType = getCardType(value)

    const cardTypes = memberOrderState.value.paymentMethodTypes.map((ca) => ca.methodDescription)

    const found = cardTypes.find((item) => item == cardType)

    return !!found || `Incorrect card, we only accept: ${cardTypes.join(', ')}`
  },
])

const getCurrentYearMonth = computed(
  () => `${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
)

onMounted(() => {
  $moStore.setPaymentForm(paymentForm)
})
</script>

<style scoped lang="scss">
.payment-img-container {
  width: 40px;
  height: 40px;
  color: var(--happypurim);
  // border: solid 1px var(--happypurim);
  // border-radius: 5px;
}
</style>
