export interface MemberInterface {
  m_id: number;
  m_LastName: string;
  m_FName: null | string;
  m_SFName: string;
  m_Address1: string;
  m_Address2: string | null;
  m_phone: null | string;
  m_City: null | string;
  m_State: string | null;
  m_Zip: null | string;
  m_email: null | string;
  m_email2: string | null;
  m_kids: string | null;
  m_Code: string;
  m_Rec: number;
  m_MemberOf: number;
  m_PaidMember: number;
  m_confirmed: number;
  m_displayname: null | string;
  m_CheckedOut: number;
  m_AmountPaid: null | string;
  m_AuthorizationNumber: null | string;
  m_CCEXP: null | string;
  m_CCNumber: string | null;
  m_chapter: null | string;
  m_school: null | string;
  m_grade: null | string;
  m_category: string;
  m_cat2: string;
  m_cat3: null | string;
  m_cat4: string;
  m_customoption: number;
  m_route: string | null;
  m_added: Date;
  m_title: null | string;
  m_misc: string;
  m_SLastName: string | null;
  m_hidden: boolean;
  m_deleted: boolean;
  m_notes: string | null;
  m_salutation: string | null;
  MemberGUID: string;
}


export interface MemberDataInterface {
  memberId: number;
  title: string;
  firstName: string;
  lastName: string;
  spouseFirstName: string;
  spouseLastName: string;
  displayAs: string;
  salutation: string | null;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
  children: string;
  email: string;
  email2: string;
  notes: string | null;
  route: string | null;
  misc: string;
  misc2: string;
  loginCode: string;
  showReciprocity: boolean;
  signOnLink: string;
  spouseTitle: string | null | undefined;
  phone2: string | null | undefined;
  foods: string | null | undefined;
}

export interface MemberOptionsInterface {
  hidden: boolean,
  reciprocity: MemberReciprocityInterface
}

export interface MemberHiddenInterface {
  m_hidden: boolean
}
export interface MemberReciprocityInterface {
  showReciprocity: boolean
  isReciprocal: boolean
}
export interface PendingDeletionInterface {
  isPendingDeletion: boolean
}


export interface AlternativeMemberAddress {
  showAlternateDelivery: boolean;
}

export interface MemberTransactionInterface {
  tranId: number;
  trancctype: string;
  tranPostedDate: Date;
  tranProcessedDate: Date;
  tranNameOnCard: string;
  recordedBy: string;
  trantotalcharge: number;
  paid: number;
  balanceDue: number;
}
export interface MemberDonateBasketOptionInterface {
  visible: boolean;
  text?: string;
  checked?: boolean;
}


export interface EmailLoginCodeInfoInterface {
  toEmail: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  body: string;
}
