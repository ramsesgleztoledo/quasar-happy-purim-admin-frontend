import type { MemberOrderItemsInterface, OrderMemberListInterface, OrderPromotionInterface } from "../../interfaces/memberOrder-interfaces";


export interface MemberOrderStateInterface {
  promotions: OrderPromotionInterface[];
  memberList: OrderMemberListInterface[];
  orderItems: MemberOrderItemsInterface[];
}
