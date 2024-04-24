import { UserProfileType, profileAPI } from "../../api/api"
import { ThunkType } from "../store"

// types
export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type ProfilePageStateType = {
  posts: PostType[]
  newPostText: string
  userProfile: UserProfileType | null
}
export type ProfileReducerActionType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostAC>
  | ReturnType<typeof setUserProfileAC>

// initial state
const initialState: ProfilePageStateType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 10 },
    { id: 4, message: "Dada", likesCount: 9 },
  ],
  newPostText: "Yan Turnt",
  userProfile: null,
}

// reducer
export const profileReducer = (
  state: ProfilePageStateType = initialState,
  action: ProfileReducerActionType
): ProfilePageStateType => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: state.newPostText,
            likesCount: 0,
          },
          ...state.posts,
        ],
        newPostText: "",
      }
    case "UPDATE_NEW_POST_TEXT":
      return {
        ...state,
        newPostText: action.text,
      }
    case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.userProfile,
      }
    default:
      return state
  }
}

// actions
export const addPostAC = () =>
  ({
    type: "ADD_POST",
  } as const)
export const updateNewPostAC = (text: string) =>
  ({
    type: "UPDATE_NEW_POST_TEXT",
    text,
  } as const)
export const setUserProfileAC = (userProfile: UserProfileType) =>
  ({
    type: "SET_USER_PROFILE",
    userProfile,
  } as const)

// thunks
export const getUserProfileTC =
  (userId: number): ThunkType<ProfileReducerActionType> =>
  (dispatch) => {
    profileAPI.getUserProfile(userId).then((res) => {
      dispatch(setUserProfileAC(res.data))
    })
  }
