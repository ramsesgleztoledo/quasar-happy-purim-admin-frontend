
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberOrderStateInterface } from './memberOrder-store-interfaces';
import type { OrderMemberListInterface, OrderPromotionInterface, MemberOrderItemsInterface, MemberOrderOrgSettingInterface, MemberAdditionalCharityOptionsInterface, MemberCharityOptionInterface } from '../../interfaces/memberOrder-interfaces';
import type { NoneType } from '../../services/service-interfaces';



const initialState: MemberOrderStateInterface = {
  promotions: [],
  memberList: [],
  orderItems: [],
  membersSelected: [],
  orgSettings: undefined,
  additionalCharityOptions: [],
  charityOptions: [],
}

export const useMemberOrderStore = defineStore('memberOrderStore', {
  state: (): MemberOrderStateInterface => ({
    ...initialState
  }),

  getters: {
    getMemberList: (state) => state.memberList,
  },

  actions: {
    setPromotions(promotions: OrderPromotionInterface[]) {
      this.promotions = [...promotions.map(item => ({ ...item }))];
    },
    setMemberList(memberList: OrderMemberListInterface[]) {
      this.memberList = [...memberList.map(item => ({ ...item }))];
    },
    setOrderItems(orderItems: MemberOrderItemsInterface[]) {
      this.orderItems = [...orderItems.map(item => ({ ...item }))];
    },
    setOrgSettings(orgSettings: MemberOrderOrgSettingInterface | NoneType) {
      this.orgSettings = orgSettings
    },
    setMembersSelected(membersSelected: OrderMemberListInterface[]) {
      this.membersSelected = membersSelected.map(item => ({ ...item }))
    },
    setAdditionalCharityOptions(additionalCharityOptions: MemberAdditionalCharityOptionsInterface[]) {
      this.additionalCharityOptions = additionalCharityOptions.map(item => ({ ...item }))
    },
    setCharityOptions(charityOptions: MemberCharityOptionInterface[]) {
      this.charityOptions = charityOptions.map(item => ({ ...item }))
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberOrderStore, import.meta.hot));
}
