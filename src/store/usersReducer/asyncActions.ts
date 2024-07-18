import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeIsFetching, changeIsFollowingInProgress } from './usersReducer'
import { followAPI, usersAPI } from '../../api/api'
import { errorHandler, networkErrorHandler } from '../../utils/errorHandler'

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (
    { pageSize, currentPage }: { pageSize: number; currentPage: number },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(changeIsFetching({ isFetching: true }))

    try {
      const response = await usersAPI.getUsers(pageSize, currentPage)
      return {
        users: response.data.items,
        totalCount: response.data.totalCount,
        currentPage
      }
    } catch {
      errorHandler(dispatch, 'Network error: failed to load users')
      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFetching({ isFetching: false }))
    }
  }
)
export const follow = createAsyncThunk(
  'users/follow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.follow(userId)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        errorHandler(dispatch, 'Failed to follow user')
        return rejectWithValue(null)
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
export const unfollow = createAsyncThunk(
  'users/unfollow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.unfollow(userId)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        errorHandler(dispatch, 'Failed to unfollow user')
        return rejectWithValue(null)
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
