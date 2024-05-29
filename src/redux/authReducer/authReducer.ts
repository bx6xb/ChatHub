import { stopSubmit } from "redux-form"
import { FormData, authAPI } from "../../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// thunks
export const setUserData = createAsyncThunk("auth/setUserData", async () => {
  const response = await authAPI.me()
  return response.data.data
})
export const login = createAsyncThunk<void, FormData, { rejectValue: { _error: string } }>(
  "auth/login",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    const response = await authAPI.login(formData)
    if (response.data.resultCode === 0) {
      dispatch(setUserData())
    } else {
      // @ts-ignore
      dispatch(stopSubmit("login", { _error: response.data.messages[0] }))
    }
  }
)
export const logout = createAsyncThunk("auth/logout", async (payload, { fulfillWithValue }) => {
  await authAPI.logout()
  return fulfillWithValue({})
})

export const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
} as UserDataAuthState

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isAuth: true,
      }))
      .addCase(logout.fulfilled, (state) => ({
        ...state,
        id: null,
        email: null,
        login: null,
        isAuth: false,
      }))
  },
})

export const authReducer = slice.reducer

// types
export type UserDataAuthState = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
