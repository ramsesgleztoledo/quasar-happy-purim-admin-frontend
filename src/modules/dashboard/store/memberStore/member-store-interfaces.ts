import type { MemberCategoryInterface } from "../../interfaces/category-interfaces";
import type { AlternativeMemberAddress, MemberDataInterface, MemberDonateBasketOptionInterface, MemberInterface, MemberOptionsInterface, MemberProfileQuestionInterface, MemberTransactionInterface } from "../../interfaces/member-interfaces";
import type { NoneType } from "../../services/service-interfaces";


export interface MemberStateInterface {
  members: MemberInterface[];
  selectedMember: MemberDataInterface | NoneType;
  memberOptions: MemberOptionsInterface;
  memberCategories: MemberCategoryInterface[];
  isPendingDeletion: boolean;
  memberAlternativeAddress: AlternativeMemberAddress | NoneType;
  memberTransactions: MemberTransactionInterface[];
  memberDonateBasketOption: MemberDonateBasketOptionInterface | NoneType;
  profileQuestions: MemberProfileQuestionInterface[]
}



