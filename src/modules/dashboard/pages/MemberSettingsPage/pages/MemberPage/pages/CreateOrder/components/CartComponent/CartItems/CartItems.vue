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
    <!-- Charities -->
    <div v-if="charities.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center" style="color: orange">
                <b> Charities </b>
              </div>
            </div>
            <q-separator color="orange" inset />
          </div>
        </div>
        <div class="row q-pa-sm q-mb-sm" v-for="(item, i) in charities" :key="i">
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
                  <b> ${{ convertWithCommas(item.value || 0) }} </b>
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
      </div>
    </div>
    <!-- Promotions -->
    <div v-if="promotions.length" class="row q-pa-sm">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 justify-content-center" style="color: orange">
                <b> Promotions </b>
              </div>
            </div>
            <q-separator color="orange" inset />
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
                  <b> ${{ convertWithCommas(item.price || 0) }} </b>
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

            <div class="row q-pa-sm">
              <div class="col-12">
                <q-expansion-item
                  icon="person"
                  label="Members in this promotion"
                  header-class="CartBaskets-headers-container"
                >
                  <div
                    class="row q-mt-sm"
                    style="color: red"
                    v-for="(member, i) in item.memberList"
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
              <div class="col-12 justify-content-center" style="color: orange">
                <b> Members </b>
              </div>
            </div>
            <q-separator color="orange" inset />
          </div>
        </div>
        <div class="row">
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
                  <b>
                    ${{ convertWithCommas(membersSelected.reduce((a, b) => a + b.price, 0) || 0) }}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useAuth } from 'src/modules/auth/composables/useAuth'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import { getMembersByPromotion } from 'src/modules/dashboard/helpers/getMembersByPromotion'
import type {
  CharityType,
  ExtendedPromotionType,
  MemberOrderItemsInterface,
  OrderMemberListInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'

const { memberOrderState, addOrRemoveItem, addOrRemoveDonation } = useMemberOrder()
const { authState } = useAuth()
const $moStore = useMemberOrderStore()

// const promotions = ref<ExtendedPromotionType[]>([])

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
        memberList: getMembersByPromotion(
          promoFound.promotion!.categories,
          memberOrderState.value.memberList,
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
  await addOrRemoveItem(
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
}

// check when orderItemsChange

const membersSelected = computed<OrderMemberListInterface[]>(() => {
  const members: OrderMemberListInterface[] = []
  const sel = $moStore.membersSelected
  for (let i = 0; i < sel.length; i++) {
    const me = sel[i]!
    let found = false

    for (let j = 0; j < promotions.value.length; j++) {
      const foundAux = promotions.value[j]!.memberList.find((member) => member.id === me.id)
      if (foundAux) {
        found = true
        break
      }
    }
    if (!found) members.push(me)
  }

  return members
})

const charities = computed<CharityType[]>(() => {
  const charitiesState = memberOrderState.value.charityOptions
  const orderItems = memberOrderState.value.orderItems
  const resp: CharityType[] = []

  for (let i = 0; i < charitiesState.length; i++) {
    const found = orderItems.find((item) => item.itemId === charitiesState[i]!.id)
    if (found)
      resp.push({
        ...charitiesState[i]!,
        value: found.price,
      })
  }

  return resp
})
</script>

<style scoped lang="scss">
@import './CartItems.scss';
</style>
