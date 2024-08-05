import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PostData, ProfileState } from './types'
import { getUserProfile, setProfilePhoto } from './asyncActions'
import {
  getRandomPosts,
  Languages
} from '../../utils/randomData/getRandomPosts'
import { getRandomNumber } from '../../utils/randomData/getRandomNumber'

const slice = createSlice({
  name: 'profile',
  initialState: {
    posts: [],
    userProfile: null,
    profileStatus: ''
  } as ProfileState,
  reducers: {
    generatePosts(state, action: PayloadAction<Languages>) {
      const randomPostsArray = getRandomPosts(action.payload)
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
    addPost(state, action: PayloadAction<string>) {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: action.payload,
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
    },
    changeProfileStatus(state, action: PayloadAction<string>) {
      return {
        ...state,
        profileStatus: action.payload
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
export const { generatePosts, addPost, changePostData, changeProfileStatus } =
  slice.actions
