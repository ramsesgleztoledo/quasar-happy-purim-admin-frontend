<template>
  <div v-if="membersSelected.length" class="row">
    <div class="col-12">
      <q-separator />

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
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type { OrderMemberListInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'
import { getMembersSelectedHelper } from '../../../helpers/member-order-helpers'

const $moStore = useMemberOrderStore()

const { removeMemberFromCart } = useMemberOrder()

const membersSelected = computed<OrderMemberListInterface[]>(() =>
  getMembersSelectedHelper({
    membersList: $moStore.memberList.original,
    membersSelected: $moStore.membersSelected,
    orderItems: $moStore.orderItems,
    promotions: $moStore.promotions,
  }),
)

const onDeleteMember = async (member: OrderMemberListInterface) => {
  await removeMemberFromCart(member)
  const memberFound = $moStore.memberList.original.find((me) => me.id === member.id)

  if (memberFound) {
    $moStore.setMembersSelected($moStore.membersSelected.filter((me) => me.id !== member.id))
    memberFound.selected = false
  }
}
</script>

<style scoped lang="scss">
@import './CartIndividualSelection.scss';
</style>
