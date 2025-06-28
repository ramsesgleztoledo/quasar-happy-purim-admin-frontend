import type { MemberAdditionalCharityOptionsInterface, MemberCharityOptionInterface, MemberOrderItemsInterface, MemberOrderOrgSettingInterface, OrderMemberListInterface, OrderPromotionInterface } from "../../interfaces/memberOrder-interfaces";
import type { NoneType } from "../../services/service-interfaces";


export interface MemberOrderStateInterface {
  promotions: OrderPromotionInterface[];
  memberList: OrderMemberListInterface[];
  orderItems: MemberOrderItemsInterface[];
  orgSettings: MemberOrderOrgSettingInterface | NoneType
  membersSelected: OrderMemberListInterface[]
  additionalCharityOptions: MemberAdditionalCharityOptionsInterface[]
  charityOptions: MemberCharityOptionInterface[]
}
