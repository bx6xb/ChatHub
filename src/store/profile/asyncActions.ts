import { createAsyncThunk } from '@reduxjs/toolkit'
import { profileAPI } from '../../api/api'
import { errorHandler } from '../../utils/errorHandling/errorHandler'
import { AppRootState } from '../store'
import { t } from 'i18next'
import { Photos, ProfileData, ProfileDomain } from '../../api/types'
import { changeProfileStatus } from './reducer'

export const getUserProfile = createAsyncThunk<
  ProfileDomain,
  number,
  { rejectValue: null }
>('profile/getUserProfile', async (userId, { rejectWithValue, dispatch }) => {
  try {
    const response = await profileAPI.getUserProfile(userId)
    return response.data
  } catch {
    errorHandler(dispatch, t('network_error'))
    return rejectWithValue(null)
  }
})
export const getProfileStatus = createAsyncThunk<
  string,
  number,
  { rejectValue: null }
>(
  'profile/getProfileStatus',
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const status = (await profileAPI.getProfileStatus(userId)).data
      dispatch(changeProfileStatus(status))
      return status
    } catch {
      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    }
  }
)
export const setProfileStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: null; state: AppRootState }
>(
  'profile/setProfileStatus',
  async (status: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileAPI.setProfileStatus(status)
      if (response.data.resultCode === 0) {
        dispatch(changeProfileStatus(status))
        return status
      } else {
        errorHandler(dispatch, t('status_error'))
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
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
      errorHandler(dispatch, t('photo_error'))
      return rejectWithValue(null)
    }
  } catch {
    errorHandler(dispatch, t('network_error'))
    return rejectWithValue(null)
  }
})
export const setProfileData = createAsyncThunk<
  void,
  ProfileData,
  { rejectValue: null; state: AppRootState }
>(
  'profile/setProfileData',
  async (profileData: ProfileData, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await profileAPI.setProfileData(profileData)
      if (response.data.resultCode === 0) {
        const userId = getState().auth.id!
        dispatch(getUserProfile(userId))
      } else {
        // parse error field
        const errorMessage = response.data.messages[0]
        const errorField = errorMessage.match(/\(Contacts->([^)]+)\)/)![1]
        errorHandler(dispatch, t('url_error') + ` - ${errorField}`)
        return rejectWithValue(null)
      }
    } catch {
      errorHandler(dispatch, t('network_error'))
      return rejectWithValue(null)
    }
  }
)
