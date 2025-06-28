

import { computed } from "vue";
import { useMemberOrderStore } from "../store/memberOrderStore/memberOrderStore";
import { usePromotionService } from "../services/promotion.service";
import { useMemberListService } from "../services/memberList.service";
import { useOrderItemService } from "../services/orderItems.service";
import type { CharityType, MemberOrderItemsInterface, OrderMemberListInterface, OrderPromotionInterface } from "../interfaces/memberOrder-interfaces";
import { useQuasar } from "quasar";
import { useAuth } from "src/modules/auth/composables/useAuth";
import { useMember } from "./useMember";
import { useShaliachService } from "../services/shaliach.service";
import { useOrgSettingsService } from "../services/orgSettings.service";
import { useCharityService } from "../services/charity.service";
import { useUI } from "src/modules/UI/composables";




export const useMemberOrder = () => {

  const $moStore = useMemberOrderStore()
  const { getPromotionsByMemberGuid } = usePromotionService()
  const { getMemberListMemberGuid } = useMemberListService()
  const { getOrderItemsByMemberGuid, addOrRemoveOrderItemsByMemberGuid } = useOrderItemService()
  const { authState } = useAuth()
  const { memberState } = useMember()
  const $q = useQuasar()
  const { addMember, removeMember } = useShaliachService()
  const { getOrganizationSettings } = useOrgSettingsService()
  const { getAdditionalCharityOptions, getCharityOptions } = useCharityService()
  const { showToast } = useUI()
  /**========================================================================
   *                           methods
   *========================================================================**/

  const addOrRemoveItem = async (isAdd: boolean, data: MemberOrderItemsInterface, showLoading?: boolean) => {
    const memberGuid = memberState.value.selectedMember?.memberGuid || ''

    if (showLoading)
      $q.loading.show({
        message: 'Loading ...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })

    const resp = await addOrRemoveOrderItemsByMemberGuid({
      data,
      isAdd,
      memberGuid,
    },

    )

    if (!resp.ok)
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'something went wrong adding an item to the cart, please refresh the app and try again',

      })

    if (showLoading) $q.loading.hide()


    $moStore.setOrderItems(resp.ok ? resp.data : [])

    return resp.ok

  };



  return {
    memberOrderState: computed(() => $moStore.$state),

    async getInitialData() {


      const mGuid = memberState.value.selectedMember?.memberGuid || ''

      const resp = await Promise.all([
        getPromotionsByMemberGuid(mGuid),
        getMemberListMemberGuid(mGuid),
        getOrderItemsByMemberGuid(mGuid),
        getOrganizationSettings(mGuid),
        getAdditionalCharityOptions(),
        getCharityOptions(),
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

      $moStore.$patch({
        memberList: resp[1].data,
        orderItems: resp[2].data,
        promotions,
        orgSettings: resp[3].data[0],
        additionalCharityOptions: resp[4].data,
        charityOptions: resp[5].data,
      })
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


    async updateCart(data: {
      promotions: OrderPromotionInterface[];
      membersAdd: OrderMemberListInterface[];
      // membersDelete: OrderMemberListInterface[];
    }) {

      const memberGuid = memberState.value.selectedMember?.memberGuid || ''
      const memberId = memberState.value.selectedMember?.memberId || 0

      let respAdd = undefined;
      // let respDelete = undefined;
      let respPromotions = undefined

      if (data.membersAdd.length)
        respAdd = await addMember({
          memberGuid,
          memberId
        },
          [...data.membersAdd.map(member => ({
            receiver: member.id,
            tempcode: `${memberGuid}+${member.id}`
          }))]
        )

      // if (data.membersDelete.length)
      //   respDelete = await removeMember({
      //     memberGuid,
      //     memberId
      //   },
      //     [...data.membersDelete.map(member => ({
      //       receiver: member.id,
      //       tempcode: `${memberGuid}+${member.id}`
      //     }))]
      //   )

      if (data.promotions.length)
        respPromotions =
          await Promise.all(
            data.promotions.map(item => addOrRemoveItem(!!item.selected, {
              description: item.displayText,
              itemId: item.itemId,
              message: "",
              price: item.price,
              quantity: item.quantity,
              sessionId: authState.value.token?.token || "",
              shipTo: ""
            })),

          )


      if (
        respAdd !== undefined ||
        // respDelete !== undefined ||
        respPromotions !== undefined

      ) {

        const validRespAdd = respAdd === undefined ? true : respAdd.ok
        // const validRespDelete = respDelete === undefined ? true : respDelete.ok
        const validRespPromotions = respPromotions === undefined ? true : respPromotions.every(resp => resp)





        showToast(
          validRespAdd &&
          // validRespDelete &&
          validRespPromotions,
          'card update',
          'something went wrong updating the invoice text'
        )
      }


    },

    async getOrderItemsByMemberGuid() {
      const mGuid = memberState.value.selectedMember?.memberGuid || ''
      const resp = await getOrderItemsByMemberGuid(mGuid, {
        loading: {
          message: 'loading order items...'
        }
      })
      $moStore.setOrderItems(resp.ok ? resp.data : [])
    },

    async addOrRemoveDonation(isAdd: boolean, charity: CharityType) {

      const data: MemberOrderItemsInterface = {
        description: charity.description,
        itemId: charity.id,
        message: "",
        price: charity.value,
        quantity: 1,
        shipTo: "",
        sessionId: authState.value.token?.token || "",
      }
      await addOrRemoveItem(isAdd, data)
    },

    setUpdatedPromotions(promotions: OrderPromotionInterface[]) {
      const oldPromotions = $moStore.promotions

      for (let i = 0; i < promotions.length; i++) {
        const pro = oldPromotions.find(p => p.itemId == promotions[i]!.itemId)
        if (pro)
          pro.selected = !!promotions[i]!.selected

      }
    },


    async removeMemberFromCart(member: OrderMemberListInterface) {

      const memberGuid = memberState.value.selectedMember?.memberGuid || ''
      const memberId = memberState.value.selectedMember?.memberId || 0

      await removeMember({
        memberGuid,
        memberId
      },
        [{
          receiver: member.id,
          tempcode: `${memberGuid}+${member.id}`
        }],
        {
          loading: {
            message: 'removing member...'
          }
        }
      )

    },


  }
};
