import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { getCaptchaUrl, logout, setUserData } from './asyncActions'

export const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  userPhoto: null
} as AuthState

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserPhoto(state, action: PayloadAction<string>) {
      return {
        ...state,
        userPhoto: action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(setUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload
      }))
      .addCase(logout.fulfilled, state => ({
        ...state,
        id: null,
        email: null,
        login: null,
        isAuth: false
      }))
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        return {
          ...state,
          captchaUrl: action.payload
        }
      })
  }
})

export const authReducer = slice.reducer
export const { setUserPhoto } = slice.actions
