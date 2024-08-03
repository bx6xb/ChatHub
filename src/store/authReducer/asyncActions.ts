import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI, securityAPI } from '../../api/api'
import { errorHandler } from '../../utils/errorHandler'
import { t } from 'i18next'
import { DataForm, UserDataDomain } from '../../api/types'

export const setUserData = createAsyncThunk<
  UserDataDomain | { isAuth: boolean },
  void
>('auth/setUserData', async () => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    return { ...response.data.data, isAuth: true }
  } else {
    return { isAuth: false }
  }
})
export const login = createAsyncThunk<void, DataForm, { rejectValue: null }>(
  'auth/login',
  async (formData: DataForm, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(formData)
      if (response.data.resultCode === 0) {
        dispatch(setUserData())
      } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
        errorHandler(dispatch, t('captcha_error'))
        return rejectWithValue(null)
      } else {
        errorHandler(dispatch, t('email_or_password_error'))
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    }
  }
)
export const logout = createAsyncThunk<undefined, void, { rejectValue: null }>(
  'auth/logout',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode !== 0) {
        errorHandler(dispatch, t('logout_error'))
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    }
  }
)
export const getCaptchaUrl = createAsyncThunk<
  string,
  void,
  { rejectValue: null }
>('auth/getCaptchaUrl', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const response = await securityAPI.getCaptcha()
    return response.data.url
  } catch {
    errorHandler(dispatch, t('network_error'))
    return rejectWithValue(null)
  }
})
