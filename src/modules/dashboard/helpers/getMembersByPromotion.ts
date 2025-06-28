import type { OrderMemberListInterface } from "../interfaces/memberOrder-interfaces";

export const getMembersByPromotion = (proCat: string, members: OrderMemberListInterface[], notFound?: boolean) => {

  const cats = proCat.split(',')

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

