import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { setUserData } from "../authReducer/authReducer"

const slice = createSlice({
  name: "app",
  initialState: {
    isAppInitialized: false,
    error: null,
  } as AppState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      return {
        ...state,
        error: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUserData.fulfilled, (state, action) => ({
      ...state,
      isAppInitialized: true,
    }))
  },
})

export const appReducer = slice.reducer
export const { setError } = slice.actions

// types
type AppState = {
  isAppInitialized: boolean
  error: string | null
}
