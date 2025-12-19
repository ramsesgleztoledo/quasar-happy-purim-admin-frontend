<template>
  <div class="row CartItems-headers q-pa-sm q-mb-sm">
    <div class="col-2">
      <b> Qty </b>
    </div>
    <div class="col-5">
      <b> Description </b>
    </div>
    <div class="col-3">
      <b> Cost </b>
    </div>

    <div class="col-2"></div>
  </div>
  <div class="CartItems-container">
    <!-- custom shipping items -->
    <div v-if="memberOrderState.customShippingItems.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color cart-item-color">
                <b> Gift Baskets to be Shipped </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ memberOrderState.customShippingItems.length }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">Gift Baskets</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas($moStore.getCustomShippingItemsTotal, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
    <!-- additional items -->
    <div v-if="addiTionalItems.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Additional Items </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div v-for="(aItem, index) in addiTionalItems" :key="index" class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ aItem.quantity }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">{{ aItem.description }}</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(aItem.price * aItem.quantity || 0, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <div class="row">
                  <q-icon
                    @click="() => addOrRemoveItemAItem(false, aItem, true)"
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div>
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
    <!-- additional basket -->
    <div v-if="additionalBasketForPersonalUse" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Additional baskets </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ additionalBasketForPersonalUse.quantity }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">{{ additionalBasketForPersonalUse.description }}</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(
                        additionalBasketForPersonalUse.price *
                          additionalBasketForPersonalUse.quantity || 0,
                        {
                          dontAllowZero: true,
                        },
                      )
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <div class="row">
                  <q-icon
                    @click="
                      () => addOrRemoveItemAItem(false, additionalBasketForPersonalUse!, true)
                    "
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div>
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
    <!-- Charities -->
    <div
      v-if="$moStore.getDonations?.charities?.length || $moStore.getDonations?.donationUse"
      class="row q-pa-sm"
    >
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Charities </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div v-if="$moStore.getDonations?.donationUse" class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">1</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">
                  {{ $moStore.getDonations.donationUse.description }}
                </div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas($moStore.getDonations?.donationUse.price || 0, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <div class="row">
                  <q-icon
                    @click="
                      () => addOrRemoveItemAItem(false, $moStore.getDonations.donationUse!, true)
                    "
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div>
              </div>
            </div>

            <q-separator />
          </div>
        </div>
        <template v-if="$moStore.getDonations?.charities.length">
          <div
            class="row q-pa-sm q-mb-sm"
            v-for="(item, i) in $moStore.getDonations?.charities"
            :key="i"
          >
            <div class="col-12">
              <div class="row q-mb-sm">
                <div class="col-2">
                  <div class="CartItems-text">1</div>
                </div>
                <div class="col-5">
                  <div class="CartItems-text">{{ item.description }}</div>
                </div>
                <div class="col-3">
                  <div class="CartItems-text">
                    <b>
                      {{ $moStore.getSymbol
                      }}{{
                        convertWithCommas(item.value || 0, {
                          dontAllowZero: true,
                        })
                      }}
                    </b>
                  </div>
                </div>

                <div class="col-2">
                  <div class="row">
                    <q-icon
                      @click="() => removeDonate(item)"
                      class="CartItems-icon"
                      name="close"
                      style="color: red"
                    />
                  </div>
                </div>
              </div>

              <q-separator />
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- Promotions -->
    <div v-if="promotions.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Promotions </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div class="row q-pa-sm q-mb-sm" v-for="(item, i) in promotions" :key="i">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">1</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">{{ item.description }}</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(item.price || 0, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <div class="row">
                  <q-icon
                    @click="() => removePromotion(item)"
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div>
              </div>
            </div>

            <div class="row q-pa-sm" v-if="getMembersInThisPromotions(item).value.length">
              <div class="col-12">
                <q-expansion-item
                  icon="person"
                  label="Members in this promotion"
                  header-class="CartBaskets-headers-container"
                >
                  <div
                    class="row q-mt-sm"
                    style="color: red"
                    v-for="(member, i) in getMembersInThisPromotions(item).value"
                    :key="i"
                  >
                    <div class="col-12">
                      <div class="row">
                        <div class="col-2">{{ i + 1 }}</div>
                        <div class="col">{{ member.lastName }}, {{ member.firstName }}</div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <q-separator />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
    <!-- Members -->
    <div v-if="membersSelected.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Members </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div class="q-pa-sm row">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ membersSelected.length }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">Mishloach Manot to Members</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b v-if="$moStore.$state.totalFromBackend || data.totalPriceMembers">
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(
                        $moStore.$state.totalFromBackend || data.totalPriceMembers,
                        {
                          dontAllowZero: true,
                        },
                      )
                    }}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Discounts -->
    <div v-if="addiTionalItems.length && discounts.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> Discounts </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div v-for="disc in discounts" :key="disc.itemId" class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ disc.quantity }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">{{ disc.description }}</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(disc.price * disc.quantity || 0, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <!-- <div class="row">
                  <q-icon
                    @click="() => addOrRemoveItemAItem(false, aItem, true)"
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div> -->
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
    <!-- all items -->
    <div v-if="allItems.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center cart-item-color">
                <b> All Items </b>
              </div>
            </div>
            <q-separator inset />
          </div>
        </div>
        <div v-for="item in allItems" :key="item.itemId" class="row q-pa-sm q-mb-sm">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-2">
                <div class="CartItems-text">{{ item.quantity }}</div>
              </div>
              <div class="col-5">
                <div class="CartItems-text">{{ item.description }}</div>
              </div>
              <div class="col-3">
                <div class="CartItems-text">
                  <b>
                    {{ $moStore.getSymbol
                    }}{{
                      convertWithCommas(item.price * item.quantity || 0, {
                        dontAllowZero: true,
                      })
                    }}
                  </b>
                </div>
              </div>

              <div class="col-2">
                <!-- <div class="row">
                  <q-icon
                    @click="() => addOrRemoveItemAItem(false, aItem, true)"
                    class="CartItems-icon"
                    name="close"
                    style="color: red"
                  />
                </div> -->
              </div>
            </div>

            <q-separator />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useAuth } from 'src/modules/auth/composables/useAuth'
import { useCalculate } from 'src/modules/dashboard/composables/useCalculate'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import {
  getMembersByPromotion,
  getMembersInsidePromotion,
} from 'src/modules/dashboard/helpers/getMembersByPromotion'
import type {
  CharityType,
  ExtendedPromotionType,
  MemberOrderItemsInterface,
  OrderMemberListInterface,
  OrderPromotionInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'

const { memberOrderState, addOrRemoveItem, addOrRemoveDonation } = useMemberOrder()
const { authState } = useAuth()
const $moStore = useMemberOrderStore()
const { setBackendTotal } = useCalculate()

// const promotions = ref<ExtendedPromotionType[]>([])

const addOrRemoveItemAItem = async (
  isAdd: boolean,
  data: MemberOrderItemsInterface,
  showLoading?: boolean,
) => {
  await addOrRemoveItem(isAdd, data, showLoading)
  setBackendTotal()
}

const promotions = computed(() => {
  const promotionsAux: ExtendedPromotionType[] = []

  const array = memberOrderState.value.orderItems
  for (let i = 0; i < array.length; i++) {
    const item = array[i]!

    const promoFound = checkIfPromotion(item)
    // if promotion
    if (promoFound.ok) {
      promotionsAux.push({
        ...item,
        memberList: getMembersInsidePromotion(
          promoFound.promotion!,
          memberOrderState.value.membersSelected,
        ),
      })
    }
  }
  return promotionsAux
})

const checkIfPromotion = (item: MemberOrderItemsInterface) => {
  const found = memberOrderState.value.promotions.find((pro) => pro.itemId === item.itemId)
  return {
    ok: !!found,
    promotion: found,
  }
}

const removePromotion = async (item: MemberOrderItemsInterface) => {
  await addOrRemoveItemAItem(
    false,
    {
      description: item.description,
      itemId: item.itemId,
      message: '',
      price: item.price,
      quantity: item.quantity,
      sessionId: authState.value.token?.token || '',
      shipTo: '',
    },
    true,
  )
  // promotions.value = promotions.value.filter((pro) => pro.itemId !== item.itemId)
  const proStore = $moStore.promotions.find((pro) => pro.itemId === item.itemId)

  if (proStore) proStore.selected = false
}

const removeDonate = async (charity: CharityType) => {
  await addOrRemoveDonation(false, charity)
  setBackendTotal()
}

// check when orderItemsChange

const membersSelected = computed<OrderMemberListInterface[]>(() => {
  const members: OrderMemberListInterface[] = []
  const sel = $moStore.membersSelected

  for (let i = 0; i < sel.length; i++) {
    const me = sel[i]!
    let found = false

    for (let j = 0; j < promotions.value.length; j++) {
      const foundAux = promotions.value[j]!.memberList.find((member) => member.id == me.id)
      if (foundAux) {
        found = true
        j = promotions.value.length + 1
      }
    }
    if (!found) members.push({ ...me, price: me.price || $moStore.getSPrice })
  }

  return members
})

const additionalBasketForPersonalUse = computed(() =>
  memberOrderState.value.orderItems.find((item) => item.itemId === -1),
)

const addiTionalItems = computed(() =>
  memberOrderState.value.orderItems.filter((item) => item.itemId === 5),
)
const allItems = computed(() => memberOrderState.value.orderItems || [])

const discounts = computed(() => memberOrderState.value.orderItems.filter((item) => item.price < 0))

// const mishloachTotal = membersSelected.value.reduce((a, b) => a + b.price, 0) || 0
const data = computed(() => $moStore.getCartData)

const getMembersInThisPromotions = (item: ExtendedPromotionType) =>
  computed<OrderMemberListInterface[]>(() => {
    const promotion: OrderPromotionInterface | undefined = $moStore.promotions.find(
      (pro) => pro.itemId === item.itemId,
    )

    if (!promotion) return []

    const members = getMembersByPromotion(promotion, memberOrderState.value.membersSelected)

    return members || []
  })
</script>

<style scoped lang="scss">
@import './CartItems.scss';
</style>
