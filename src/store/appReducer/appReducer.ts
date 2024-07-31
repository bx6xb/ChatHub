import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState, AppMessage } from './types'
import { setUserData } from '../authReducer/asyncActions'

export const slice = createSlice({
  name: 'app',
  initialState: {
    isAppInitialized: false,
    appMessage: null,
    isError: false
  } as AppState,
  reducers: {
    setIsError(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isError: action.payload
      }
    },
    setAppMessage(state, action: PayloadAction<AppMessage>) {
      return {
        ...state,
        appMessage: action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(setUserData.fulfilled, state => ({
      ...state,
      isAppInitialized: true
    }))
  }
})

export const appReducer = slice.reducer
export const { setIsError, setAppMessage } = slice.actions
