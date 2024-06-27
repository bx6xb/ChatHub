import { createSlice } from "@reduxjs/toolkit"
import { SidebarReducerState } from "./types"
import { getSidebarUsers } from "./asyncActions"

const slice = createSlice({
  name: "sidebar",
  initialState: {
    users: null,
  } as SidebarReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSidebarUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    })
  },
})

export const sidebarReducer = slice.reducer
