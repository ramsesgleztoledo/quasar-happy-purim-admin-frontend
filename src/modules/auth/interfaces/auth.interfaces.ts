export interface LoginUrlInterface {
  token: string;
}
export interface LoginInterface {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: Date;
}

export interface AuthJWTInterface {
  sub: string;
  jti: string;
  u_id: string;
  u_guid: string;
  fname: string;
  lname: string;
  shulId: string;
  shulName: string;
  email: string;
  exp: number;
  iss: string;
  aud: string;
}
