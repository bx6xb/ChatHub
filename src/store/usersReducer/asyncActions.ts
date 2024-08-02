import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeIsFetching, changeIsFollowingInProgress } from './usersReducer'
import { followAPI, usersAPI } from '../../api/api'
import { errorHandler, networkErrorHandler } from '../../utils/errorHandler'
import { t } from 'i18next'

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
      errorHandler(dispatch, t('network_error'))
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
        errorHandler(dispatch, t('follow_error'))
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
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
        errorHandler(dispatch, t('unfollow_error'))
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
