import { createAsyncThunk } from "@reduxjs/toolkit"
import { usersAPI } from "../../api/api"
import { getRandomNumber } from "../../utils/randomData"
import { SidebarUsersArray } from "./types"
import { networkErrorHandler } from "../../utils/errorHandler"

const getSidebarUsers = createAsyncThunk(
  "sidebar/getSidebarUsers",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(3, getRandomNumber(1, 5000))
      return response.data.items as SidebarUsersArray
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)

export { getSidebarUsers }
