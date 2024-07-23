import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Post, PostData, ProfileState } from './types'
import {
  getProfileStatus,
  getUserProfile,
  setProfilePhoto,
  setProfileStatus
} from './asyncActions'
import { randomPosts } from '../../utils/randomPosts'
import { getRandomNumber } from '../../utils/randomNumber'

const slice = createSlice({
  name: 'profile',
  initialState: {
    posts: [],
    userProfile: null,
    profileStatus: ''
  } as ProfileState,
  reducers: {
    generatePosts(state) {
      const randomPostsArray = randomPosts()
      return {
        ...state,
        posts: randomPostsArray.map((message, i) => ({
          id: i + 1,
          message,
          likesCount: getRandomNumber(0, 10),
          dislikesCount: getRandomNumber(0, 2)
        }))
      }
    },
    addPost(state, action: PayloadAction<{ message: string }>) {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: action.payload.message,
            likesCount: 0,
            dislikesCount: 0
          },
          ...state.posts
        ]
      }
    },
    changePostData(
      state,
      action: PayloadAction<{
        id: number
        data: Partial<PostData>
      }>
    ) {
      return {
        ...state,
        posts: state.posts.map(p =>
          p.id === action.payload.id
            ? {
                ...p,
                ...action.payload.data
              }
            : p
        )
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
export const { generatePosts, addPost, changePostData } = slice.actions
