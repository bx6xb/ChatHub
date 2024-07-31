export type AuthState = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
  authorizedUserPhoto: string | null
}
