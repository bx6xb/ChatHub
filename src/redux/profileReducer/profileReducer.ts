import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Photos, Profile, profileAPI } from "../../api/api"
import { AppRootState } from "../store"

// thunks
export const getUserProfile = createAsyncThunk("profile/getUserProfile", async (userId: number) => {
  const response = await profileAPI.getUserProfile(userId)

  return response.data
})
export const getUserStatus = createAsyncThunk("profile/getUserStatus", async (userId: number) => {
  const response = await profileAPI.getUserStatus(userId)

  return response.data
})
export const setProfileStatus = createAsyncThunk<string, string, { state: AppRootState }>( // fix this: if request was rejected thunk returns old status
  "profile/setProfileStatus",
  async (status: string, { getState }) => {
    try {
      const response = await profileAPI.setProfileStatus(status)
      if (response.data.resultCode === 0) {
        return status
      } else {
        return getState().profile.profileStatus
      }
    } catch {
      return getState().profile.profileStatus
    }
  }
)
export const setProfilePhoto = createAsyncThunk<Photos, File>(
  "profile/setProfilePhoto",
  async (photo, { rejectWithValue }) => {
    const response = await profileAPI.setProfilePhoto(photo)
    if (response.data.resultCode === 0) {
      return response.data.data.photos
    } else {
      return rejectWithValue({})
    }
  }
)

const slice = createSlice({
  name: "profile",
  initialState: {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    userProfile: null,
    profileStatus: "",
  } as ProfileState,
  reducers: {
    addPost(state, action: PayloadAction<{ message: string }>) {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: action.payload.message,
            likesCount: 0,
          },
          ...state.posts,
        ],
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          userProfile: action.payload,
        }
      })
      .addCase(getUserStatus.fulfilled, (state, action) => {
        return {
          ...state,
          profileStatus: action.payload,
        }
      })
      .addCase(setProfileStatus.fulfilled, (state, action) => {
        return {
          ...state,
          profileStatus: action.payload,
        }
      })
    // .addCase(setProfilePhoto.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     userProfile: {
    //       ...state.userProfile,
    //       photos: {
    //         ...action.payload,
    //       },
    //     },
    //   }
    // })
  },
})

export const profileReducer = slice.reducer
export const { addPost } = slice.actions

// types
export type Post = {
  id: number
  message: string
  likesCount: number
}
export type ProfileState = {
  posts: Post[]
  userProfile: Profile | null
  profileStatus: string
}
export type ProfileReducerAction = ReturnType<typeof addPost>
