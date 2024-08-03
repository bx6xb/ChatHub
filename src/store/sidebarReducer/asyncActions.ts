import { createAsyncThunk } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/api'
import { getRandomNumber } from '../../utils/getRandomNumber'
import { SidebarUsersArray } from './types'
import { errorHandler } from '../../utils/errorHandler'
import { t } from 'i18next'

export const getSidebarUsers = createAsyncThunk<
  SidebarUsersArray,
  void,
  { rejectValue: null }
>('sidebar/getSidebarUsers', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const response = await usersAPI.getUsers(3, getRandomNumber(1, 5000))
    return response.data.items as SidebarUsersArray
  } catch {
    errorHandler(dispatch, t('network_error'))
    return rejectWithValue(null)
  }
})
