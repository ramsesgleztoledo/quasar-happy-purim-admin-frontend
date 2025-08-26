import type { OrderMemberListInterface, OrderPromotionInterface } from "../interfaces/memberOrder-interfaces";

export const getMembersByPromotion = (promotion: OrderPromotionInterface, members: OrderMemberListInterface[], notFound?: boolean) => {


  const isAll = promotion.categories.toLowerCase().includes('all')
  if (isAll) return notFound ? [] : members

  if (!promotion.joinCategories) return notFound ? members.filter(me => me.selected && !me.paid) : []

  const cats = promotion.joinCategories.split(',')

  return members.filter(member => {
    const paid = member.paid
    if (paid) return false
    let found = false
    const memberCat = member.memberCategories.split(',')
    for (let i = 0; i < cats.length; i++) {
      if (memberCat.includes(cats[i]!)) {
        found = true
        break
      }
    }
    return notFound ? !found : found
  })
};

