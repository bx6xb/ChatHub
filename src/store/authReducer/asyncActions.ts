import { createAsyncThunk } from "@reduxjs/toolkit"
import { FormData, authAPI, securityAPI } from "../../api/api"
import { errorHandler, networkErrorHandler } from "../../utils/errorHandler"

export const setUserData = createAsyncThunk("auth/setUserData", async () => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    return { ...response.data.data, isAuth: true }
  } else {
    return { isAuth: false }
  }
})
export const login = createAsyncThunk<void, FormData, { rejectValue: string }>(
  "auth/login",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(formData)
      if (response.data.resultCode === 0) {
        dispatch(setUserData())
      } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      } else {
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch {
      networkErrorHandler(dispatch)
    }
  }
)
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode === 0) {
        return fulfillWithValue({})
      } else {
        errorHandler(dispatch, "Failed to logout")
        return rejectWithValue(null)
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
export const getCaptchaUrl = createAsyncThunk(
  "auth/getCaptchaUrl",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await securityAPI.getCaptcha()
      return response.data.url
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
