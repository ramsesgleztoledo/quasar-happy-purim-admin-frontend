import type { MemberDataInterface, MemberInterface, MemberOptionsInterface } from "../../interfaces/member-interfaces";
import type { NoneType } from "../../services/service-interfaces";


export interface MemberStateInterface {
  members: MemberInterface[];
  selectedMember: MemberDataInterface | NoneType;
  memberOptions: MemberOptionsInterface
}



