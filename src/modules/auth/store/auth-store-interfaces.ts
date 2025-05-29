export interface authStateInterface {
  user: undefined | null
  company: undefined | null
  token: string | undefined | null
  refresh_token: string | undefined | null
  token_exp: number | undefined | null
}
