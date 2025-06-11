
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { MemberStateInterface } from './member-store-interfaces';
import type { MemberDataInterface, MemberOptionsInterface } from '../../interfaces/member-interfaces';
import type { NoneType } from '../../services/service-interfaces';


const initialState: MemberStateInterface = {
  members: [],
  selectedMember: undefined,
  memberOptions: {
    hidden: false,
    reciprocity: {
      isReciprocal: false,
      showReciprocity: false
    }
  }
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
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot));
}
