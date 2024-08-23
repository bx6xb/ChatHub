import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeIsFetching, changeIsFollowingInProgress } from './reducer'
import { followAPI, usersAPI } from '../../api/api'
import { errorHandler } from '../../utils/errorHandling/errorHandler'
import { t } from 'i18next'
import { GetUsersArgs, GetUsersReturn } from './types'
import { AxiosError } from 'axios'

export const getUsers = createAsyncThunk<
  GetUsersReturn,
  GetUsersArgs,
  { rejectValue: null }
>(
  'users/getUsers',
  async ({ pageSize, currentPage }, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFetching(true))

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
      dispatch(changeIsFetching(false))
    }
  }
)
export const follow = createAsyncThunk<number, number, { rejectValue: null }>(
  'users/follow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.follow(userId)
      console.log(response)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        return rejectWithValue(null)
      }
    } catch (e) {
      const error = e as AxiosError
      if (error.response?.status === 403) {
        errorHandler(dispatch, t('follow_error'))
      } else {
        errorHandler(dispatch, t('network_error'))
      }

      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
export const unfollow = createAsyncThunk<number, number, { rejectValue: null }>(
  'users/unfollow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

    try {
      const response = await followAPI.unfollow(userId)
      if (response.data.resultCode === 0) {
        return userId
      } else {
        return rejectWithValue(null)
      }
    } catch (e) {
      const error = e as AxiosError
      if (error.response?.status === 403) {
        errorHandler(dispatch, t('unfollow_error'))
      } else {
        errorHandler(dispatch, t('network_error'))
      }

      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    } finally {
      dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
    }
  }
)
