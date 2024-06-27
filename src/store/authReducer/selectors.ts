import { AppRootState } from "../store"

export const selectAuthState = (state: AppRootState) => state.auth
export const selectIsAuth = (state: AppRootState) => state.auth.isAuth
export const selectId = (state: AppRootState) => state.auth.id
export const selectCaptchaUrl = (state: AppRootState) => state.auth.captchaUrl
