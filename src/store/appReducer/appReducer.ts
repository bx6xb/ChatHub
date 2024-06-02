import { createSlice } from "@reduxjs/toolkit"
import { setUserData } from "../authReducer/authReducer"

const slice = createSlice({
  name: "app",
  initialState: {
    isAppInitialized: false,
  } as AppState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserData.fulfilled, (state, action) => ({
      ...state,
      isAppInitialized: true,
    }))
  },
})

export const appReducer = slice.reducer

// types
type AppState = {
  isAppInitialized: boolean
}
