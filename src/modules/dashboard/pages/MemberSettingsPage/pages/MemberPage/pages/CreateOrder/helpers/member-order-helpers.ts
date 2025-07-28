import { getMembersByPromotion } from "src/modules/dashboard/helpers/getMembersByPromotion"
import type { CustomShippingItemInterface, CustomShippingOptionInterface, ExtendedPromotionType, MemberOrderItemsInterface, OrderMemberListInterface, OrderPromotionInterface } from "src/modules/dashboard/interfaces/memberOrder-interfaces"
import type { MemberOrderStateInterface } from "src/modules/dashboard/store/memberOrderStore/memberOrder-store-interfaces"

export const getPromotionsHelper = (memberList: OrderMemberListInterface[], orderItems: MemberOrderItemsInterface[], promotions: OrderPromotionInterface[]) => {
  const promotionsAux: ExtendedPromotionType[] = []


  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i]!

    const promoFound = checkIfPromotionHelper(item, promotions)
    // if promotion
    if (promoFound.ok) {
      promotionsAux.push({
        ...item,
        memberList: getMembersByPromotion(
          promoFound.promotion!.joinCategories,
          memberList
        ),
      })
    }
  }
  return promotionsAux
}


export const checkIfPromotionHelper = (item: MemberOrderItemsInterface, promotions: OrderPromotionInterface[]) => {
  const found = promotions.find((pro) => pro.itemId === item.itemId)
  return {
    ok: !!found,
    promotion: found,
  }
}


export const getMembersSelectedHelper = (state: MemberOrderStateInterface) => {

  const members: OrderMemberListInterface[] = []

  const promotionsAux = getPromotionsHelper(state.memberList.original, state.orderItems, state.promotions)


  for (let i = 0; i < state.membersSelected.length; i++) {
    const me = state.membersSelected[i]!
    let found = false

    for (let j = 0; j < promotionsAux.length; j++) {
      const foundAux = promotionsAux[j]!.memberList.find((member) => member.id === me.id)
      if (foundAux) {
        found = true
        break
      }
    }
    if (!found) members.push({ ...me, price: me.price ? me.price : state.shulSetting?.sPerperson || 0 })
  }

  return members
}

export const checkDisabledPromotionHelper = (promotion: OrderPromotionInterface, promotions: OrderPromotionInterface[]) => {
  const promotionCat = promotion.joinCategories.split(',') || []




  for (let i = 0; i < promotionCat.length; i++) {
    const cat = promotionCat[i];

    const found = promotions.find((pro) => {
      const same = pro.id !== promotion.id && !!pro.selected
      if (!same) return false;

      const proCat = pro.joinCategories.split(',') || []
      const include = proCat.some((item) => item == cat)

      return same && include
    })
    if (found)
      return true
  }
  return false
}


export const getCustomShippingItemsTotalHelper = (customShippingItems: CustomShippingItemInterface[], customShippingOptions: CustomShippingOptionInterface[]): number => {
  const total = customShippingItems.reduce((pre, cur) => {

    const totalAttributes = cur.attributes.reduce((preA, curA) =>
      preA + (curA.selected && curA.price ? curA.price : 0)
      , 0)

    const found = customShippingOptions.find(item => item.id === cur.shippingOptionId)

    return pre + totalAttributes + (found?.price || 0)
  }, 0)

  return total
};
