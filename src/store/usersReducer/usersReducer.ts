import { User, followAPI, usersAPI } from "../../api/api"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { errorHandler, networkErrorHandler } from "../../utils/errorHandler"

// thunks
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (
    { pageSize, currentPage }: { pageSize: number; currentPage: number },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(changeIsFetching({ isFetching: true }))

    try {
      const response = await usersAPI.getUsers(pageSize, currentPage)
      return { users: response.data.items, totalCount: response.data.totalCount, currentPage }
    } catch {
      errorHandler(dispatch, "Network error: failed to load users")
      return rejectWithValue({})
    } finally {
      dispatch(changeIsFetching({ isFetching: false }))
    }
  }
)
export const follow = createAsyncThunk(
  "users/follow",
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.follow(userId)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        errorHandler(dispatch, "Failed to follow user")
        return rejectWithValue({})
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
export const unfollow = createAsyncThunk(
  "users/unfollow",
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.unfollow(userId)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        errorHandler(dispatch, "Failed to unfollow user")
        return rejectWithValue({})
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pageSize: 6,
    totalUsersCount: 28,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
  } as UsersPageState,
  reducers: {
    changeIsFollowingInProgress(
      state,
      action: PayloadAction<{ isFetching: boolean; userId: number }>
    ) {
      return {
        ...state,
        isFollowingInProgress: action.payload.isFetching
          ? [...state.isFollowingInProgress, action.payload.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.payload.userId),
      }
    },
    changeIsFetching(state, action: PayloadAction<{ isFetching: boolean }>) {
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    },
    changePageSize(state, action: PayloadAction<{ pageSize: number }>) {
      return {
        ...state,
        pageSize: action.payload.pageSize,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => ({
        ...state,
        users: action.payload.users,
        totalUsersCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
      }))
      .addCase(follow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map((u) => (u.id === action.payload ? { ...u, followed: true } : u)),
      }))
      .addCase(unfollow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map((u) => (u.id === action.payload ? { ...u, followed: false } : u)),
      }))
  },
})

// reducer
export const usersReducer = slice.reducer

// actions
export const { changeIsFollowingInProgress, changeIsFetching, changePageSize } = slice.actions

// types
export type UsersPageState = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingInProgress: number[]
}
export type UsersReducerAction =
  | ReturnType<typeof changeIsFetching>
  | ReturnType<typeof changeIsFollowingInProgress>
