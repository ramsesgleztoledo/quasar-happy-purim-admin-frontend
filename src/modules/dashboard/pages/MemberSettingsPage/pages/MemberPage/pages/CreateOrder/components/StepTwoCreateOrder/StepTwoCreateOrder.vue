<template>
  <div class="row">
    <div class="col-12">
      <!--! =============================== additional basket  =============================-->
      <div v-if="memberOrderState.addonSettings.enabled" class="StepsCreateOrder-bordered q-mb-lg">
        <div class="col-12">
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm">
              <div class="row text-h6 q-mb-sm" style="color: var(--happypurim)">
                Additional Gift Basket(s) for Personal Use
              </div>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col-12 q-pa-sm">
              <div class="row q-mb-sm">
                <div v-html="memberOrderState.addonSettings.message"></div>
              </div>
              <div class="row q-pa-sm">
                <b class="q-pa-sm q-mr-sm" style="color: var(--happypurim)"> Additional Baskets</b>
                <div class="row">
                  <q-input
                    type="number"
                    v-model="additionalBasketsPersonal"
                    outlined
                    label="quantity"
                    lazy-rules
                    :rules="[lazyRules.greaterThan(0, false)]"
                  />
                  <q-btn
                    :disable="!additionalBasketsPersonal || Number(additionalBasketsPersonal) <= 0"
                    @click="addAdditionalBasket"
                    class="q-mr-sm q-ml-md"
                    style="background: var(--happypurim); color: white; max-height: 10px"
                    label="Add"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--=============================== end additional basket =============================-->

      <!--! =============================== donations =============================-->
      <div
        v-if="charities.length || memberOrderState.additionalCharityOptions.length"
        class="row StepTwoCreateOrder-donations StepsCreateOrder-bordered q-mb-lg"
      >
        <div class="col-12">
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm ß">
              <div class="row text-h6 q-mb-sm" style="color: var(--happypurim)">
                Donation To Charity
              </div>
              <div
                class="row"
                v-for="option in memberOrderState.additionalCharityOptions"
                :key="option.id"
              >
                <div v-html="option.message"></div>
              </div>
            </div>
          </div>

          <template v-if="!charities.length">
            <div class="row q-pa-sm q-mt-sm">
              <b class="q-pa-sm q-mr-sm" style="color: var(--happypurim)">
                I would like to donate</b
              >
              <div class="row">
                <q-input
                  type="number"
                  v-model="donationAmount"
                  outlined
                  label="amount"
                  lazy-rules
                  :rules="[lazyRules.greaterThan(0, false)]"
                />
                <q-btn
                  :disable="!donationAmount || Number(donationAmount) <= 0"
                  @click="addDonation"
                  class="q-mr-sm q-ml-md"
                  style="background: var(--happypurim); color: white; max-height: 10px"
                  label="Add"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="charity in charities" :key="charity.id">
              <div class="row q-mb-sm">
                <div class="col-12 q-pa-sm q-item-bordered">
                  <div class="row q-mb-sm">
                    <b>
                      {{ charity.description }}
                    </b>
                  </div>
                  <div class="row justify-content-space-between">
                    <b class="q-pa-sm" style="color: var(--happypurim)"> I would like to donate</b>
                    <div class="row">
                      <q-input
                        type="number"
                        v-model="charity.value"
                        outlined
                        label="amount"
                        lazy-rules
                        :rules="[lazyRules.greaterThan(0, false)]"
                      />
                      <q-btn
                        :disable="donationDisable(charity)"
                        @click="() => donate(charity)"
                        class="q-mr-sm q-ml-md"
                        style="background: var(--happypurim); color: white; max-height: 10px"
                        label="Add"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!--=============================== end donations =============================-->

      <!--! =============================== additional items  =============================-->
      <div
        v-if="
          memberOrderState.additionalOrderItemsSettings.enabled &&
          memberOrderState.additionalOrderOptions.length
        "
        class="row StepTwoCreateOrder-donations StepsCreateOrder-bordered q-mb-lg"
      >
        <div class="col-12">
          <div class="row q-pa-sm q-mb-sm">
            <div class="col-12 q-pa-sm">
              <div class="row text-h6 q-mb-sm" style="color: var(--happypurim)">
                Additional Items
              </div>
              <div class="row q-mb-sm">
                <div v-html="memberOrderState.additionalOrderItemsSettings.message"></div>
              </div>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col-12 q-pa-sm">
              <div
                v-for="(aItem, index) in memberOrderState.additionalOrderOptions"
                :key="index"
                class="q-mb-md row q-mr-sm"
              >
                <b class="q-pa-sm" style="color: var(--happypurim); width: 300px">
                  {{ aItem.description }}</b
                >
                <div class="row">
                  <q-input
                    type="number"
                    v-model="aItem.value"
                    outlined
                    label="quantity"
                    lazy-rules
                    :rules="[
                      lazyRules.required(),
                      lazyRules.greaterThan(0, false),
                      ...(aItem.maxQuantity ? [lazyRules.lowerThan(aItem.maxQuantity, true)] : []),
                    ]"
                    :hint="`${memberOrderState.orgSettings?.symbol || '$'}${convertWithCommas(aItem.price || 0,{
              dontAllowZero: true
            })} ea. (${aItem.maxQuantity ? aItem.maxQuantity + ' max' : ''})`"
                  />

                  <q-btn
                    :disable="isAdditionalItemDisable(aItem).value"
                    @click="() => addAdditionalItem(aItem)"
                    class="q-mr-sm q-ml-md"
                    style="background: var(--happypurim); color: white; max-height: 10px"
                    label="Add"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-separator />
            </div>
          </div>
        </div>
        <q-separator />
      </div>
      <!--=============================== end additional items =============================-->

      <!--! =============================== custom shipping items =============================-->
      <div
        v-if="memberOrderState.sendOutSettings.enabled"
        class="StepsCreateOrder-bordered q-mb-lg"
      >
        <div class="row q-pa-sm q-mb-sm">
          <div class="col-12 q-pa-sm">
            <div class="row text-h6 q-mb-sm" style="color: var(--happypurim)">Shipping Baskets</div>
            <div v-html="memberOrderState.sendOutSettings.message"></div>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12 q-pa-sm">
            <div class="row">
              <div class="col-12">
                <CustomShippingBasket />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--=============================== end custom shipping items =============================-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { lazyRules } from 'src/composables'

import { computed, ref, watch } from 'vue'
import CustomShippingBasket from './components/CustomShippingBasket/CustomShippingBasket.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type {
  AdditionalOrderOptionInterface,
  CharityType,
  MemberOrderItemsInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useQuasar } from 'quasar'
import type { authStateInterface } from 'src/modules/auth/store/auth-store-interfaces'
import { convertWithCommas } from 'src/helpers'

const { memberOrderState, addOrRemoveDonation, addOrRemoveItem } = useMemberOrder()

const additionalBasketsPersonal = ref(0)
const donationAmount = ref(0)

const $q = useQuasar()

const charities = ref<CharityType[]>([])

const itemAlreadyAdded = () => {
  $q.notify({
    color: 'blue',
    textColor: 'black',
    icon: 'error',
    message: `You already added this item, please remove it before adding a different amount`,
  })
}

const donationDisable = (charity: CharityType) => {
  return charity.value === undefined || charity.value === null || Number(charity.value) <= 0
}

const donate = async (charity: CharityType) => {
  if (memberOrderState.value.orderItems.find((oi) => oi.itemId === charity.id))
    return itemAlreadyAdded()
  await addOrRemoveDonation(true, charity)
  charity.value = 0
}

watch(
  () => memberOrderState.value.charityOptions,
  () => {
    charities.value = memberOrderState.value.charityOptions.map((item) => ({
      ...item,
      value: memberOrderState.value.orderItems.find((oi) => oi.itemId === item.id)?.price || 0,
    }))
  },
  { immediate: true },
)

const addAdditionalBasket = async () => {
  if (additionalBasketForPersonalUse.value) return itemAlreadyAdded()
  const authState: authStateInterface | null = $q.localStorage.getItem('authState')
  const data: MemberOrderItemsInterface = {
    description: `Additional Gift Baskets for Personal Use`,
    itemId: -1,
    message: '',
    price: memberOrderState.value.addonSettings.price,
    quantity: additionalBasketsPersonal.value,
    sessionId: authState?.token?.token || '',
    shipTo: '',
  }

  await addOrRemoveItem(true, data, true)
  additionalBasketsPersonal.value = 0
}
const addDonation = async () => {
  if (donationUse.value) return itemAlreadyAdded()

  const authState: authStateInterface | null = $q.localStorage.getItem('authState')
  const data: MemberOrderItemsInterface = {
    description: `Donation To Charity`,
    itemId: 0,
    message: '',
    price: donationAmount.value,
    quantity: 1,
    sessionId: authState?.token?.token || '',
    shipTo: '',
  }

  await addOrRemoveItem(true, data, true)
  donationAmount.value = 0
}

const additionalBasketForPersonalUse = computed(() =>
  memberOrderState.value.orderItems.find((item) => item.itemId === -1),
)
const donationUse = computed(() =>
  memberOrderState.value.orderItems.find((item) => item.itemId === 0),
)

const isAdditionalItemDisable = (item: AdditionalOrderOptionInterface) =>
  computed(() => {
    if (!item.value) return true
    const value = Number(item.value)
    if (value <= 0) return true
    if (item.maxQuantity && value > item.maxQuantity) return true

    return false
  })

const addAdditionalItem = async (item: AdditionalOrderOptionInterface) => {
  if (
    memberOrderState.value.orderItems.find(
      (itemAux) => itemAux.itemId === 5 && itemAux.description === item.description,
    )
  )
    return itemAlreadyAdded()

  const authState: authStateInterface | null = $q.localStorage.getItem('authState')

  const data: MemberOrderItemsInterface = {
    description: item.description,
    itemId: 5,
    message: '',
    price: item.price,
    quantity: item.value || 1,
    sessionId: authState?.token?.token || '',
    shipTo: '',
  }

  await addOrRemoveItem(true, data, true)
  item.value = 0
}
</script>

<style scoped lang="scss">
@import './StepTwoCreateOrder.scss';
</style>
