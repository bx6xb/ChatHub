import { createAsyncThunk } from '@reduxjs/toolkit'
import { Photos, ProfileData, ProfileDomain, profileAPI } from '../../api/api'
import { errorHandler, networkErrorHandler } from '../../utils/errorHandler'
import { AppRootState } from '../store'

export const getUserProfile = createAsyncThunk<ProfileDomain, number>(
  'profile/getUserProfile',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await profileAPI.getUserProfile(userId)
      return response.data
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
export const getProfileStatus = createAsyncThunk(
  'profile/getProfileStatus',
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfileStatus(userId)
      return response.data
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
export const setProfileStatus = createAsyncThunk<
  string,
  string,
  { state: AppRootState }
>(
  'profile/setProfileStatus',
  async (status: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileAPI.setProfileStatus(status)
      if (response.data.resultCode === 0) {
        return status
      } else {
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(null)
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
export const setProfilePhoto = createAsyncThunk<
  Photos,
  File,
  { rejectValue: null }
>('profile/setProfilePhoto', async (photo, { dispatch, rejectWithValue }) => {
  try {
    const response = await profileAPI.setProfilePhoto(photo)
    if (response.data.resultCode === 0) {
      return response.data.data.photos
    } else {
      errorHandler(dispatch, response.data.messages[0])
      return rejectWithValue(null)
    }
  } catch {
    networkErrorHandler(dispatch)
    return rejectWithValue(null)
  }
})
export const setProfileData = createAsyncThunk<
  void,
  ProfileData,
  { state: AppRootState }
>(
  'profile/setProfileData',
  async (profileData: ProfileData, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await profileAPI.setProfileData(profileData)
      if (response.data.resultCode === 0) {
        const userId = getState().auth.id!
        dispatch(getUserProfile(userId))
      } else {
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(null)
      }
    } catch {
      networkErrorHandler(dispatch)
      return rejectWithValue(null)
    }
  }
)
