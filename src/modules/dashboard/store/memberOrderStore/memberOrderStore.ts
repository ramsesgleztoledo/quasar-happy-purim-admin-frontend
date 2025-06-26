
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberOrderStateInterface } from './memberOrder-store-interfaces';
import type { OrderMemberListInterface, OrderPromotionInterface, MemberOrderItemsInterface } from '../../interfaces/memberOrder-interfaces';



const initialState: MemberOrderStateInterface = {
  promotions: [],
  memberList: [],
  orderItems: [],
}

export const useMemberOrderStore = defineStore('memberOrderStore', {
  state: (): MemberOrderStateInterface => ({
    ...initialState
  }),

  getters: {
  },

  actions: {
    setPromotions(promotions: OrderPromotionInterface[]) {
      this.promotions = promotions;
    },
    setMemberList(memberList: OrderMemberListInterface[]) {
      this.memberList = memberList;
    },
    setOrderItems(orderItems: MemberOrderItemsInterface[]) {
      this.orderItems = orderItems;
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberOrderStore, import.meta.hot));
}
