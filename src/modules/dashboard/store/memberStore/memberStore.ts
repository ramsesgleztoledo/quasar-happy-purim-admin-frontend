
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberStateInterface } from './member-store-interfaces';
import type { AlternativeMemberAddress, MemberDataInterface, MemberDonateBasketOptionInterface, MemberOptionsInterface, MemberProfileQuestionInterface, MembershipStatusInterface, MemberTransactionInterface } from '../../interfaces/member-interfaces';
import type { NoneType } from '../../services/service-interfaces';
import type { MemberCategoryInterface } from '../../interfaces/category-interfaces';



const initialState: MemberStateInterface = {
  members: {
    filteredCount: 0,
    totalCount: 0,
    members: []
  },
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
  showRecordPaymentBtn: false,
  memberAlternativeAddress: undefined,
  memberTransactions: [],
  memberDonateBasketOption: undefined,
  profileQuestions: [],
  displayChildren: false,
  doorManSettings: {
    show: false,
    value: false
  },
  membershipSettings: {
    visible: true,
    checkedStatus: false
  },
  showClearCart: false
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
    setHidden(hidden: boolean) {
      this.memberOptions.hidden = hidden
    },
    setDisplayChildren(displayChildren: boolean) {
      this.displayChildren = displayChildren
    },
    setProfileQuestions(profileQuestions: MemberProfileQuestionInterface[]) {
      this.profileQuestions = profileQuestions
    },
    setDoorManSettings(doorManSettings: {
      show: boolean,
      value: boolean
    }) {
      this.doorManSettings = doorManSettings
    },
    setMembershipSettings(membershipSettings: MembershipStatusInterface) {
      this.membershipSettings = membershipSettings
    },
    setShowRecordPaymentBtn(value: boolean) {
      this.showRecordPaymentBtn = value
    },
    setShowClearCart(value: boolean) {
      this.showClearCart = value
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot));
}
