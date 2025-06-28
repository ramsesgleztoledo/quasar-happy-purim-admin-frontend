import type { OrderMemberListInterface, OrderPromotionInterface } from '../../../../../../interfaces/memberOrder-interfaces';



export interface StepOneCreateOrderInterface {
  saveChanges: () => ({
    promotions: OrderPromotionInterface[];
    membersAdd: OrderMemberListInterface[];
    // membersDelete: OrderMemberListInterface[];
  })
}
