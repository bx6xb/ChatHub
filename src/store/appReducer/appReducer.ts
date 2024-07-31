import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState, Error } from './types'
import { setUserData } from '../authReducer/asyncActions'

const slice = createSlice({
  name: 'app',
  initialState: {
    isAppInitialized: false,
    error: null
  } as AppState,
  reducers: {
    setError(state, action: PayloadAction<Error>) {
      return {
        ...state,
        error: action.payload
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
export const { setError } = slice.actions
