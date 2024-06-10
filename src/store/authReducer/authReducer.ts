import { FormData, FormFields, authAPI, securityAPI } from "../../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { errorHandler, networkErrorHandler } from "../../utils/errorHandler"

// thunks
export const setUserData = createAsyncThunk("auth/setUserData", async () => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    return { ...response.data.data, isAuth: true }
  } else {
    return { isAuth: false }
  }
})
export const login = createAsyncThunk<
  void,
  FormData,
  { rejectValue: { field: FormFields; error: string } }
>("auth/login", async (formData: FormData, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.login(formData)
    if (response.data.resultCode === 0) {
      dispatch(setUserData())
    } else if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    } else {
      return rejectWithValue({ ...response.data.fieldsErrors[0] })
    }
  } catch {
    networkErrorHandler(dispatch)
  }
})
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode === 0) {
        return fulfillWithValue({})
      } else {
        errorHandler(dispatch, "Failed to logout")
        return rejectWithValue({})
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue({})
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
      return rejectWithValue({})
    }
  }
)

export const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
} as AuthState

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(logout.fulfilled, (state) => ({
        ...state,
        id: null,
        email: null,
        login: null,
        isAuth: false,
      }))
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        return {
          ...state,
          captchaUrl: action.payload,
        }
      })
  },
})

export const authReducer = slice.reducer

// types
export type AuthState = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}
