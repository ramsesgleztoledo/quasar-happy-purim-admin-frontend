export interface AdminUserInterface {
  uId: number;
  lastName: string;
  firstName: string;
  login: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  active: boolean;
  isAdmin: boolean;
}


export interface AddUserFormInterface {
  firstName: string;
  lastName: string;
  phone: string;
  login: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  password: string;
  isAdmin: boolean;
}


export type EditUserFormType = Omit<AddUserFormInterface, 'password' | 'isAdmin'> & {
  id: number;
};
