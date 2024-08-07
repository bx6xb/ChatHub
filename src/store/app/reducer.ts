import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState, AppMessage } from './types'
import { getUserData } from '../auth/asyncActions'

export const slice = createSlice({
  name: 'app',
  initialState: {
    isAppInitialized: false,
    appMessages: []
  } as AppState,
  reducers: {
    addAppMessage(state, action: PayloadAction<AppMessage>) {
      return {
        ...state,
        appMessages: [...state.appMessages, action.payload]
      }
    },
    removeAppMessage(state, action: PayloadAction<string>) {
      return {
        ...state,
        appMessages: state.appMessages.filter(m => m.id !== action.payload)
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, state => ({
      ...state,
      isAppInitialized: true
    }))
  }
})

export const appReducer = slice.reducer
export const { addAppMessage, removeAppMessage } = slice.actions
