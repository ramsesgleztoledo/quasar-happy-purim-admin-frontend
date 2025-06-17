
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberStateInterface } from './member-store-interfaces';
import type { AlternativeMemberAddress, MemberDataInterface, MemberDonateBasketOptionInterface, MemberOptionsInterface, MemberTransactionInterface } from '../../interfaces/member-interfaces';
import type { NoneType } from '../../services/service-interfaces';
import type { MemberCategoryInterface } from '../../interfaces/category-interfaces';


const initialState: MemberStateInterface = {
  members: [],
  selectedMember: undefined,
  memberOptions: {
    hidden: false,
    reciprocity: {
      isReciprocal: false,
      showReciprocity: false
    }
  },
  memberCategories: [],
  isPendingDeletion: false,
  memberAlternativeAddress: undefined,
  memberTransactions: [],
  memberDonateBasketOption: undefined,
}

export const useMemberStore = defineStore('memberStore', {
  state: (): MemberStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setSelectedMember(member: MemberDataInterface | NoneType) {
      this.selectedMember = member;
    },
    setMemberOptions(memberOptions: MemberOptionsInterface) {
      this.memberOptions = { ...memberOptions };
    },
    setMemberCategories(memberCategories: MemberCategoryInterface[]) {
      this.memberCategories = [...memberCategories];
    },
    setIsPendingDeletion(value: boolean) {
      this.isPendingDeletion = value
    },
    setMemberAlternativeAddress(memberAlternativeAddress: AlternativeMemberAddress | NoneType) {
      this.memberAlternativeAddress = memberAlternativeAddress
    },
    setMemberTransactions(memberTransactions: MemberTransactionInterface[]) {
      this.memberTransactions = memberTransactions
    },
    setMemberDonateBasketOption(memberDonateBasketOption: MemberDonateBasketOptionInterface | NoneType) {
      this.memberDonateBasketOption = memberDonateBasketOption
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot));
}
