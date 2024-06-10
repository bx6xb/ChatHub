import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User, usersAPI } from "../../api/api"
import { getRandomNumber } from "../../utils/randomData"
import { networkErrorHandler } from "../../utils/errorHandler"

export const getSidebarUsers = createAsyncThunk(
  "sidebar/getSidebarUsers",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(3, getRandomNumber(1, 5000))
      return response.data.items as SidebarUsersArray
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue({})
    }
  }
)

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

// types
type SidebarUsersArray = [User, User, User]
type SidebarReducerState = {
  users: SidebarUsersArray | null
}
export type SidebarReducerAction = any
