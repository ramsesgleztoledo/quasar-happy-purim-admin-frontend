import type { MembershipStatusInterface } from "src/services/api-interfaces";
import type { MemberCategoryInterface } from "../../interfaces/category-interfaces";
import type { AlternativeMemberAddress, MemberDataInterface, MemberDonateBasketOptionInterface, MemberOptionsInterface, MemberProfileQuestionInterface, MembersResponseInterface, MemberTransactionInterface } from "../../interfaces/member-interfaces";
import type { NoneType } from "../../services/service-interfaces";


export interface MemberStateInterface {
  members: MembersResponseInterface;
  selectedMember: MemberDataInterface | NoneType;
  memberOptions: MemberOptionsInterface;
  memberCategories: MemberCategoryInterface[];
  isPendingDeletion: boolean;
  memberAlternativeAddress: AlternativeMemberAddress | NoneType;
  memberTransactions: MemberTransactionInterface[];
  memberDonateBasketOption: MemberDonateBasketOptionInterface | NoneType;
  profileQuestions: MemberProfileQuestionInterface[];
  displayChildren: boolean;
  doorManSettings: {
    show: boolean;
    value: boolean;
  };
  membershipSettings: MembershipStatusInterface;
  showRecordPaymentBtn: boolean;
}



