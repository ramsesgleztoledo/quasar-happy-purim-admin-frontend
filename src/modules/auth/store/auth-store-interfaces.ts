export interface authStateInterface {
  shul?: authShulInterface | undefined | null;
  user?: authUserInterface | undefined | null;
  token?: authTokenInterface | undefined | null;
  serverToken?: authServerTokenInterface | undefined | null;
}
export interface authShulInterface {
  shulId: string;
  shulName: string;
}
export interface authUserInterface {
  id: string;
  guid: string;
  firstName: string;
  lastName: string;
};
export interface authTokenInterface {
  token: string;
  refresh_token: string;
  token_exp: number;

};
export interface authServerTokenInterface {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: Date;
}
