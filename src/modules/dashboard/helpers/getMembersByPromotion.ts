import type { OrderMemberListInterface, OrderPromotionInterface } from "../interfaces/memberOrder-interfaces";

export const getMembersByPromotion = (promotion: OrderPromotionInterface, members: OrderMemberListInterface[], promotions?: OrderPromotionInterface[], notFound?: boolean) => {




  const isAll = promotion.categories.toLowerCase().includes('all')
  if (isAll) return notFound ? [] : members.filter(me => !me.paid)

  if (!promotion.joinCategories) return notFound ? members.filter(me => me.selected && !me.paid) : []

  const cats = promotion.joinCategories.split(',')

  const auxPromotions = promotions?.filter(pro => pro.id !== promotion.id && pro.selected).map(pro => pro.joinCategories.split(',') || [])

  return members.filter(member => {
    const paid = member.paid
    if (paid) return false
    let found = false
    const memberCat = member.memberCategories.split(',')
    for (let i = 0; i < cats.length; i++) {
      if (memberCat.includes(cats[i]!) &&
      ((auxPromotions && !checkOtherIncludes(memberCat, auxPromotions)) || !auxPromotions)) {
        found = true
        break
      }
    }
    return notFound ? !found : found
  })
};
export const getMembersInsidePromotion = (promotion: OrderPromotionInterface, members: OrderMemberListInterface[]) => {


  const isAll = promotion.categories.toLowerCase().includes('all')
  if (isAll) return members.filter(me => !me.paid && me.selected)

  if (!promotion.joinCategories) return []

  const cats = promotion.joinCategories.split(',')

  return members.filter(member => {
    if (member.paid) return false

    if (!member.selected) return false
    let found = false
    const memberCat = member.memberCategories.split(',')
    for (let i = 0; i < cats.length; i++) {
      if (memberCat.includes(cats[i]!)) {
        found = true
        break
      }
    }
    return found
  })
};


const checkOtherIncludes = (memberCats: string[], cats: string[][]) =>
  memberCats.some(el1 =>
    cats.some(innerArr => innerArr.includes(el1))
  );


