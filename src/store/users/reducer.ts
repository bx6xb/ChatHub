import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UsersPageState } from './types'
import { follow, getUsers, unfollow } from './asyncActions'

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    pageSize: 10,
    totalUsersCount: 28,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []
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
          : state.isFollowingInProgress.filter(
              id => id !== action.payload.userId
            )
      }
    },
    changeIsFetching(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isFetching: action.payload
      }
    },
    changePageSize(state, action: PayloadAction<number>) {
      return {
        ...state,
        pageSize: action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => ({
        ...state,
        users: action.payload.users,
        totalUsersCount: action.payload.totalCount,
        currentPage: action.payload.currentPage
      }))
      .addCase(follow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map(u =>
          u.id === action.payload ? { ...u, followed: true } : u
        )
      }))
      .addCase(unfollow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map(u =>
          u.id === action.payload ? { ...u, followed: false } : u
        )
      }))
  }
})

export const usersReducer = slice.reducer
export const { changeIsFollowingInProgress, changeIsFetching, changePageSize } =
  slice.actions
