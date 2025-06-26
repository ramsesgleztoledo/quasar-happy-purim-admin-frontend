

import { computed } from "vue";
import { useMemberOrderStore } from "../store/memberOrderStore/memberOrderStore";
import { usePromotionService } from "../services/promotion.service";
import { useMemberListService } from "../services/memberList.service";
import { useOrderItemService } from "../services/orderItems.service";
import type { MemberOrderItemsInterface, OrderPromotionInterface } from "../interfaces/memberOrder-interfaces";
import { useQuasar } from "quasar";
import { useAuth } from "src/modules/auth/composables/useAuth";
import { useMember } from "./useMember";




export const useMemberOrder = () => {

  const $moStore = useMemberOrderStore()
  const { getPromotionsByMemberGuid } = usePromotionService()
  const { getMemberListMemberGuid } = useMemberListService()
  const { getOrderItemsByMemberGuid, addOrRemoveOrderItemsByMemberGuid } = useOrderItemService()
  const { authState } = useAuth()
  const { memberState } = useMember()
  const $q = useQuasar()

  /**========================================================================
   *                           methods
   *========================================================================**/

  const addOrRemoveItem = async (isAdd: boolean, data: MemberOrderItemsInterface) => {
    const memberGuid = memberState.value.selectedMember?.memberGuid || ''

    const resp = await addOrRemoveOrderItemsByMemberGuid({
      data,
      isAdd,
      memberGuid,
    })

    if (!resp.ok)
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'something went wrong adding an item to the cart, please refresh the app and try again',

      })


  };



  return {
    memberOrderState: computed(() => $moStore.$state),

    async getInitialData() {

      const mGuid = memberState.value.selectedMember?.memberGuid || ''

      const resp = await Promise.all([
        getPromotionsByMemberGuid(mGuid),
        getMemberListMemberGuid(mGuid),
        getOrderItemsByMemberGuid(mGuid),
      ])

      if (resp.find(resp => !resp.ok)) return

      const promotions = resp[0].data.map(pro => {
        const selected = resp[2].data.find(item => item.itemId == pro.itemId)
        return {
          ...pro,
          selected: !!selected
        }
      }
      ) || []

      $moStore.setPromotions(promotions)
      $moStore.setMemberList(resp[1].data)
      $moStore.setOrderItems(resp[2].data)

    },
    addOrRemoveItem,

    async addOrRemovePromotion(value: boolean, item: OrderPromotionInterface) {
      const data: MemberOrderItemsInterface = {
        description: item.displayText,
        itemId: item.itemId,
        message: "",
        price: item.price,
        quantity: item.quantity,
        sessionId: authState.value.token?.token || "",
        shipTo: ""
      }

      await addOrRemoveItem(value, data)

    },



  }
};
