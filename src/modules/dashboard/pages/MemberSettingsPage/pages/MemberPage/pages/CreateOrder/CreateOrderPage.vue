<template>
  <div v-if="isReady">
    <q-inner-loading :showing="isNotNexStepReady" label="Loading..." />

    <div v-show="!isNotNexStepReady">
      <!-- ref="createOrderPageContainerRef" -->
      <div class="CreateOrderPage-container">
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
                <q-icon name="person" size="large" class="q-mr-sm" />
                <b>
                  {{ memberState.selectedMember?.lastName }},
                  {{ memberState.selectedMember?.firstName }}
                  {{
                    `${memberState.selectedMember?.spouseFirstName ? `& ${memberState.selectedMember?.spouseFirstName}` : ''}`
                  }}
                  <!-- - 0 baskets selected. -->
                </b>
              </p>
            </div>
          </div>
        </div>
        <div class="CreateOrderPage-middle">
          <div class="row" style="min-height: 70vh">
            <div class="col-12" style="height: 100%">
              <div
                v-show="
                  currentPage?.pageId != undefined &&
                  currentPage?.pageId >= 0 &&
                  currentPage?.pageId <= 2
                "
              >
                <div v-show="currentPage?.pageId === 0"><OrderHistoryStep /></div>
                <div v-show="currentPage?.pageId === 1">
                  <!-- <StepOneCreateOrder v-show="currentPage?.pageId === 1" ref="stepOneCreateOrderRef" /> -->
                  <StepOneCreateOrder ref="stepOneCreateOrderRef" />
                </div>
                <div v-if="currentPage?.pageId === 2">
                  <ShowGreetingsStep />
                </div>
              </div>
              <div v-show="currentPage?.pageId != undefined && currentPage?.pageId > 2">
                <div class="row q-mt-sm">
                  <div
                    :class="{
                      'col-6': !isMobile,
                      'col-12': isMobile,
                    }"
                    class="CreateOrderPage-left-container q-pa-sm"
                  >
                    <div v-show="currentPage?.pageId === 3">
                      <MembershipStep />
                    </div>
                    <div v-show="currentPage?.pageId === 4">
                      <StepTwoCreateOrder />
                    </div>
                    <div v-show="currentPage?.pageId === 5">
                      <StepThreeCreateOrder />
                    </div>
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
            <div class="col-12" :style="{ flexDirection: isMobile ? 'column' : 'row' }">
              <q-btn
                outline
                label="CANCEL"
                class="q-mr-sm q-mb-sm"
                style="color: #990000; border-color: #990000"
                @click="cancelOrderDialogFlag = true"
              />
              <q-btn class="q-mr-sm q-mb-sm" label="SAVE FOR LATER" @click="saveForLater" />
              <q-btn v-if="step > 0" class="q-mr-sm q-mb-sm" label="BACK" @click="goBack()" />

              <q-btn
                :disable="currentPage?.disabled()"
                class="q-mr-sm q-mb-sm"
                style="background: var(--happypurim); color: white"
                :label="currentPage?.btnText"
                @click="currentPage?.method"
              />
              <!-- :disable="
                !orderTotal && !$moStore.totalFromBackend && !$moStore.getCartData.totalPriceMembers
              " -->
              <!-- <q-btn
              v-if="step === 1"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="CONTINUE"
              @click="continueToExtraOptions"
            />
            <q-btn
              :disable="
                !orderTotal && !$moStore.totalFromBackend && !$moStore.getCartData.totalPriceMembers
              "
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
            /> -->
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
        msg="Are you sure you want to leave this page? Your cart will be lost unless you save it for later"
        v-model="cancelOrderDialogFlag"
      />
      <DialogAlert
        @on-finish="
          (value) => {
            step++
            goToTop({ delay: 300 })
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
  </div>
</template>

<script setup lang="ts">
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'

import { computed, onMounted, ref } from 'vue'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import StepOneCreateOrder from './components/StepOneCreateOrder/StepOneCreateOrder.vue'
import { useUI } from 'src/modules/UI/composables'
import StepTwoCreateOrder from './components/StepTwoCreateOrder/StepTwoCreateOrder.vue'
import StepThreeCreateOrder from './components/StepThreeCreateOrder/StepThreeCreateOrder.vue'
import CartComponent from './components/CartComponent/CartComponent.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type { StepOneCreateOrderInterface } from './interfaces'
import { useRoute, useRouter } from 'vue-router'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { useCalculate } from 'src/modules/dashboard/composables/useCalculate'
import MembershipStep from './components/MembershipStep/MembershipStep.vue'
import type { PageStepInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import ShowGreetingsStep from './components/ShowGreetingsStep/ShowGreetingsStep.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import OrderHistoryStep from './components/OrderHistoryStep/OrderHistoryStep.vue'

const $router = useRouter()
const $route = useRoute()
const $moStore = useMemberOrderStore()
const $dStore = useDashboardStore()

const orderPages = computed(() => $moStore.$state.orderPages)
const currentPage = computed(() => orderPages.value[step.value] || orderPages.value[0] || undefined)

const requiredMembership = computed(() => $moStore.membership?.showMembership || false)
const { isMobile, goToTop, showLoading, stopLoading } = useUI()
const { memberState } = useMember()
const {
  getInitialData,
  updateCart,
  setUpdatedPromotions,
  orderTotal,
  placeOrder,
  addMemberShipToCart,
  updateGreetingsRecipientsByMemberId,
} = useMemberOrder()
const { setBackendTotal } = useCalculate()

const cancelOrderDialogFlag = ref(false)
const addReciprocityDialogFlag = ref(false)
const step = ref(0)

const isReady = ref(false)
const isNotNexStepReady = ref(false)

const stepOneCreateOrderRef = ref<StepOneCreateOrderInterface | undefined>(undefined)

const saveForLater = async () => {
  showLoading()
  await saveStepOne()
  $router.push({
    name: 'MemberLayout',
    params: {
      memberId: memberState.value.selectedMember?.memberId,
    },
  })
  stopLoading()
}

const saveStepOne = async () => {
  const result = stepOneCreateOrderRef.value?.saveChanges()
  if (!result) return

  setUpdatedPromotions(result.promotions)
  await updateCart(result)
}

const onNext = async () => {
  // showLoading()
  isNotNexStepReady.value = true
  await saveStepOne()
  step.value++
  // if (!requiredMembership.value) step.value++
  // stopLoading()
  setBackendTotal()
  isNotNexStepReady.value = false
  goToTop({ delay: 600 })

  // if (!$moStore.hasExtraOptions) step.value++
}

const continueToPayment = () => {
  // addReciprocityDialogFlag.value = true

  step.value++
  goToTop({ delay: 300 })
}

const goBack = () => {
  // step.value--
  // if (step.value === 2 && !$moStore.hasExtraOptions) step.value--
  // if (step.value === 1 && !requiredMembership.value) step.value--
  const currentPageId = currentPage.value?.pageId
  const index = orderPages.value.findIndex((pag) => pag.pageId === currentPageId)

  if (index < 1) return
  step.value--

  goToTop({ delay: 300 })
}

const continueToExtraOptions = async () => {
  // showLoading()
  isNotNexStepReady.value = true
  await addMemberShipToCart()
  step.value++
  isNotNexStepReady.value = false
  // stopLoading()
}

const updateGreetings = async () => {
  isNotNexStepReady.value = true
  // showLoading()
  await updateGreetingsRecipientsByMemberId()
  step.value++
  isNotNexStepReady.value = false
  // stopLoading()
}

const orderByCode = computed(
  () => (($route.query.orderByCode as string) || '').toLowerCase() === 'true',
)

onMounted(() => {
  showLoading()
  getInitialData()
    .then(() => {
      const orderPages: PageStepInterface[] = [
        ...($moStore.$state.orgSettings?.displayLastYearsOrderIntro &&
        $moStore.membersLastYear.length &&
        !orderByCode.value
          ? [
              {
                btnText: 'Proceed To General Ordering',
                disabled: () => false,
                method: () => {
                  step.value++
                },
                page: '',
                pageId: 0,
              },
            ]
          : []),
        ...(!orderByCode.value
          ? [
              {
                btnText: 'NEXT',
                disabled: () => false,
                method: onNext,
                page: '',
                pageId: 1,
              },
            ]
          : []),

        //
        ...($dStore.$state.showGreetingsPage
          ? [
              {
                btnText: 'SAVE & CONTINUE',
                disabled: () => false,
                method: updateGreetings,
                page: '',
                pageId: 2,
              },
            ]
          : []),

        ...(requiredMembership.value
          ? [
              {
                btnText: 'CONTINUE',
                disabled: () => false,
                method: continueToExtraOptions,
                page: '',
                pageId: 3,
              },
            ]
          : []),
        ...($moStore.hasExtraOptions
          ? [
              {
                btnText: 'CONTINUE',
                disabled: () =>
                  !orderTotal.value &&
                  !$moStore.totalFromBackend &&
                  !$moStore.getCartData.totalPriceMembers,
                method: continueToPayment,
                page: '',
                pageId: 4,
              },
            ]
          : []),

        {
          btnText: 'PLACE ORDER',
          disabled: () => !!$moStore.IsPaymentFormInvalid,
          method: placeOrder,
          page: '',
          pageId: 5,
        },
      ]

      $moStore.setOrderPages(orderPages)

      if ($moStore.$state.orgSettings?.displayLastYearsOrderIntro) {
        $moStore.$state.memberList.copy = $moStore.$state.memberList.copy.map((member) => {
          if (
            member.iSentLastYear == 1 ||
            member.reciprocal == 'Yes' ||
            member.sentToMeLastYear == 1
          )
            return {
              ...member,
              selected: true,
            }

          return member
        })
      }
      isReady.value = true
      stopLoading()
    })
    .catch(console.error)
})
</script>

<style scoped lang="scss">
@import './CreateOrderPage';
</style>
