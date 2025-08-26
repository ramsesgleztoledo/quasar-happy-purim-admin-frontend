<template>
  <q-inner-loading :showing="!isReady" label="Loading..." />
  <div v-if="isReady">
    <div ref="createOrderPageContainerRef" class="CreateOrderPage-container">
      <div class="CreateOrderPage-top">
        <div class="row">
          <div class="col-12 top-title-col">
            <p class="CreateOrderPage-new-order">New Order</p>
            <div class="separator-right q-mr-sm q-ml-sm"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 top-title-col">
            <!-- eslint-disable-next-line no-irregular-whitespace -->
            <p class="CreateOrderPage-title-3">
              <b>
                {{ memberState.selectedMember?.lastName }},
                {{ memberState.selectedMember?.firstName }}
                <!-- - 0 baskets selected. -->
              </b>
            </p>
          </div>
        </div>
      </div>
      <div class="CreateOrderPage-middle">
        <div class="row">
          <div class="col-12">
            <div v-show="step === 1">
              <StepOneCreateOrder ref="stepOneCreateOrderRef" />
            </div>
            <div v-show="step > 1">
              <div class="row q-mt-sm">
                <div
                  :class="{
                    'col-6': !isMobile,
                    'col-12': isMobile,
                  }"
                  class="CreateOrderPage-left-container q-pa-sm"
                >
                  <StepTwoCreateOrder v-show="step === 2" />
                  <StepThreeCreateOrder v-show="step === 3" />
                </div>
                <div
                  class="CreateOrderPage-right-container q-pa-sm"
                  :class="{
                    'col-6': !isMobile,
                    'col-12': isMobile,
                  }"
                >
                  <div class="col-12">
                    <CartComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--=============================== Dialogs =============================-->

      <!--=========================== END OF SECTION ===========================-->
      <div class="CreateOrderPage-bottom">
        <div class="row q-mt-lg cancel-save-btn-container">
          <div class="col-12">
            <q-btn
              outline
              label="CANCEL"
              class="q-mr-sm"
              style="color: #990000; border-color: #990000"
              @click="cancelOrderDialogFlag = true"
            />
            <q-btn class="q-mr-sm" label="SAVE FOR LATER" @click="saveForLater" />
            <q-btn
              v-if="step > 1"
              class="q-mr-sm"
              label="BACK"
              @click="
                () => {
                  step--
                  goToTop(createOrderPageContainerRef)
                }
              "
            />
            <q-btn
              v-if="step === 1"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="NEXT"
              @click="onNext"
            />
            <q-btn
              :disable="!orderTotal && !$moStore.totalFromBackend"
              v-if="step === 2"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="CONTINUE TO PAYMENT"
              @click="continueToPayment"
            />
            <q-btn
              v-if="step === 3"
              :disable="$moStore.IsPaymentFormInvalid"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="PLACE ORDER"
              @click="placeOrder"
            />
          </div>
        </div>
      </div>
    </div>
    <!--* confirm cancel --->
    <DialogAlert
      @on-finish="
        (value) => {
          if (value)
            $router.push({
              name: 'MemberLayout-MemberPage',
            })
        }
      "
      msg="Are you sure you want to cancel this order?"
      v-model="cancelOrderDialogFlag"
    />
    <DialogAlert
      @on-finish="
        (value) => {
          step++
          goToTop(createOrderPageContainerRef)
        }
      "
      dont-show-icon
      msg="The reciprocity function enables you to automatically send to people that are sending to you. This is a great tool to ensure that you don’t inadvertently miss someone and that everyone that sends to you, gets from you in return. Please do NOT rely on this alone—if everyone just chooses reciprocity, and doesn’t select any recipients, no one will get anything!"
      v-model="addReciprocityDialogFlag"
      title="Would you like to add reciprocity?"
      cancel-btn-text="No"
      ok-btn-text="Add To Order"
    />
  </div>
</template>

<script setup lang="ts">
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'

import { onMounted, ref } from 'vue'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import StepOneCreateOrder from './components/StepOneCreateOrder/StepOneCreateOrder.vue'
import { useUI } from 'src/modules/UI/composables'
import StepTwoCreateOrder from './components/StepTwoCreateOrder/StepTwoCreateOrder.vue'
import StepThreeCreateOrder from './components/StepThreeCreateOrder/StepThreeCreateOrder.vue'
import CartComponent from './components/CartComponent/CartComponent.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type { StepOneCreateOrderInterface } from './interfaces'
import { useRouter } from 'vue-router'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { useCalculate } from 'src/modules/dashboard/composables/useCalculate'

const $router = useRouter()
const $moStore = useMemberOrderStore()
const { isMobile, goToTop } = useUI()
const { memberState } = useMember()
const { getInitialData, updateCart, setUpdatedPromotions, orderTotal, placeOrder } =
  useMemberOrder()
const { setBackendTotal } = useCalculate()

const cancelOrderDialogFlag = ref(false)
const addReciprocityDialogFlag = ref(false)
const step = ref(1)

const isReady = ref(false)
const stepOneCreateOrderRef = ref<StepOneCreateOrderInterface | undefined>(undefined)

const createOrderPageContainerRef = ref<HTMLDivElement | undefined>(undefined)
onMounted(() => {
  getInitialData()
    .then(() => {
      isReady.value = true
    })
    .catch(console.error)
})

const saveForLater = async () => {
  await saveStepOne()
  $router.push({
    name: 'MemberLayout',
    params: {
      memberId: memberState.value.selectedMember?.memberId,
    },
  })
}

const saveStepOne = async () => {
  const result = stepOneCreateOrderRef.value?.saveChanges()
  if (!result) return
  setUpdatedPromotions(result.promotions)
  await updateCart(result)
}

const onNext = async () => {
  await saveStepOne()
  step.value++
  goToTop(createOrderPageContainerRef.value)
  setBackendTotal()
}

const continueToPayment = () => {
  // addReciprocityDialogFlag.value = true
  step.value++
  goToTop(createOrderPageContainerRef.value)
}
</script>

<style scoped lang="scss">
@import './CreateOrderPage';
</style>
