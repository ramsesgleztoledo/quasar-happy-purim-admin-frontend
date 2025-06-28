<template>
  <q-expansion-item
    icon="person"
    :label="`View Individual Selections (${membersSelected.length})`"
    default-opened
    header-class="CartBaskets-headers-container"
  >
    <q-card>
      <q-card-section>
        <div class="CartBaskets-baskets-container">
          <div
            v-for="(member, i) in membersSelected"
            :key="i"
            class="CartBaskets-basket-container q-mb-md"
            style="font-size: 12px"
          >
            <div class="row">
              <div class="col-9">
                <div class="mini-text">{{ member.lastName }}, {{ member.firstName }}</div>
                <b> ${{ convertWithCommas(member.price || 0) }} </b>
              </div>
              <div class="col-3">
                <q-icon
                  @click="() => onDeleteMember(member)"
                  class="cursor-pointer"
                  name="close"
                  style="color: red"
                />
              </div>
            </div>
            <q-separator class="q-mb-sm" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import { getMembersByPromotion } from 'src/modules/dashboard/helpers/getMembersByPromotion'
import type {
  ExtendedPromotionType,
  MemberOrderItemsInterface,
  OrderMemberListInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'

const $moStore = useMemberOrderStore()

const { removeMemberFromCart } = useMemberOrder()

const promotions = computed(() => {
  const promotionsAux: ExtendedPromotionType[] = []

  const array = $moStore.orderItems
  for (let i = 0; i < array.length; i++) {
    const item = array[i]!

    const promoFound = checkIfPromotion(item)
    // if promotion
    if (promoFound.ok) {
      promotionsAux.push({
        ...item,
        memberList: getMembersByPromotion(promoFound.promotion!.categories, $moStore.memberList),
      })
    }
  }
  return promotionsAux
})

const checkIfPromotion = (item: MemberOrderItemsInterface) => {
  const found = $moStore.promotions.find((pro) => pro.itemId === item.itemId)
  return {
    ok: !!found,
    promotion: found,
  }
}

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

const onDeleteMember = async (member: OrderMemberListInterface) => {
  await removeMemberFromCart(member)
  const memberFound = $moStore.memberList.find((me) => me.id === member.id)

  if (memberFound) {
    $moStore.setMembersSelected($moStore.membersSelected.filter((me) => me.id !== member.id))
    memberFound.selected = false
  }
}
</script>

<style scoped lang="scss">
@import './CartIndividualSelection.scss';
</style>
