import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileState } from './types'
import {
  getProfileStatus,
  getUserProfile,
  setProfilePhoto,
  setProfileStatus
} from './asyncActions'

const slice = createSlice({
  name: 'profile',
  initialState: {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: 'Blabla', likesCount: 10 },
      { id: 4, message: 'Dada', likesCount: 9 }
    ],
    userProfile: null,
    profileStatus: ''
  } as ProfileState,
  reducers: {
    addPost(state, action: PayloadAction<{ message: string }>) {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: action.payload.message,
            likesCount: 0
          },
          ...state.posts
        ]
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          userProfile: action.payload
        }
      })
      .addCase(getProfileStatus.fulfilled, (state, action) => {
        return {
          ...state,
          profileStatus: action.payload
        }
      })
      .addCase(setProfileStatus.fulfilled, (state, action) => {
        return {
          ...state,
          profileStatus: action.payload
        }
      })
      .addCase(setProfilePhoto.fulfilled, (state, action) => {
        if (state.userProfile) {
          return {
            ...state,
            userProfile: {
              ...state.userProfile,
              photos: {
                ...action.payload
              }
            }
          }
        }
      })
  }
})

export const profileReducer = slice.reducer
export const { addPost } = slice.actions
