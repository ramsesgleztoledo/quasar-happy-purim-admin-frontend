<template>
  <template v-if="!isLoading">
    <div v-if="!noDueDialogFlag">
      <q-card>
        <div class="row dialog-header custom-dialog-header-container">
          <div class="col-12">
            <p>Record Payment</p>
          </div>
        </div>
        <q-card-section class="row items-center">
          <div class="custom-dialog-body-container">
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
              <div class="row q-mb-md">
                <div class="col-12">
                  <template v-if="paymentType === 0">
                    <div class="row q-mt-lg q-mb-sm">
                      <div class="col-12 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="checkForm.number.value"
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
                          v-model="checkForm.date.value"
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
                                <q-date emit-immediately v-model="checkForm.date.value">
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
                    v-model="checkForm.date.value"
                    outlined
                    label="Check Date"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  /> -->
                      </div>
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          type="number"
                          v-model="checkForm.amount.value"
                          outlined
                          label="Check Amount"
                          lazy-rules
                          :rules="[
                            lazyRules.required(),
                            lazyRules.greaterThan(0, false),
                            lazyRules.lowerThan(totalDue, true),
                          ]"
                          @update:model-value="
                            (value: string | number | null) => onAmountChange(value)
                          "
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="checkForm.memo.value"
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
                          v-model="creditForm.holder.value"
                          outlined
                          label="Card Holder"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <!-- <q-input
                          v-model="creditForm.date.value"
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
                        /> -->
                        <q-input
                          v-model="creditForm.date.value"
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
                                  v-model="creditForm.date.value"
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
                          v-model="creditForm.code.value"
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
                          v-model="creditForm.number.value"
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
                    <q-separator class="q-mb-sm" />
                    <div class="row q-mb-sm">
                      <div class="col-12 d-flex justify-content-center">Billing address</div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="creditForm.address.value"
                          outlined
                          label="Address"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="creditForm.city.value"
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
                          popup-content-class="q-menu-300"
                          v-model="creditForm.state.value"
                          outlined
                          :options="statesOptions"
                          label="State"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="creditForm.zipCode.value"
                          outlined
                          label="Zip Code"
                          class="regular-number-input"
                          type="number"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                    </div>
                    <div class="row q-mt-md">
                      <div class="col-6 q-pl-sm q-pr-sm">
                        <q-input
                          v-model="creditForm.phone.value"
                          outlined
                          label="Primary Telephone"
                          class="regular-number-input"
                          type="number"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                    </div>
                  </template>
                  <template v-if="paymentType === 2">
                    <div class="row q-mt-lg q-mb-sm">
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="otherForm.date.value"
                          outlined
                          mask="date"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                          label="Date"
                          readonly
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date emit-immediately v-model="otherForm.date.value">
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
                    v-model="checkForm.date.value"
                    outlined
                    label="Check Date"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  /> -->
                      </div>
                      <div class="col-6 q-pr-sm q-pl-sm">
                        <q-input
                          type="number"
                          v-model="otherForm.amount.value"
                          outlined
                          label="Amount"
                          lazy-rules
                          :rules="[
                            lazyRules.required(),
                            lazyRules.greaterThan(0, false),
                            lazyRules.lowerThan(totalDue, true),
                          ]"
                          @update:model-value="
                            (value: string | number | null) => onAmountChange(value)
                          "
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12 q-pr-sm q-pl-sm">
                        <q-input
                          v-model="otherForm.memo.value"
                          outlined
                          label="memo"
                          lazy-rules
                          :rules="[lazyRules.required()]"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12 justify-content-end">
                      <q-btn
                        flat
                        round
                        color="primary"
                        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="isFullScreen = !isFullScreen"
                      />
                    </div>
                  </div>
                  <div class="row" style="height: fit-content">
                    <div class="col-12">
                      <q-table
                        :pagination="{
                          rowsPerPage: 0,
                        }"
                        :style="{ height: isFullScreen ? '800px' : '628px' }"
                        class="table-sticky-header-column-table"
                        flat
                        bordered
                        ref="tableRef"
                        :rows="rows"
                        :columns="columns"
                        row-key="OrderNumber"
                        selection="multiple"
                        v-model:selected="selected"
                        :title="`Total due: $${convertWithCommas(totalDue, {
                          dontAllowZero: true,
                        })}`"
                      >
                        <template v-slot:header="props">
                          <q-tr :props="props">
                            <q-th auto-width>
                              <q-checkbox
                                v-model="props.selected"
                                @update:model-value="onCheckAll"
                              />
                            </q-th>
                            <q-th v-for="col in props.cols" :key="col.name" :props="props">
                              {{ col.label }}
                            </q-th>

                            <q-th auto-width>Amount Applied</q-th>
                          </q-tr>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td auto-width>
                              <q-checkbox
                                v-model="props.selected"
                                @update:model-value="
                                  (value: boolean) => onCheckboxClicked(value, props.row)
                                "
                              />
                            </q-td>

                            <q-td v-for="col in props.cols" :key="col.name" :props="props">
                              {{ col.value }}
                            </q-td>
                            <q-td auto-width>
                              <q-input
                                v-model="props.row['amountApplied'] as number"
                                type="number"
                                outlined
                                label="amount"
                                lazy-rules
                                :rules="[
                                  lazyRules.required(),
                                  lazyRules.greaterThan(0, false),
                                  lazyRules.lowerThan(Number(props.row.Due), true),
                                  isValidAmount,
                                ]"
                                :disable="isAmountAppliedDisabled(props.row).value"
                              />
                            </q-td>
                          </q-tr>
                          <!-- <q-tr v-show="props.expand" :props="props">
                        <q-td colspan="100%">
                          <div class="text-left">
                            This is expand slot for row above: {{ props.row.name }}.
                          </div>
                        </q-td>
                      </q-tr> -->
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="custom-dialog-footer-container" align="right">
          <q-btn
            outline
            label="Cancel"
            class="q-mr-sm q-mt-sm"
            style="color: #990000; border-color: #990000"
            v-close-popup
          />

          <q-btn
            v-close-popup
            class="q-mr-sm q-mt-sm"
            style="background: var(--happypurim); color: white"
            label="Pay"
            @click="onPay"
            :disable="!isValidForm()"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div v-else>
      <q-card>
        <div class="row dialog-header custom-dialog-header-container">
          <div class="col-12">
            <p>No Debts</p>
          </div>
        </div>
        <q-card-section>There are no debts to pay </q-card-section>
        <q-card-actions class="custom-dialog-footer-container" align="right">
          <q-btn
            class="q-mr-sm q-mt-sm"
            style="background: var(--happypurim); color: white"
            label="Ok"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { lazyRules, useForm, validations } from 'src/composables'
import { convertToUSDate, convertWithCommas } from 'src/helpers'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { usePayment } from 'src/modules/dashboard/composables/usePayment'
import { statesOptions } from 'src/modules/dashboard/data'
import type {
  InvoiceUnpaidOrderInterface,
  RecordCCPaymentFormInterface,
  RecordCheckPaymentFormInterface,
} from 'src/modules/dashboard/interfaces/payment-interface'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const { getUnPaidOrdersByMemberId, recordCheckPayment, recordCCPayment, recordCreditPayment } =
  usePayment()
const { getTransactionsByMemberSelected_co } = useMember()

const memberId = computed(() => Number($route.params.memberId))

//* payment 0,1,2
const paymentType = ref<number>(0)
const isLoading = ref<boolean>(true)
const noDueDialogFlag = ref<boolean>(false)

const {
  realForm: checkForm,
  onFieldChange: onFieldChangeCheckForm,
  isValidForm: isValidFormCheck,
  getFormValue: getFormValueCheckForm,
} = useForm({
  number: { value: '', validations: [validations.required] },
  date: { value: '', validations: [validations.required] },
  amount: { value: '0', validations: [validations.required, validations.greaterThan(0)] },
  memo: { value: '', validations: [validations.required] },
})
const {
  realForm: creditForm,
  isValidForm: isValidFormCredit,
  getFormValue: getFormValueCredit,
} = useForm({
  holder: { value: '', validations: [validations.required] },
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
const {
  realForm: otherForm,
  onFieldChange: onFieldChangeOtherForm,
  isValidForm: isValidFormOther,
  getFormValue: getFormValueOtherForm,
} = useForm({
  date: { value: '', validations: [validations.required] },
  amount: { value: '0', validations: [validations.required, validations.greaterThan(0)] },
  memo: { value: '', validations: [validations.required] },
})

const creditFormDateRule = [
  (value: string) => {
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
  },
]

const isFullScreen = ref<boolean>(false)
const tableRef = ref()
const selected = ref<InvoiceUnpaidOrderInterface[]>([])

const columns: QTableColumn<InvoiceUnpaidOrderInterface>[] = [
  {
    name: 'OrderDate',
    required: true,
    label: 'Order Date',
    align: 'left',
    field: 'OrderDate',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },

  {
    name: 'orderNumber',
    label: 'Order #',
    field: 'OrderNumber',
    sortable: true,
    // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'orderTotal',
    label: 'Order Total',
    field: 'OrderTotal',
    sortable: true,
    format: (amount: number) =>
      `$${convertWithCommas(amount, {
        dontAllowZero: true,
      })}`,
  },
  {
    name: 'paid',
    label: 'Paid',
    field: 'Paid',
    sortable: true,
    format: (amount: number) =>
      `$${convertWithCommas(amount, {
        dontAllowZero: true,
      })}`,
  },
  {
    name: 'due',
    label: 'Due',
    field: 'Due',
    sortable: true,
    format: (amount: number) =>
      `$${convertWithCommas(amount, {
        dontAllowZero: true,
      })}`,
  },
]

const rows = ref<InvoiceUnpaidOrderInterface[]>([])
const totalDue = ref(0)

onMounted(() => {
  const id = Number($route.params.memberId)
  getUnPaidOrdersByMemberId(id).then((res) => {
    rows.value = res.invoices
    totalDue.value = res.totalDue
    isLoading.value = false
    if (!res.invoices.length) noDueDialogFlag.value = true
  })
})

const onPay = async () => {
  switch (paymentType.value) {
    case 0:
      await onCheckPayment()
      break
    case 1:
      await onCCPayment()
      break
    default:
      await onCreditOtherPayment()
  }
  await getTransactionsByMemberSelected_co()
}

const onCheckPayment = async () => {
  const checkFormValue = getFormValueCheckForm()
  const data: RecordCheckPaymentFormInterface = {
    amount: Number(checkFormValue.amount) || 0,
    checkNumber: checkFormValue.number || '',
    date: checkFormValue.date || '',
    memo: checkFormValue.memo || '',
    invoices: rows.value
      .filter((item) => item.amountApplied)
      .map((item) => ({
        amount: item.amountApplied!,
        transactionID: item.OrderNumber,
      })),
  }
  await recordCheckPayment(memberId.value, data)
}

const onCCPayment = async () => {
  const ccFormValue = getFormValueCredit()
  const data: RecordCCPaymentFormInterface = {
    billingAddress: ccFormValue.address!,
    city: ccFormValue.city || '',
    cardLast4: ccFormValue.number!.slice(-4) || '',
    cardNumber: ccFormValue.number!,
    cvv: ccFormValue.code!,
    expiration: ccFormValue.date!,
    fullName: ccFormValue.holder!,
    state: ccFormValue.state!,
    postalCode: ccFormValue.zipCode!,
    paymentMethodIndex: 1,
    phone: ccFormValue.phone!,
    total: rows.value.reduce((sum, current) => sum + (Number(current.amountApplied) || 0), 0),
    invoiceList: rows.value
      .filter((item) => item.amountApplied)
      .map((item) => ({
        amountApplied: item.amountApplied!,
        transactionId: item.OrderNumber,
      })),
  }
  await recordCCPayment(memberId.value, data)
}

const onCreditOtherPayment = async () => {
  const checkFormValue = getFormValueOtherForm()
  const data: RecordCheckPaymentFormInterface = {
    amount: Number(checkFormValue.amount) || 0,
    checkNumber: '',
    date: checkFormValue.date || '',
    memo: checkFormValue.memo || '',
    invoices: rows.value
      .filter((item) => item.amountApplied)
      .map((item) => ({
        amount: item.amountApplied!,
        transactionID: item.OrderNumber,
      })),
  }
  await recordCreditPayment(memberId.value, data)
}

const isAmountAppliedDisabled = (row: InvoiceUnpaidOrderInterface) =>
  computed<boolean>(() => {
    const found = !selected.value.find((item) => item.OrderNumber === row.OrderNumber)
    return found
  })

const onAmountChange = (value: string | number | null) => {
  const isInf = value === 'inf'

  let available = Number(value) || 0.0
  const param = {
    target: {
      name: 'amount',
      value: `0.00`,
    },
  }

  if (available > totalDue.value) {
    available = totalDue.value
    param.target.value = `${convertWithCommas(available, { goDown: true })}`

    onFieldChangeCheckForm(param)
    onFieldChangeOtherForm(param)
  }
  if (available < 0) {
    available = 0
    onFieldChangeCheckForm(param)
    onFieldChangeOtherForm(param)
  }

  selected.value.forEach((item) => {
    const element = rows.value.find((row) => row.OrderNumber === item.OrderNumber)
    if (!element) return
    const calculated = available - item.Due

    if (calculated >= 0 || isInf) {
      element.amountApplied = `${convertWithCommas(element.Due, { goDown: true })}` || '0.00'
      available -= element.Due
    } else {
      element.amountApplied = `${convertWithCommas(available, { goDown: true })}` || '0.0-'
      available = 0
    }
  })
}

const onCheckboxClicked = (value: boolean, row: InvoiceUnpaidOrderInterface) => {
  if (!value) {
    const element = rows.value.find((item) => item.OrderNumber === row.OrderNumber)
    if (element) element.amountApplied = 0
  }

  updateValue()
}

const getAmountByTab = () => {
  const tab = paymentType.value
  let amount = '0.00'
  switch (tab) {
    case 0:
      amount = checkForm.value.amount.value || '0.00'
      break
    case 1:
      amount = 'inf'
      break

    default:
      amount = otherForm.value.amount.value || '0.00'
      break
  }

  return amount
}

const updateValue = () => {
  onAmountChange(getAmountByTab())
}

watch(paymentType, () => {
  onCheckAll()
})

const onCheckAll = () => {
  if (!selected.value.length) {
    rows.value = rows.value.map((item) => ({ ...item, amountApplied: 0 }))
    return
  }
  updateValue()
}

const isValidAmount = () => {
  const amount = getAmountByTab()
  if (amount === 'inf') return true

  return (
    getSumOfSelected().sum <= Number(amount) ||
    `The total amount applied can't be greater than your total payment`
  )
}

const getSumOfSelected = () => {
  const sel = new Set(selected.value.map((item) => item.OrderNumber))

  const filtered = rows.value.filter((item) => sel.has(item.OrderNumber))

  const sum = filtered.reduce((sum, current) => sum + Number(current.amountApplied || 0), 0)

  return {
    filtered,
    sum,
  }
}

const isValidForm = () => {
  if (!selected.value.length) return false

  const type = paymentType.value
  const sel = getSumOfSelected()

  switch (type) {
    case 0: {
      if (!isValidFormCheck()) return false
      const amount = checkForm.value['amount']
      const value = amount.value
      if (sel.sum > Number(value)) return false
      break
    }
    case 1: {
      if (!isValidFormCredit()) return false
      break
    }
    default: {
      if (!isValidFormOther()) return false
      const amount = otherForm.value['amount']
      const value = amount.value
      if (sel.sum > Number(value)) return false
      break
    }
  }

  if (sel.sum > totalDue.value) return false

  const found = sel.filtered.find(
    (item) => Number(item.amountApplied) <= 0 || Number(item.amountApplied) > item.Due,
  )
  if (found) return false

  return true
}
</script>

<style scoped lang="scss">
@import './RecordPaymentDialog';
</style>
